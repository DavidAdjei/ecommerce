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
    required: function () {
      return this.messageType === 'text'; 
    },
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'video', 'file'],   
    default: 'text',
  },
  attachmentUrls: [{
    type: String, 
    required: function () {
      return this.messageType !== 'text'; 
    },
  }],
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
  imageCaption:{
    type: String,
  },
  deletedFor: {
    type: [String], 
    default: [],
  },
}, { timestamps: true }); 

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
