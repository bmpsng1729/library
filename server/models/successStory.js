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
    id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "user",
            },

});

module.exports=mongoose.model("successStory",successStorySchema);