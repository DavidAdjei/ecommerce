const User = require("../db/user");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");

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
    console.log("Preparing to Sign In");
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
                res.cookie('auth_token', token, cookieOptions);

                console.log(req.session);
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
        return res.json({ message: "Authenticated", user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

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