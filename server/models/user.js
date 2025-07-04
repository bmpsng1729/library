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
        fee:{
            type:Number,
            required:true,
            default:600

        },
        address:{
            type:String,
        },
       paidAmount:{
            type:Number,
            default:0,
        },
        remAmount:{
            type:Number,
            default:0,
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
      "SSC",
      "NDA",
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
  studyHr:{
 type:Number,
 required:true,
 default:6,
  },
  additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "profile",
		},

    }
);
module.exports=mongoose.model("user",userSchema);