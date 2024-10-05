const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

exports.uploadSingleImage = async (file) => {
  try {
    const imageUrl = await cloudinary.uploader.upload(file.path);
    return { imageUrl: imageUrl.secure_url };
  } catch (error) {
      throw err;
  }
};