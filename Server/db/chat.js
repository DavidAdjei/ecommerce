const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'video', 'file'], 
    default: 'text',
  },
  attachmentUrl: {
    type: String, 
    required: function () {
      return this.messageType !== 'text'; 
    },
  },
  seenBy: {
    type: [String], 
    default: [],
  },
  deliveredTo: {
    type: [String], 
    default: [],
  },
  isDeleted: {
    type: Boolean, 
    default: false,
  },
  deletedFor: {
    type: [String], 
    default: [],
  },
}, { timestamps: true }); 

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
