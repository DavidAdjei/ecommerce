const { postOrder, verifyOrderPayment, getAllOrders } = require('../Controllers/orderController');

const router = require('express').Router();

router.get("/:userId", getAllOrders);
router.post("/:userId", postOrder);
router.put("/verify", verifyOrderPayment);
module.exports = router;