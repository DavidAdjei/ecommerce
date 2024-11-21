const Room = require('../db/room');
const Chat = require('../db/chat');
const User = require('../db/user');
const fs = require('fs');
const path = require('path');
const { uploadMultipleImages } = require('../helpers/upload');

exports.createRoom = async (req, res) => {
    const { buyerId, sellerId } = req.body;
    try {
        let room = await Room.findOne({ users: { $all: [buyerId, sellerId] } });
        if (!room) {
            room = new Room({ users: [buyerId, sellerId] });
            await room.save();
        }
        res.json({ roomId: room._id });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

exports.getUserRooms = async (req, res) => {
    const userId = req.params.userId;
    try {
        const rooms = await Room.find({ users: userId }).sort({ createdAt: -1 });

        const contacts = await Promise.all(
            rooms.map(async (room) => {
                const otherUserId = room.users.find((id) => id !== userId);
                const otherUser = await User.findById(otherUserId).select('firstName lastName image online lastSeen');
                return {
                    id: otherUser._id,
                    name: otherUser.firstName + " " + otherUser.lastName,
                    image: otherUser.image,
                    online: otherUser.online,
                    lastSeen: otherUser.lastSeen
                };
            })
        );
        return res.status(200).json({ contacts });
    } catch (error) {
        console.error("Error fetching user contacts:", error);
        return res.status(500).json({ error: error.message });
    }
};

exports.uploadImages = async (req, res) => {
    try {
        const { files } = req;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const result = await uploadMultipleImages(files);
        if (!result || !result.imageUrls) {
            return res.status(500).json({ error: 'Failed to upload images' });
        }

        return res.status(200).json({ message: "Images uploaded successfully", imageUrls: result.imageUrls });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};



exports.sendMessage = async (req, res, io) => {
    const { roomId, userId, message, messageType } = req.body;
    console.log({message});
    if (!roomId || !userId || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if((messageType === 'image' && !message.images) || (messageType === "image" && message.images.length === 0)) {
        return res.status(400).json({ error: 'Missing image URLs' });
    }
    const newMessage = new Chat({
        roomId,
        userId,
        message: message.message,
        messageType,
        attachmentUrls: messageType === 'image' ? message.images : undefined,
        imageCaption: messageType === 'image' ? message.caption : undefined,
    });
    try {
        const savedMessage = await newMessage.save(); 
        res.status(200).json({ savedMessage }); 
        io.to(roomId).emit('chatMessage', savedMessage); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

  
exports.getMessages = async (req, res) => {
    try {
        const messages = await Chat.find({ roomId: req.params.roomId });
        res.json({ messages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUnreadMessagesCount = async (req, res) => {
  const userId = req.params.userId;

  try {
      const messages = await Chat.find({ 'users': userId });

      const unreadMessages = messages.filter((message) => {
          return !message.seenBy.includes(userId) && !message.isDeleted;
      });

      res.json({ unreadMessagesCount: unreadMessages.length });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    try {
        const message = await Chat.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        message.isDeleted = true;
        await message.save();
        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.markAsSeen = async (req, res) => {
    const { messageId, userId } = req.body;
    try {
        const message = await Chat.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        if (!message.seenBy.includes(userId)) {
            message.seenBy.push(userId);
            await message.save();
        }

        res.json({ message: 'Message marked as seen' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.markAsDelivered = async (req, res) => {
    const { messageId, userId } = req.body;
    try {
        const message = await Chat.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        if (!message.deliveredTo.includes(userId)) {
            message.deliveredTo.push(userId);
            await message.save();
        }

        res.json({ message: 'Message marked as delivered' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.softDeleteMessage = async (req, res) => {
    const { messageId, userId } = req.body;
    try {
        const message = await Chat.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        if (!message.deletedFor.includes(userId)) {
            message.deletedFor.push(userId);
            await message.save();
        }

        res.json({ message: 'Message soft-deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// // Controller to handle file attachment uploads
// exports.uploadAttachment = async (req, res) => {
//   if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//   }

//   try {
//       const filePath = `/uploads/${req.file.filename}`;
//       res.json({ attachmentUrl: filePath });
//   } catch (err) {
//       res.status(500).json({ error: err.message });
//   }
// };