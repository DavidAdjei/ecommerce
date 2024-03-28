const express = require("express");

const router = express.Router();

const { signUp, signin, users } = require("../Controllers/auth");
const { addProducts, products, uploadImage, editProduct, deleteProduct } = require("../Controllers/products");
const { placeOrder } = require('../Controllers/order');
const { upload } = require('../helpers/products');

router.post("/signUp", signUp);
router.post("/signin", signin);
router.post("/users", users);
router.post("/addProducts", addProducts);
router.get("/products", products);
router.get("/editProduct", editProduct);
router.get("/deleteProduct", deleteProduct);
router.post("/placeOrder", placeOrder);
router.post("/uploadImage",upload.single('image'), uploadImage);

module.exports = router;