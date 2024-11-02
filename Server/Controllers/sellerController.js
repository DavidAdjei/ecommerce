const Products = require("../db/Products");
const User = require("../db/user");
const { uploadMultipleImages } = require("../helpers/upload");

exports.addProduct = async (req, res) => {
    try {
        const { sellerId } = req.params;
        const { product } = req.body;

        const seller = await User.findById(sellerId);
        if (!seller || seller.role.toLowerCase() !== "seller") {
            return res.status(403).json({ error: "Invalid user type" });
        }

        if (!product.title) {
            return res.status(400).json({ error: "Product name is required" });
        }

        // if (!product.imgs || product.imgs.length === 0) {
        //     return res.status(400).json({ error: "Upload at least one image" });
        // }

        const newProduct = await new Products({ ...product, sellerId }).save();

        if (!newProduct) {
            return res.status(400).json({ error: "Error adding product" });
        }

        return res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
};

exports.uploadProductImages = async (req, res) => {
    try {
        const { files } = req;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: "Add at least one image" });
        }
        
        const { imageUrls } = await uploadMultipleImages(files);
        if (!imageUrls) {
            return res.status(500).json({ error: "Failed to upload images" });
        }

        return res.status(200).json({ message: "Images uploaded successfully", imageUrls });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const { sellerId } = req.params;
        const seller = await User.findById(sellerId);
        if (!seller || seller.role.toLowerCase() !== "seller") {
            return res.status(403).json({ error: "Invalid user type" });
        }
        const products = await Products.find({ sellerId });
        if (!products || products.length === 0) {
            return res.status(404).json({ error: "No products found for this seller" });
        }
        return res.status(200).json({ products });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
};
