const express=require("express");
const app= express();
const user_Routes= require ('./routes/userRoutes')
const cart_Routes= require ('./routes/cartRoutes')
const product_Routes= require ('./routes/productRoutes')
const order_Routes= require ('./routes/orderRoutes')
const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')
app.use(express.json())


mongoose.connect(
    'mongodb+srv://kavin:kavin@cluster0.bcclnva.mongodb.net/data'
).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log("database connection fail",err)

})

app.use("/user",user_Routes);
app.use("/cart",cart_Routes);
app.use("/order",order_Routes);
app.use("/product",product_Routes);


app.listen(3010,()=>{
    console.log("server is running on port 3010");
})