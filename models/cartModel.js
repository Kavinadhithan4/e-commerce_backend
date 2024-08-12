const mongoose =require("mongoose")
const CatSchema=new mongoose.Schema({
    user_id:String,
    products:[{
        product_id:String,
        quantity:Number,
    }]
});
const Cart =mongoose.model("Cart",CatSchema);
module.exports=Cart;