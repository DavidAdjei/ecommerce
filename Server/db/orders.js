const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
    userID: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    orderDate: { 
        type: Date, 
        default: Date.now 
    },
    orderItems: [{
        title: {
            type: String,
            required: true
        },
        specification:{
            type: [mongoose.Schema.Types.Mixed],
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    image:{
        type: [String],
    }
});

module.exports = mongoose.model("Order", orderSchema);