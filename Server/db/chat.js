const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
