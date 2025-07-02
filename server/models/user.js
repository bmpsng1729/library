const mongoose=require("mongoose");
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        mobNumber:{
            type:String,
            required:true,
        },
        aadhar:{
            type:Number,
        },
        address:{
            type:String,
        },
       paidAmount:{
            type:Number,
        },
        remAmount:{
            type:Number
        },
        gender:{
            type:String,
            enum:["male","female"],
        },
        seatReserved:{
            type:Boolean,
            default:false
        },
        
        preparingFor: {
    type: String,
    enum: [
      "UPSC",
      "SSC CGL",
      "NDA",
      "CDS",
      "Group D",
      "JEE/NEET",
      "Other",
    ],
    default: "Other"
  },
  accountType:{
    type:String,
    enum:["admin","student"],
    default:"student",
  },
  additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "profile",
		},

    }
);
module.exports=mongoose.model("user",userSchema);