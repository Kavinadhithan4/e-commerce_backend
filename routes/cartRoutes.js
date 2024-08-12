const express= require ("express")
const cart_router = express.Router();
const auth=require("../middleware/auth.js")
const CartController=require("../controllers/cartController.js")

cart_router.post("/createCart", auth,CartController.createCart)
cart_router.get("/getCart", auth,CartController.getCart)
cart_router.post("/delete/:id",auth,CartController.deletCart)

module.exports=cart_router