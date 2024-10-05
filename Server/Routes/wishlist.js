const { addToWishList, removeFromWishList, getWishlist } = require("../Controllers/wishListController");

const router = require("express").Router();

router.post("/:userId/:productId", addToWishList);
router.delete("/:userId/:productId", removeFromWishList);
router.get("/:userId", getWishlist);

module.exports = router;