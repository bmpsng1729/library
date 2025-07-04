const mongoose=require("mongoose");
const { data } = require("react-router");

const newsPaperSchema=new mongoose.model({
    date:{
        type:Date,
        required:true,
    },
    topic:{
        type:String,
    },
    url:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("newsPaper",newsPaperSchema);