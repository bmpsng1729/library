
const razorpay=require("razorpay");
require("dotenv").config();

exports.razorpayInstance= ()=>{
   return new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env. RAZORPAY_KEY_SECRET

}) 
}
