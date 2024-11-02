const User = require('../db/user');
const Order = require('../db/orders');
const { default: axios } = require('axios');
const Notifications = require('../db/notifications');

  exports.postOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const { order } = req.body;

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const ordersBySeller = {};
        let totalAmount = 0;

        Object.values(order).forEach((item) => {
            const { quantity, product } = item;
            const sellerId = product.sellerId;

            if (!ordersBySeller[sellerId]) {
                ordersBySeller[sellerId] = [];
            }

            const itemTotal = product.price * quantity;
            totalAmount += itemTotal;

            ordersBySeller[sellerId].push({
                title: product.title,
                price: product.price,
                quantity,
                specifications: product.specs,
                image: product.imgs,
            });
        });

        const allOrders = [];
        for (const [sellerId, orderItems] of Object.entries(ordersBySeller)) {
            const sellerOrderTotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

            const newOrder = new Order({
                buyerId: userId,
                sellerId,
                orderItems,
                totalPrice: sellerOrderTotal,
                deliveryAddress: `City = ${user.address.city}, Street = ${user.address.street}, House Number = ${user.address.houseNumber}, Region = ${user.address.region}, GPS = ${user.address.ghanaPost}`,
                status: 'Pending',
            });
            allOrders.push(newOrder);
        }

        const savedOrders = await Order.insertMany(allOrders);
        
        // Collect all saved order IDs
        const orderIds = savedOrders.map(order => order._id.toString()).join(',');

        const paystackData = {
            email: user.email,
            amount: totalAmount * 100,
            callback_url: 'http://localhost:3000',
            reference: `orders_${orderIds}_${Date.now()}`,
        };

        const response = await axios.post('https://api.paystack.co/transaction/initialize', paystackData, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.data && response.data.data && response.data.data.authorization_url) {
            return res.status(200).json({ paymentUrl: response.data.data.authorization_url });
        } else {
            return res.status(500).json({ error: "Payment initialization failed" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
};
 

exports.verifyOrderPayment = async (req, res) => {
    const paystackSecretKey = process.env.PAYSTACK_SECRET;
    const ref = req.query.reference;

    try {
        const paystackResponse = await axios.get(`https://api.paystack.co/transaction/verify/${ref}`, {
            headers: {
                Authorization: `Bearer ${paystackSecretKey}`,
            },
        });
        const { data } = paystackResponse.data;
        console.log({ data });
        
        if (data.status === 'success') {
            const { customer, authorization, reference } = data;

            const orderIds = reference.split('_')[1].split(',');

            try {
                const updatePromises = orderIds.map(async (orderId) => {
                    const existingOrder = await Order.findById(orderId);
                    if (existingOrder) {
                        existingOrder.payment = "Paid";
                        await existingOrder.save();
                    }
                });

                await Promise.all(updatePromises);

                const user = await User.findOne({ email: customer.email });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                user.paystackSecret = authorization.authorization_code;
                await user.save();

                await new Notifications({
                    userId: user._id,
                    type: "Payment Received",
                    content: `Hello ${user.firstName}, your payment was successful. Thank you for purchasing from us`
                }).save();

                return res.status(200).json({ message: 'Payment received and orders updated' });
            } catch (error) {
                console.error('Error updating orders:', error);
                return res.status(500).json({ error: 'An error occurred while updating the orders' });
            }
        } else {
            return res.status(400).json({ error: 'Transaction verification failed or payment was not successful' });
        }
    } catch (error) {
        console.error('Paystack request error:', error);
        return res.status(500).json({ error: 'An error occurred while verifying the transaction' });
    }
};


exports.getAllOrders = async (req, res) => { 
    const { userId } = req.params;
    try {
        const orders = await Order.find({ buyerId: userId });
        if (!orders) {
            return res.json({message: "No orders made", orders: []})
        }
        return res.json({ orders });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}