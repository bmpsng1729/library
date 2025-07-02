const mongoose=require("mongoose");

const successStorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    selectedIn:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true,

    },
});

module.exports=mongoose.model("successStory",successStorySchema);