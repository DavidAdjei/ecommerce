const { addProduct, getProducts, uploadProductImages } = require("../Controllers/sellerController"); // Assuming uploadProductImages is a controller function
const { upload } = require("../helpers/products");

const router = require("express").Router();

router.get("/:sellerId", getProducts);
router.post("/:sellerId", addProduct);

// Route to upload images
router.post("/upload-images", upload.array("image"), uploadProductImages);

module.exports = router;
