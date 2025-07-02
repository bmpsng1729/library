
const cloudinary = require('cloudinary').v2;
require("dotenv").config();


exports.connectToCloudinary=async()=>{
 try{
      cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET

      });
      console.log("Connection to cloudinary is sucessfull");
    
 }
 catch(err){
    console.log("err in cloudinary connection");
 }
}
