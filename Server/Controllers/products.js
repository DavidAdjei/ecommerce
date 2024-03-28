const Product = require("../db/products");
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


exports.editProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price, stock, category} = req.body;
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.stockQuantity = stock;
    existingProduct.category = category;
    const updatedProduct = await existingProduct.save();
    res.json({ updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};