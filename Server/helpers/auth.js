const bcrypt = require("bcrypt");
const axios = require('axios');
const qs = require('qs');
const VALID_ROLES = ["buyer", "seller"];

exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
};

exports.comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}

exports.googleoauth = async (code) => {
    const url = "https://oauth2.googleapis.com/token";

    const values = {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: "authorization_code",
    };

    try {
        const res = await axios.post(url, qs.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return res.data;
    } catch (err) {
        console.error(err.response?.data, "Error during OAuth token exchange:", err.message);
        throw err;
    }
};


exports.getGoogleUser = async (id_token, access_token) => {
    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        })
        return res.data;
    } catch (err) {
        console.log(err, "Error fethcing user");
    }
}


exports.createPaystackSubaccount = async (user, paymentInfo) => {
    const PAYSTACK_URL = "https://api.paystack.co/subaccount";
    try {
        const response = await axios.post(
            PAYSTACK_URL,
            {
                business_name: `${user.firstName} ${user.lastName}`,
                account_number: paymentInfo.accountNumber,
                bank_code: paymentInfo.provider,
                percentage_charge: 10
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
                }
            }
        );
        return response.data.data.subaccount_code;
    } catch (error) {
        console.error("Paystack error:", error.response?.data || error.message);
        throw new Error("Failed to create Paystack subaccount");
    }
};

exports.validateStep2Credentials = (credentials, role) => {
    const { firstName, lastName, email, password } = credentials;
    if (!role || !VALID_ROLES.includes(role)) {
        return "Invalid role selection";
    }
    if (!firstName || !lastName || !email || !password) {
        return "Apart from date of birth, all fields are required";
    }
    return null;
};

exports.validateStep3Credentials = (user, paymentInfo) => {
    if (!user?._id) {
        return "User ID is required for step 3";
    }
    if (user.role === "seller" && (!paymentInfo.provider || !paymentInfo.accountNumber)) {
        return "All fields are required in step 3 for sellers";
    }
    return null;
};