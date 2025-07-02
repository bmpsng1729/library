const express=require("express");
const router=express.Router();
const{paymentVerification,createOrder}=require("../controller/payment")

router.post("/create-order",createOrder);
router.post("/verify-payment",paymentVerification);
module.exports=router;