const cloudinary = require('cloudinary').v2;

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
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url;
    });
    const imageUrls = await Promise.all(uploadPromises);
    return { imageUrls };
  } catch (error) {
    throw error;  
  }
};
