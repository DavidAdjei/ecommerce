const { uploadImage } = require('../Controllers/generalController');

const router = require('express').Router()


router.post("/uploadImage",upload.single('image'), uploadImage);

module.exports  = router