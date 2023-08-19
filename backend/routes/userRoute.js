const express = require('express');
const router=express.Router();

const userData = require("../model/signUp");
const jwt=require("jsonwebtoken");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//Login api
router.post("/login",async(req,res)=>{
    let username=req.body.username;
    console.log(username);
    let password=req.body.password;
    console.log(password);
    const user= await userData.findOne({username: username});
    console.log(user); 
    if(!user){
        res.json({message:"user not found"})
    }
    try{
        if(user.password==password){
            jwt.sign({email:username,id:user._id},"ict",{expiresIn:'1d'},
            (error,token)=>{
                if(error){
                  res.json({message:"Token  not generate"})  
                }
                else{
                    res.json({message:"Login sucessfully",token:token,data:user})
                }
            }
                       
        )}
        else
        {
            res.json({message:"Lodin failed"})
        }
    }
    catch(err){
        console.log(err)
    }
});

//sign up
router.post("/signup",async(req,res)=>{
    try {
        const item=req.body;
        const newUser= userData(item);
        await newUser.save();
        res.status(200).send('Registered successfully');
    }
    catch (err) {
        res.status(404).send('Post not done');
        console.log(err);
    }
});

module.exports=router;