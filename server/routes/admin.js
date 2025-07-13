const express=require("express")
const router=express.Router();
const{studentCount,barGraphData,pieCharData,registerStudent}=require("../controller/admin");
const {signup}=require("../controller/auth");
const{auth,isAdmin}=require("../middlewares/auth")

router.get("/student-count",studentCount);
router.get("/bargraph-data",barGraphData);
router.get("/piechart-data",pieCharData);
router.post("/register",auth,registerStudent);
module.exports=router;