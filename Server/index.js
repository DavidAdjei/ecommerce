require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");

const authRoutes = require("./Routes/auth");
const orderRoutes = require("./Routes/order");
const productRoutes = require("./Routes/products");
const categoryRoutes = require("./Routes/categories");
const wishlistRoutes = require("./Routes/wishlist");
const sellerRoutes = require("./Routes/seller");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app); // Use 'server' for Socket.IO binding
const io = new Server(server, { 
    cors: { 
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    } 
});

const chatRoutes = require("./Routes/chat")(io);

// MongoDB connection
mongoose.connect(process.env.DATABASE)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:3000", // Adjust this to the allowed frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Routes
app.get("/", (req, res) => {
    res.send("Hello There");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/order", orderRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/seller", sellerRoutes);
app.use("/chat", chatRoutes);

// Socket.IO configuration
io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("joinRoom", ({ userId, roomId }) => {
        socket.join(roomId);
    });

    socket.on("chatMessage", ({ message }) => {
        console.log({ message });
        socket.to(message.roomId).emit("newMessage", message); // Emit message to all clients in room
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
});

// Server
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server running on port ${port}`));
