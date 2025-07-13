const mongoose=require("mongoose");
const profileSchema= new mongoose.Schema({
    // adding email for testing purpose
   
    gender:{
        type:String,
      
    },
    dob:{
        type:Date,
        
    },
    about:{
        type:String
    },
    contactNumber:{
        type:Number,
       
    },
    LinkdeinId:{
        type:String,
    },
    instagramId:{
     type:String,
    },
    facebookId:{
     type:String
    },
    address:{
        type:String,
        required  : true,
    },
    city:{
        type:String,
        required  : true,
    },
    state:{
        type:String,
        required  : true,
    },
    pincode:{
        type:String,
        required  : true,
    },
    
     degree:{
        type:String,
    
        default:"B.Tech",

     },
     aadhar:{
        type:String,
        
     }
    
    
});
module.exports=mongoose.model("profile",profileSchema);