const User = require("../db/user");
const Wishlist = require("../db/wishlist");
const Products = require("../db/Products");

exports.addToWishList = async (req, res) => {
    try {
       const { userId, productId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const wishlist = new Wishlist({
            userId, productId
        })
    
        await wishlist.save(); 
        return res.json({ message: `${product.title} has been added to wishlist`});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
} 

exports.removeFromWishList = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const deletedWishlist = await Wishlist.findOneAndDelete({ userId, productId });
        console.log(deletedWishlist);
        if (!deletedWishlist) {
            return res.status(403).json({ error: "Failed to remove" });
        }
        return res.json({message: `${product.title} has been removed from wishlist`})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const wishlistItems = await Wishlist.find({ userId });
        if (wishlistItems.length === 0) {
            return res.status(200).json({ warning: "Your wishlist is empty" }); 
        }
        const productIds = wishlistItems.map(item => item.productId);
        const products = await Products.find({ _id: { $in: productIds } });
        return res.json({ wishlist: products });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};
