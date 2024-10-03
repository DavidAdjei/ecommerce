const router = require('express').Router()
const { addProducts, products, product } = require("../Controllers/products");

router.post("/", addProducts);
router.get("/", products);
router.get("/:id", product);


module.exports  = router