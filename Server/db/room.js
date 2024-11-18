const mongoose = require('mongoose'); 

const RoomSchema = new mongoose.Schema({ 
    users: [String] ,
    unreadCount: [
        {
            userId: mongoose.Types.ObjectId,
            unreadCount: Number
        },
    ]
}, {timestamps: true}); 

module.exports = mongoose.model('Room', RoomSchema);

