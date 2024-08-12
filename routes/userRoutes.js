const UserController=require("../controllers/userController")
const express= require ("express")
const user_router = express.Router();
const auth=require("../middleware/auth.js")


user_router.get("/getUser",auth, UserController.getUser)
user_router.post("/createUser",auth, UserController.createUser)
user_router.post("/login", UserController.login)


module.exports=user_router