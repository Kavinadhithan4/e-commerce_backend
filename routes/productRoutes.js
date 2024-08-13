const express= require ("express")
const product_router = express.Router();
const ProductController=require("../controllers/productController.js")

product_router.get("/get", ProductController.getProducts)
product_router.post("/create", ProductController.createProduct)


module.exports=product_router