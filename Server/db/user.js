// userModel.js
const mongoose = require("mongoose");

const { Schema } = mongoose;
const addressSchema = new Schema({
    city: String,
    region: String,
    street: String,
    houseNumber: String,
    ghanaPost: String
});

const paymentMethodSchema = new Schema({
    provider: String, 
    accountNumber: String,  
    expiryDate: Date,       
});

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["Buyer", "Seller", "buyer", "seller", "Admin"], default: "Buyer" },
    image: {
        public_id: { type: String, default: "" },
        url: { type: String, default: "" }
    },
    verified: { type: Boolean, default: false },
    address: addressSchema,
    phone: { type: String },
    dateOfBirth: { type: Date },
    orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    paymentMethods: [paymentMethodSchema], 
    accountStatus: { type: String, enum: ["active", "suspended", "deleted"], default: "active" },
    paystackSecret: { type: String },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    registrationStep: { type: Number, default: 1 } // Track the current step
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
