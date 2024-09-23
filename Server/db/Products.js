const mongoose = require("mongoose");

const { Schema } = mongoose;

const review = new Schema({
    name: {
        type: String,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
    }
})

const ProductSchema = new Schema({
    Brand: {
        type: String,
    },
    RAM: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    inStock: {
        type: Number,
    },
    category: {
        type: String,
        ref: 'Categories'
    },
    DisplaySize: {
        type: Number
    },
    imgs: [],
    specs: [],
    eta: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    reviews: [review],
    popular: {
        type: Boolean,
    },
    For: {
        type: String
    },
    Genre: {
        type: String
    },
    Language: String,
    type: {
        type: String
    }
})

module.exports = mongoose.model("Products", ProductSchema);