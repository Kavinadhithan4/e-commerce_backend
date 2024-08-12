const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


exports.getUser =async (req,res)=>{
    try{
        const user=await User.find()
        res.send(user);
    } catch(err){
        console.error(err);
    }
}
exports.createUser=async(req,res)=>{
    try {const {name,emailid,password}=req.body;
    const user= new User({
         name,
         emailid,
         password
    })
    await user.save();
    res.status(200).json("User created sucessfully")
    }catch(err){
        console.error(err);
    }
}

exports.login=async(req,res)=>{
    const {emailid,password}=req.body;
    try{
        const user = await User.findOne({emailid});
        if(!user){
            res.status(400).json("Invalid Email or Password")
        }
        const isMatch = await bcrypt. compare(password,user.password)
        if(!isMatch){
            return res.status(400).json("Invalid Password")
        }
        const token=jwt.sign({user_id: user._id,emailid:user.emailid},"secret",
            {expiresIn:"1h"}
        );
        res.status(200).json(token);
    }catch(err){
        console.error(err)
    }
}