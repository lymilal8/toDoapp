const mongoose= require('mongoose');
const blogSchema=mongoose.Schema({
    userId:String,
    title:String,
    description:String,
    status:String,
    publishedAt:{
        type:Date,
        default:new Date()
    }
});
const blogModel=mongoose.model('blogdata',blogSchema);
module.exports=blogModel;