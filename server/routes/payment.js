const express=require("express");
const router=express.Router();
const{paymentVerification,createOrder}=require("../controller/payment");
const{auth}=require("../middlewares/auth")

router.post("/create-order",auth,createOrder);
router.post("/verify-payment",auth,paymentVerification);
module.exports=router;