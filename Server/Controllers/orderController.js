const User = require('../db/user');
const Order = require('../db/orders');
const https = require('https')


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
        console.log(userId);
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
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
        const params = JSON.stringify({
            "email": user.email,
            "amount": savedOrder.totalPrice * 100,
            "callback_url": 'http://localhost:3000/',
            "reference": savedOrder._id
        })
        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transaction/initialize',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
                'Content-Type': 'application/json'
            }
        }

        const request = https.request(options, response => {
            let data = ''

            response.on('data', (chunk) => {
                data += chunk
            });

            response.on('end', () => {
                console.log(JSON.parse(data));
                const d = JSON.parse(data);
                return res.status(200).json(d);
            })
        }).on('error', error => {
            console.error(error);
            return res.status(500).json({error: "Network error"});
        })

        request.write(params);
        request.end();
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err.message});
    }
}

exports.verifyOrderPayment = async (req, res) => { 
    const paystackSecretKey = process.env.PAYSTACK_SECRET;
    const ref = req.query.reference;
    console.log("Ref: ", ref)

    const options = {
        hostname: 'api.paystack.co',
        path: `/transaction/verify/${ref}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${paystackSecretKey}`
        }
    };

    const paystackRequest = https.request(options, paystackResponse => {
        let data = '';

        paystackResponse.on('data', chunk => {
            data += chunk;
        });

        paystackResponse.on('end', async () => {
            const transactionData = JSON.parse(data);
            console.log(transactionData);
            if (transactionData.data.status === 'success') {
                const { customer, authorization, reference } = transactionData.data;
                console.log("Customer: ", customer)
                console.log("Auth: ", authorization)
                console.log("Ref: ", reference)
                try {
                    const existingOrder = await Order.findOne({ _id: reference });
                    if (!existingOrder) {
                        console.log("Error");
                        return res.status(500).json({ error: 'Order not found' });
                    }

                    const user = await User.findOne({ email: customer.email });
                    if (!user) {
                        return res.status(404).json({ error: 'User not found' });
                    }

                    user.paystackSecret = authorization.authorization_code;
                    existingOrder.payment = "Paid";
                    await user.save();
                    await existingOrder.save();
                    
                    res.status(200).json({ message: 'Payment received' });
                } catch (error) {
                    console.error('Error updating order', error);
                    res.status(500).json({ error: 'An error occurred while updating order' });
                }
            }else {
                res.status(400).json({ error: 'Transaction verification failed or payment was not successful' });
            }
        });
    });

    paystackRequest.on('error', error => {
        console.error('Paystack request error:', error);
        res.status(500).json({ error: 'An error occurred while verifying transaction' });
    });

    paystackRequest.end();
};

exports.getAllOrders = async (req, res) => { 
    const { userId } = req.params;
    try {
        const orders = await Order.find({ userId });
        if (!orders) {
            return res.json({message: "No orders made", orders: []})
        }
        return res.json({ orders });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}