
const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    name:{
        Type:String,
        required:true,

    },
    edition:{

    },
    author:{
        type:String,
        required:true,

    },
    usefulFor:{
        type:String,
        enum: [
      "UPSC ",
      "SSC CGL",
      "NDA",
      "CDS",
      "Group D",
      "JEE/NEET",
      "Other",
    ],
    default: "Other"
    }
});

module.exports=mongoose.model("book",bookSchema);