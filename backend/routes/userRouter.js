const express = require('express');
const router=express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const userData = require('../model/signUp');

router.post('/signup',async(req,res)=>{
    try {
        const item=req.body;
        const newData= userData(item);
        await newData.save();
        res.status(200).send('data posted successfully');
    }
    catch (err) {
        res.status(404).send('Post not done');
        console.log(err);
    }
})


module.exports=router;