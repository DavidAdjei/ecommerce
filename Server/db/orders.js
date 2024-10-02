const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: { 
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
        specifications:{
            type: [mongoose.Schema.Types.Mixed],
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image:{
            type: [String],
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
    payment: {
        type: String,
        enum: ['Pending', 'Paid', 'pending', 'paid'],
        default: 'Pending'
    }
});

module.exports = mongoose.model("Order", orderSchema);