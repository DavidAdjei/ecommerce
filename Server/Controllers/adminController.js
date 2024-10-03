const User = require("../db/user");
const { hashPassword, comparePassword } = require("../helpers/auth");

exports.createAdmin = async (req, res) => {
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
                        firstName, lastName, email, password: hashedPassword, role: "admin", verified: true
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

exports.addProducts = async (req, res) => {
    try {
        
    } catch (err) {
        
    }
}

