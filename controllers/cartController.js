const Cart = require("../models/cartModel");
const Product=require("../models/productModel")

exports.createCart = async(req, res) => {
    const {user_id} = req.user;
    const {product_id, quantity } = req.body;
    let cart = await Cart.findOne({user_id});

    if(!cart) {
        cart = new Cart({user_id, products:[{ product_id, quantity}]});
    }else{
        const ProductIndex = cart.products.findIndex(
            (prod) => prod.product_id === product_id
        );
        if(!ProductIndex > -1){
        cart.products.push({product_id, quantity });
        }else{
            cart.products[ProductIndex].quantity=quantity;
            res.status(201).json({message:"Quantity updated sucessfully"})
        }
    }
    cart.save();
    res.status(207).json({message:"Product added/updated sucessfully",cart})

};
exports.getCart = async(req , res)=>{
    const {user_id}= req.user;
    const cart = await Cart.findOne({user_id})
    if (!cart){
        return res.status(404).json({message:"cart not found"})
    }
    try{
        let subTotal=0;
        const CartItem = await Promise.all(
            cart.products.map(async (product)=>{
                const productDetails=await Product.findOne(
                    {
                        id:product.product_id,
                    }
                );
                subTotal+=productDetails.price*product.quantity
                return {
                    product_id:productDetails.id,
                    title:productDetails.title,
                    description:productDetails.description,
                    price:productDetails.price,
                    image:productDetails.image,
                    quantity:product.quantity,
                }
            })
        )
        res.status(200).json({CartItem:CartItem,subTotal});

    }catch(err){
        res.status(500).json({message:"server error",err});
    }
}
exports.deletCart = async(req , res)=>{
    
    const product_id= req.params.id;
    const {user_id} = req.user;
    const cart = await Cart.findOne({user_id})
    if (!cart){
        return res.status(400).json({message:"cart not found"})
    }
    const isProductValid = cart.products.find(
        (product)=>product_id===product.product_id
    )
    if(!isProductValid){
        res.status(400).json({message:"Product not found in cart"});
    }
    if(cart.products.length<=1){
        await Cart.deleteOne({user_id});
        res.status(200).json({message:"Cart deleted successfully"});
    }else{
        cart.products = cart.products.filter((prod)=>prod.product_id!=product_id);
        cart.save();
        res.status(200).json({message:"Cart deleted successfully"});
    }
}