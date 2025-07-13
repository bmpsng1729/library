const express=require("express");
const router=express.Router();

const{auth,isStudent}=require("../middlewares/auth")
const{updateProfile}=require("../controller/student")

router.patch('/update-profile',auth,updateProfile);

module.exports=router;