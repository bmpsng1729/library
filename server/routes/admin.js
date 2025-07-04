const express=require("express")
const router=express.Router();
const{studentCount,barGraphData,pieCharData}=require("../controller/admin");

router.get("/student-count",studentCount);
router.get("/bargraph-data",barGraphData);
router.get("/piechart-data",pieCharData);
module.exports=router;