const mongoose = require('mongoose'); 

const RoomSchema = new mongoose.Schema({ 
    users: [String] 
}); 

module.exports = mongoose.model('Room', RoomSchema);

