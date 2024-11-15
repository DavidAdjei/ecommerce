const Room = require('../db/room');
const Chat = require('../db/chat');
const User = require('../db/user')

exports.createRoom = async (req, res, io) => {
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
  console.log({userId});
  try {
    const rooms = await Room.find({ users: userId });

    const contacts = await Promise.all(
      rooms.map(async (room) => {
        const otherUserId = room.users.find((id) => id !== userId);

        const otherUser = await User.findById(otherUserId).select('firstName lastName image');

        return {
          id: otherUser._id,
          name: otherUser.firstName + " " + otherUser.lastName,
          image: otherUser.image,
        };
      })
    );
    console.log({contacts});
    return res.status(200).json({contacts});
  } catch (error) {
    console.error("Error fetching user contacts:", error);
    return res.status(500).json({error: error.message});
  }
};


exports.sendMessage = async (req, res, io) => {
    const { roomId, userId, message } = req.body;
    const newMessage = new Chat({ roomId, userId, message });
    try {
        const savedMessage = await newMessage.save();

        io.to(roomId).emit('newMessage', savedMessage);

        res.json({savedMessage});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

  

exports.getMessages = async (req, res) => { 
    try { 
        const messages = await Chat.find({ roomId: req.params.roomId }); 
        res.json({messages}); 
    } catch (err) { 
        res.status(500).json({error: err.message}); 
    } 
};