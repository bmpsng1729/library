const express=require("express");
const router=express.Router();

const {signup,login,logout,verifyOtp,resendOtp}=require("../controller/auth");
const{auth,isStudent}=require("../middlewares/auth")

router.post("/signup",signup);
router.post("/login",login);
router.get('/logout',logout);
router.post('/verify-otp',verifyOtp);
router.post("/resend-otp",resendOtp);

module.exports=router;