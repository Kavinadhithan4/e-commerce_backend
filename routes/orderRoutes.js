const express= require ("express")
const order_router = express.Router();
const auth=require("../middleware/auth.js")
const OrderController=require("../controllers/orderController.js")

order_router.post("/createOrders",auth,OrderController.createOrders)
order_router.get("/getOrders",auth,OrderController.getOrders)

module.exports=order_router