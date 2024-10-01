const { postOrder } = require('../Controllers/orderController');

const router = require('express').Router();

router.post("/:userId", postOrder);
module.exports = router;