const express = require('express');
const router=express.Router();
const jwt=require("jsonwebtoken");


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const blogData = require('../model/blogData');

//GET

router.get('/getbdata',async(req,res)=>{
    try {

        const data=await blogData.find();
        res.send(data);
    }
    catch (err) {
        res.status(404).send('Data not found');
        console.log(err);
    }
})

//POST

router.post('/postbdata',async(req,res)=>{
    try {
        const item=req.body;
        const newData= blogData(item);
        jwt.verify(req.body.token,"ict",
        (error,decoded)=>{
            if(decoded && decoded.email){
                newData.save();
                res.json({message:"Post added successfully"}); 
            }else{
                res.json({message:"Unauthorised user"});
            }

        }
        )
        // const savedData=await newData.save();
        // res.json({message:"Post added sucecessfully"});
        // res.status(200).send('data posted successfully');
    }
    catch (err) {
        res.json({message:"Uable to post"});
        // res.status(404).send('Post not done');
        console.log(err);
    }
})


//UPDATE

// router.put('/putbdata/:id',async (req, res) =>{
//     try {
//         const id=req.body._id;
//         const updateData={$set:req.body};
//         const updatedPut=await blogData.findByIdAndUpdate(id,updateData);
//         res.send(updatedPut);
//         res.status(200).send('Updation successfull');

//     }
//     catch (err) {
//         res.status(404).send('Updation not done');
//         console.log(err);
//     }

// })


router.put('/edit/:id',async (req, res) =>{
    try {
        const item=req.body;
        const postid=req.params.id;
        console.log(postid);
       
        const updatedPut=await blogData.findByIdAndUpdate(postid,item);
        res.json({message:"Updated Successfully"});
    }
    catch (err) {
        
        console.log(err.message);
        res.status(400).json({message:"Unable to update"});
    }

});

//delete

router.delete('/delete/:_id',async  (req, res) =>{
    try {
        const postId=req.params._id;
        console.log(postId);
        const deletePost=await blogData.findByIdAndDelete(postId);
        console.log("deletePost");
        res.json({message:"Delete Post successfull"});
        // res.send(deleteData).send('deletion successfull');
        // res.status(200);

    }
    catch (err) {
        res.status(404).json('unable to delete post');
        console.log(err);
    }

})
module.exports=router;
