const User = require('../db/user');
const Order = require('../db/order');

exports.postOrder = async (req, res) => {
    try{
        const {userId} = req.params;
        const {order} = req.body;
        const user = await User.findOne({userId});
        if(!user){
            return;
        }

        const newOrder = new Order({
            userId,

        })
    }catch(err){
        return res.json({error: err.message});
    }
}