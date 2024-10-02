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
            "callback_url": 'http://localhost:3000/profile?option=Orders',
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
            console.error(error)
        })

        request.write(params)
        request.end()
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err.message});
    }
}

exports.payOrder = async (req, res) => {
    const https = require('https')

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/verify/:reference',
        method: 'GET',
        headers: {
            Authorization: 'Bearer SECRET_KEY'
        }
    }

    https.request(options, response => {
    let data = ''

    response.on('data', (chunk) => {
        data += chunk
    });

    response.on('end', () => {
        console.log(JSON.parse(data))
    })
    }).on('error', error => {
    console.error(error)
    })
}