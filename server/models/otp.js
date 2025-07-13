const mongoose=require("mongoose");

const otpSchema=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        req:true,
    },
    otpString:{
        type:String,
        required:true,

    },
    expiresIn:{
        type:Date,
    }
})
module.exports=mongoose.model("otp",otpSchema);