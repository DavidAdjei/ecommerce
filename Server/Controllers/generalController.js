const cloudinary = require('cloudinary').v2;

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