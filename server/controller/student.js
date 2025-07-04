 const payment = require("../models/payment");
const user=require("../models/user")
const successStory=require("../models/successStory");
// fee details
//write sucess story
//update profile----do later
exports.feeDetails=async(req,res)=>{
  // take email from req.user.email
  const {email}=req.user.email;
  if(!email){
    console.log("not founding the email in the feeDetails controller");
    
  }

  try{
    const userDetail=await  user.findOne({email});
    
    if(!userDetail){
        return res.status(500).json({
            success:false,
            message:"seems like not getting the user in the database",
        })
    };
    //find all the trasactions of the of the user by _id
    const paymentDetails=payment.find({id:userDetail._id});
    console.log(paymentDetails);

    // make a user needed form and return 
     // TODO::::: sort based on the date of payment and then return

     const paymentDetail={
        paidAmount:userDetail.paidAmount,
        remAmount:userDetail.remAmount,
     }

      // return a successfull message
      return res.status(200).json({
        message:"data fetched successfully!",
        success:true,
        paymentDetail:paymentDetail,
        allPaymentDetails:paymentDetails,

      });
  } 
  catch(err){
    console.log("there is an error in feeDetails controller");
    return res.status(400).json({
        message:"there is an error in findind student fee Details"
    })
  }
   

  // fetch id from the 
};

exports.successStory=async(req,res)=>{
    try{
         //
         const {message,selectedIn}=req.body;
         const {email}=req.user.email;
         // fetch the student
         const userDetail=user.findOne({email});
         if(!userDetail) console.log("not finding userDetail in success story");
         //check if aleady written or not
         const   story=successStory.findOne({id:userDetail._id})
         if(story){
            return res.status(400).json({
                message:"user already written the success story",
                success:false,
            });
         }
           // insert the data
         const createdStoryDetail=successStory.create({
            id:userDetail._id,
            name:userDetail.name,
            selectedIn:selectedIn,
            message:message,
         });
             console.log("successfully created success story",createdStoryDetail);
         // return a successfull response
          return res.status(200).json({
            message:"Thanks ! user ,your story will motivate many people",
            success:true,
            createdStoryDetail,
          });
       

    }
    catch(err){
        console.log("err in success story");
        return res.status(400).json({
            success:false,
            message:"find issues in sucessStory handler",
        })
    }
}