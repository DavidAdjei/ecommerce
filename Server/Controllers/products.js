const Product = require("../db/Products");
const cloudinary = require('cloudinary').v2;
const { upload } = require('../helpers/products');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


exports.uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.json({ error: 'No file uploaded' });
      }
      const imageUrl = await cloudinary.uploader.upload(req.file.path);
      res.json({ imageUrl: imageUrl.secure_url});
    } catch (error) {
      console.error(error);
      res.json({ error: 'Server error' });
    }
};

exports.addProducts = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      console.log("Product already exists");
      existingProduct.set({
        description,
        price,
        stockQuantity: stock,
        category,
        image: { url: image }
      });
      const updatedProduct = await existingProduct.save();
      return res.json({ updatedProduct });
    }
    const newProduct = new Product({
      name,
      description,
      price,
      stockQuantity: stock,
      category,
      image: { url: image },
    });
    const savedProduct = await newProduct.save();
    res.json({ savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.products = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.json({ products: allProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.product = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(401).json({ error: "Not allowed" });
    }
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(441).json({ error: "Product not found" });
    }

    return res.status(200).json({
      message: "Successful",
      product
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}