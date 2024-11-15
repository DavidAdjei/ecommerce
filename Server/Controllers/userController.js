const User = require("../db/user");
const Notifications = require("../db/notifications");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword, getGoogleUser, validateStep2Credentials, validateStep3Credentials, createPaystackSubaccount } = require("../helpers/auth");
const { googleoauth } = require("../helpers/auth");
const { uploadSingleImage } = require("../helpers/upload");

const cookieOptions = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 3
}

exports.signUp = async (req, res) => {
    const { step, role, credentials } = req.body;
    try {
        if (step === 1) {
            const validationError = validateStep2Credentials(credentials, role);
            if (validationError) {
                return res.status(400).json({ error: validationError });
            }
            const { firstName, lastName, email, password } = credentials;
            const exists = await User.findOne({ email });
            if (exists) {
                return res.status(409).json({ error: "User already exists" });
            }

            const hashedPassword = await hashPassword(password);
            const registrationStep = role === "seller" ? 2 : 0;

            const user = await new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
                registrationStep
            }).save();

            return res.status(201).json({
                message: "Basic information saved",
                user
            });
        } else if (step === 2 && role === "seller") {
            const { user, paymentInfo } = credentials;

            const validationError = validateStep3Credentials(user, paymentInfo);
            if (validationError) {
                return res.status(400).json({ error: validationError });
            }

            const existingUser = await User.findById(user._id);
            if (!existingUser || existingUser.registrationStep !== 2) {
                return res.status(400).json({ error: "Invalid step sequence" });
            }

            try {
                const subaccountCode = await createPaystackSubaccount(existingUser, paymentInfo);
                existingUser.paystackSecret = subaccountCode;
            } catch (error) {
                console.error("Paystack error:", error);
                return res.status(500).json({ error: "Failed to create Paystack subaccount" });
            }

            existingUser.paymentMethods.push({
                provider: paymentInfo.provider,
                accountNumber: paymentInfo.accountNumber,
                expiryDate: paymentInfo.expiryDate || undefined
            });
            existingUser.address = paymentInfo.billingAddress;
            existingUser.registrationStep = 0; // Registration complete
            await existingUser.save();

            return res.status(201).json({ message: "Seller registration complete", nextStep: null });
        } else {
            return res.status(400).json({ error: "Invalid step or request data" });
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "An error occurred during registration" });
    }
};


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        } else {
            const match = await comparePassword(password, user.password);
            if (!match) {
                return res.status(403).json({
                    error: "Password is incorrect"
                })
            } else {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
                user.password = undefined;
                user.secret = undefined;
                user.paystackSecret = undefined;
                res.cookie('auth_token', token, cookieOptions);
                res.json({
                    user,
                })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

exports.loginWithGoogle = async (req, res) => {
    try {
        const { code, role } = req.query; // Include role as a query parameter

        if (!code) {
            return res.status(400).json({ error: "Authorization code is required" });
        }

        const { id_token, access_token } = await googleoauth(code);
        if (!id_token || !access_token) {
            return res.status(400).json({ error: "Failed to retrieve tokens from Google" });
        }

        const googleUser = await getGoogleUser(id_token, access_token);
        if (!googleUser) {
            return res.status(404).json({ error: "Failed to fetch user" });
        }

        let user = await User.findOne({ email: googleUser.email });
        if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.cookie('auth_token', token, cookieOptions);
            return res.redirect(`${process.env.CLIENT_SIDE_URL}/dashboard`);
        }

        if (!role) {
            return res.status(400).json({ error: "User role is required for new accounts" });
        }

        user = new User({
            email: googleUser.email,
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            verified: googleUser.email_verified,
            role,  
            registrationStep: role === "seller" ? 2 : 0
        });
        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie('auth_token', token, cookieOptions);

        res.redirect(`${process.env.CLIENT_SIDE_URL}/complete-profile`);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred during Google login" });
    }
};


exports.isAuth = async (req, res) => {
    try {
        const authToken = req.cookies.auth_token;
        if (!authToken) {
            return res.status(403).json({ error: "Not authenticated" });
        }
        let decoded;
        try {
            decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(409).json({ error: 'Invalid Token' });
        }

        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        }
        
        user.password = undefined;
        user.secret = undefined;
        user.paystackSecret = undefined;
        
        if(user.registrationStep !== 0){
            return res.status(400).json({
                error: "Registration Incomplete",
                user
            })
        }
        return res.json({ message: "Authenticated", user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.editUser = async (req, res) => {
    try {
        const { credentials } = req.body;
        const { id } = req.params;
        const user = await User.findOneAndUpdate({_id: id}, credentials, {new: true});
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: err.message});
    }
}

exports.addAddress = async (req, res) => {
    try {
        const { city, region, street, houseNumber, ghanaPost } = req.body;
        const { id } = req.params;
        if (!city || !city === '' || !region || !region === '' || !street || !street === '' || !houseNumber || !houseNumber === '' || !ghanaPost || !ghanaPost === '') {
            return res.status(401).json({ error: "All fields are required for accurate location" });
        }
        const user = await User.findOneAndUpdate({ _id: id }, {
            address: {
                city, region, street, houseNumber, ghanaPost
            }
        }, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ message: "Address added", user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: err.message});
    }
}

exports.editImage = async (req, res) => {
    try {
        const { file } = req;
        const { id } = req.params;
        if (!file) {
            return res.status(401).json({ error: 'No file uploaded' });
        }
        const { imageUrl } = await uploadSingleImage(file);
        if (!imageUrl) {
            return res.status(404).json({error: 'Failed to upload image'});
        }
        const user = await User.findOneAndUpdate({_id: id}, {image: {url: imageUrl}}, {new: true});
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "Image uploaded successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

exports.logout = async (req, res) => {
    console.log(req.cookies);
    try {
        res.clearCookie('auth_token', cookieOptions);
        return res.json({ message: "Logout successful" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: `Logout failed ${err.message}` });
    }
}

exports.getNotifications = async (req, res) => {
    try{
        const {userId} = req.params;
        const notifications = await Notifications.find({userId});
        if(!notifications){
            return res.json({notifications: []})
        }
        return res.status(200).json({notifications});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}