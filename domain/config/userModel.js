const mongoose=require('mongoose')
const userschema=mongoose.Schema({
    Name:{
        type:String,
        required:true},
    password:{
        type:Number,
        required:true}

})
const users=mongoose.model("users",userschema)
module.exports=users