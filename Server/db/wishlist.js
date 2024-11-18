const mongoose = require('mongoose')    
const wishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    }
}, {timestamps: true});
module.exports =  mongoose.model( 'WishList' , wishlistSchema)