const User = require("../db/user");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");

exports.signUp = async (req, res) => {
    console.log("Preparing to SignUp");
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: "Name is required"
            })
        } else if (!email) {
            return res.json({
                error: "Email is required"
            })
        } else if (!password || password.length < 0) {
            return res.json({
                error: "Password is required and should be more than 8 characters"
            })
        } else {
            const exist = await User.findOne({ email });
            if (exist) {
                return res.json({
                    error: "Email is taken"
                })
            } else {
                const hashedPassword = await hashPassword(password);
                try {
                    const user = await new User({
                        name, email, password: hashedPassword,
                    }).save();

                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                        expiresIn: "7d",
                    })

                    const { password, ...rest } = user._doc;
                    return res.json({
                        token, user: rest,
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            
        }
    } catch (err) {
        console.log(err)
    }
}

exports.signin = async (req, res) => {
    console.log("Preparing to Sign In");
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "User not found"
            })
        } else {
            const match = await comparePassword(password, user.password);
            if (!match) {
                return res.json({
                    error: "Password is incorrect"
                })
            } else {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                })
                user.password = undefined;
                user.secret = undefined;
                res.json({
                    token, user,
                })
            }
        }
    } catch (err) {
        console.log(err)
    }
}

exports.users = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json({ users: allUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
