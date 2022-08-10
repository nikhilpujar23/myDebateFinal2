const asyncHandler=require('express-async-handler');
const User=require('../models/userModel')
const makeToken = require('../config/makeToken');

const registerUser=asyncHandler(async(req,res)=>{
const{name,email,password,dp}=req.body;
if(!email || !name || !password){
    res.status('400');
    throw new Error("All fields not filled");

}
const userExists=await User.findOne({email})
if(userExists){
    res.status('400');
    throw new Error("User exists. Use a different email");
}
const user=await User.create({
    name,
    email,
    password,
    dp
})
if(user){
res.status('201').json(
    {
        _id:user._id,
        name:user.name,
        email:user.email,
        password:user.password,
        token:makeToken(user._id),
        dp:user.dp
    }
)
    
}else{
    res.status('400');
    throw new Error("User not created");
}
}
)
const auth=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    const userExists=await User.findOne({email})
    console.log(userExists.checkPassword(password))
    // console.log(userExists)
if(userExists && (userExists.checkPassword(password))){
    res.status('201').json(
    {
        _id:userExists._id,
        name:userExists.name,
        email:userExists.email,
        password:userExists.password,
        dp:userExists.dp,
        token:makeToken(userExists._id)
    }
)
}else{
 res.status('401');
    throw new Error("Incorrect email or password");
}

})

const fetchUsers=asyncHandler(async(req,res)=>{
const keywords= req.query.search?{$or:[
{name:{$regex:req.query.search,$options:"i"}},
{email:{$regex:req.query.search,$options:"i"}}
]}:{};
// .find({ _id:{ $ne: req.user._id}})
const users= (await User.find(keywords))
res.send(users);
})
module.exports={registerUser,auth,fetchUsers}