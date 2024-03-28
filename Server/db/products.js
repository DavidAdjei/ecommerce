const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    stockQuantity: {
        type: Number,
    },
    category: {
        type: String,
    },
    image: {
        public_id: {
            type: String,
            default: "",
        },
        url: {
            type: String,
            default: "",
        }
    }
})

module.exports = mongoose.model("Product", productSchema);