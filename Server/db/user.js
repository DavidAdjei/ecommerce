const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { 
        type: String 
    },
    email: { 
        type: String 
    },
    password: { 
        type: String 
    },
    role: {
        type: String,
        default: "Subscriber",
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