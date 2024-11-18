const Room = require('../db/room');
const Chat = require('../db/chat');
const User = require('../db/user');
const fs = require('fs');
const path = require('path');

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

// Controller to get user rooms
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

exports.sendMessage = async (req, res, io) => {
    const { roomId, userId, message, messageType } = req.body;
    const newMessage = new Chat({
        roomId,
        userId,
        message,
        messageType
    });

    try {
        const savedMessage = await newMessage.save();
        res.json({ savedMessage });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to get messages in a room
exports.getMessages = async (req, res) => {
    try {
        const messages = await Chat.find({ roomId: req.params.roomId });
        res.json({ messages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to get the number of unread messages for a user
exports.getUnreadMessagesCount = async (req, res) => {
  const userId = req.params.userId;

  try {
      // Find all messages in rooms the user is part of
      const messages = await Chat.find({ 'users': userId });

      // Filter messages that have not been seen by the user
      const unreadMessages = messages.filter((message) => {
          return !message.seenBy.includes(userId) && !message.isDeleted;
      });

      // Return the count of unread messages
      res.json({ unreadMessagesCount: unreadMessages.length });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


// Controller to delete a message
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

// Controller to mark a message as seen
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

// Controller to mark a message as delivered
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