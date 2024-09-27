require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth");
const productRoutes = require("./Routes/products");
const categoryRoutes = require("./Routes/categories")
const cors = require('cors');
const morgan = require("morgan");

const app = express();
const http = require("http").createServer(app);

mongoose.connect(process.env.DATABASE)
    .then(() => console.log('Connected'))
    .catch((err) => console.log(err));
       
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send("Hello There");
})

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes)

const port = process.env.PORT || 8000;

http.listen(port, () => console.log("Server running on port" + port));

