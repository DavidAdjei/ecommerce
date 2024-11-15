const express = require("express");
const { createRoom, getMessages, sendMessage, getUserRooms } = require("../Controllers/chat");

module.exports = (io) => {
    const router = express.Router();

    router.post('/join-room', (req, res) => createRoom(req, res, io));
    router.get('/messages/:roomId', getMessages);
    router.post("/sendMessage", (req, res) => sendMessage(req, res, io));
    router.get("/chatList/:userId", getUserRooms);
    return router;
};