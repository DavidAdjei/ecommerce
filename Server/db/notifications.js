const mongoose = require("mongoose");
const notificationsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['read', 'unread', 'Read', 'Unread'],
        default: 'unread',
    }
}, {timestamps: true});

module.exports = mongoose.model("Notifications", notificationsSchema)