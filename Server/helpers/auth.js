const bcrypt = require("bcrypt");
const axios = require('axios');
const qs = require('qs');

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