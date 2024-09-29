const User = require('../db/user');
const Order = require('../db/orders');

const calculateTot = (order) => {
    let total = 0;
    Object.values(order).forEach((item) => {
      const price = item.quantity * item.product.price;
      total += price;
    });
    return total;
  };

exports.postOrder = async (req, res) => {
    try{
        const {userId} = req.params;
        const { order } = req.body;
        const user = await User.findOne({userId});
        
        let orderArray = [];
        let orderItem ={}

        Object.values(order).forEach((item) => {
            const { quantity, product } = item;
            orderItem.title = product.title;
            orderItem.price = product.price;
            orderItem.quantity = quantity;
            orderItem.specifications = product.specs;
            orderItem.image = product.imgs;
            orderArray.push(orderItem);
        })

        const newOrder = new Order({
            userId,
            orderItems: orderArray,
            totalPrice: calculateTot(order),
            deliveryAddress: "Asofan Melon Street 41"
        })

        const savedOrder = await newOrder.save();
        console.log(savedOrder);
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err.message});
    }
}

exports.payOrder = async (req, res) => {
    
}