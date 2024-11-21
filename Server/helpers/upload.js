const cloudinary = require('cloudinary').v2;
const {upload} = require('./products');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Upload a single image
exports.uploadSingleImage = async (file) => {
  try {
    const imageUrl = await cloudinary.uploader.upload(file.path);
    return { imageUrl: imageUrl.secure_url };
  } catch (error) {
    throw error; 
  }
};

// Upload multiple images
exports.uploadMultipleImages = async (files) => {
  try {
    const uploadPromises = files.map(async (file) => {
      console.log({file});
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url;
    });
    const imageUrls = await Promise.all(uploadPromises);
    return {imageUrls};
  } catch (error) {
    throw error;
  }
};

exports.uploadMiddleware = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      req.uploadedImages = [];
      return next();
    }

    // Upload the images to Cloudinary
    const imageUrls = await uploadMultipleImages(req.files);
    req.uploadedImages = imageUrls; // Pass URLs to the next middleware
    next();
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};

