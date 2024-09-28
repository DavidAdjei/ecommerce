const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { 
        type: String,
        required: true,
    },
    lastame: {
        type: String,
        required: true,
    }
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Buyer",
    },
    image: {
        public_id: {
            type: String,
            default: "",
        },
        url: {
            type: String,
            default: "",
        }
    }
})


module.exports = mongoose.model("User" , userSchema)