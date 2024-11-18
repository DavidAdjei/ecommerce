const User = require("../db/user");
const onlineUsers = new Map();
const ChatMessage = require('../db/chat');

exports.socket = (io) => {
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
    
        // Join a room
        socket.on("joinRoom", ({ userId, roomId }) => {
            console.log(`${userId} joined room ${roomId}`);
            socket.join(roomId);
            socket.emit('joined room', { roomId, message: "You have joined the room successfully." });
        });
    
        // When a user comes online
        socket.on("userOnline", async ({ userId }) => {
            onlineUsers.set(userId, socket.id);
            try {
                await User.findByIdAndUpdate(userId, { online: true });
                socket.broadcast.emit("onlineStatus", { userId, online: true });
            } catch (error) {
                console.error("Error updating user online status:", error);
            }
        });
    
        socket.on("typing", ({ roomId, userId }) => {
            socket.to(roomId).emit("userTyping", { userId });
        });
    
        socket.on("stoppedTyping", ({ roomId, userId }) => {
            socket.to(roomId).emit("userStoppedTyping", { userId });
        });
    
        socket.on("chatMessage", ({ message }) => {
            console.log({message});
            socket.to(message.roomId).emit("newMessage", message);
            socket.to(message.roomId).emit("increaseUnreadCount", {roomId: message.roomId})
        });
    
        socket.on("userOnline", ({ userId }) => {
            onlineUsers.set(userId, socket.id);
            socket.emit("onlineStatus", { userId, online: true });
        });
    
        socket.on("messageSeen", async ({ roomId, messageIds, userId }) => {
            try {
                if (!roomId || !Array.isArray(messageIds) || !userId) {
                    return socket.emit("error", { message: "Invalid input for messageSeen" });
                }
        
                console.log(`User ${userId} has seen messages: ${messageIds}`);
        
                await ChatMessage.updateMany(
                    { _id: { $in: messageIds }, roomId },
                    { $addToSet: { seenBy: userId } } // Add userId to the seenBy array if not already present
                );
        
                socket.to(roomId).emit("updateSeenStatus", { messageIds, userId });
        
                socket.emit("messageSeenAcknowledged", { messageIds });
            } catch (error) {
                console.error("Error handling messageSeen event:", error);
                socket.emit("error", { message: "Failed to update seen status" });
            }
        });
    
        socket.on("disconnect", async () => {
            console.log("Client disconnected", socket.id);
            const userId = [...onlineUsers.entries()].find(([key, value]) => value === socket.id)?.[0];
            if (userId) {
                onlineUsers.delete(userId);
                try {
                    await User.findByIdAndUpdate(userId, { online: false, lastSeen: Date.now() });
                    socket.broadcast.emit("onlineStatus", { userId, online: false });
                } catch (error) {
                    console.error("Error updating user offline status:", error);
                }
            }
        });
    });
}