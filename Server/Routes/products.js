const router = require('express').Router()
const { addProducts, products, uploadImage, editProduct, deleteProduct, product } = require("../Controllers/products");
const { upload } = require('../helpers/products');

router.post("/", addProducts);
router.get("/", products);
router.get("/:id", product);
router.post("/uploadImage",upload.single('image'), uploadImage);

module.exports  = router