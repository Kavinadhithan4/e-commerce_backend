const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.createOrders = async (req, res) => {
    const {user_id, emailid} = req.user;
    const {user_name, user_address, phone_number} = req.body;
    try {
        const cart = await Cart.findOne({user_id});
        if(!cart) {
            return res.status(400).json({error: "Add a product in the cart to checkout"});
        }
        const newOrder = await new Order({
            user_id,
            user_name,
            user_address,
            phone_number,
            products: cart.products,
            user_email: emailid
        })
        await newOrder.save();
        await Cart.deleteOne({user_id});
        return res.status(200).json({ message: newOrder });

    } catch(e) {
        res.status(400).json({ error: e.message });   
    }
}

exports.getOrders = async (req, res) => {
    const {user_id} = req.user;
    try {
        const order = await Order.find({user_id});
        return res.status(200).json( order );
    } catch(e) {
        res.status(400).json({ error: e.message });   
    }
}