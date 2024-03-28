const Order = require('../db/orders');

exports.placeOrder = async (req, res) => {
    try {
       const { userID, orderItems, totalPrice, deliveryAddress } = req.body;
        const newOrder = new Order({
            userID,
            orderItems,
            totalPrice,
            deliveryAddress
        });
        const savedOrder = await newOrder.save();
        console.log("Order Added")
        return res.json({savedOrder}) 
    } catch (err) {
        console.log(err)
        return res.json({error: "Something went wrong"})
    }
}