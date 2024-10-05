const User = require("../db/user");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword, getGoogleUser } = require("../helpers/auth");
const { googleoauth } = require("../helpers/auth");
const { uploadSingleImage } = require("../helpers/upload");

const cookieOptions = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 3
}

exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName) {
            return res.status(403).json({
                error: "First Name is required"
            })
        } else if (!lastName) {
            return res.status(403).json({
                error: "Last Name is required"
            })
        } else if (!email) {
            return res.status(403).json({
                error: "Email is required"
            })
        } else if (!password || password.length < 8) {
            return res.status(403).json({
                error: "Password is required and should be more than 8 characters"
            })
        } else {
            const exist = await User.findOne({ email });
            if (exist) {
                return res.status(409).json({
                    error: "Email is taken"
                })
            } else {
                const hashedPassword = await hashPassword(password);
                try {
                    const user = await new User({
                        firstName, lastName, email, password: hashedPassword,
                    }).save();

                    if (!user) {
                        return res.status(401).json({ error: "Couldn't create user, try again later" });
                    }
                    return res.json({
                        message: "SignUp Successful"
                    })
                } catch (error) {
                    console.log(error)
                    res.status(500).json({error: error.message})
                }
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

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
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({ error: "Authorization code is required" });
        } 
        const { id_token, access_token } = await googleoauth(code);
        if (!id_token, !access_token) {
            return res.status(400).json({ error: "Failed to retrieve tokens from google" });
        }
        const googleUser = await getGoogleUser(id_token, access_token);
        if (!googleUser) {
            return res.status(404).json({error: "Failed to fetch user"})
        }

        const user = await User.findOneAndUpdate(
            { email: googleUser.email }, {
            email: googleUser.email,
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            verified: googleUser.email_verified,
            image: {
                url: googleUser.picture
            }
        },
            {
                upsert: true,
                new: true
            }
        );

        if (!user) {
            return res.status(409).json({ error: "Error creating user" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie('auth_token', token, cookieOptions);

        res.redirect(process.env.CLIENT_SIDE_URL);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
    }
}

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
            return res.json(404).json({
                error: "User not found"
            })
        }
        user.password = undefined;
        user.secret = undefined;
        user.paystackSecret = undefined;
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

exports.editImage = async (req, res) => {
    try {
        const { file } = req;
        const { id } = req.params;
        console.log(file);
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