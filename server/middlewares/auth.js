const jwt=require("jsonwebtoken");

exports.auth=async(req,res,next)=>{
  try{
      // extract jwt token from (cookie/body/header)
      console.log(req.cookies);
      //   TODO:::::::::::::::::put token into header:::::::
      const token=req.cookies.token || req.header("Authorization").replace("Bearer","");
      // verify the token
      if(!token){
        return res.status(400).json({
            message:"token not Found!",
            success:false,
        });
      }
      const decodedToken=await jwt.verify(token,process.env.JWT_SECRET);
      console.log("decodedToken in auth",decodedToken);
      // put the decode user and data so that we can use further
      req.user=decodedToken;
      
      // verification done: call next function
      next();



  } 
  catch(err){
    return res.status(400).json({
        message:"Error! in authentication",
        success:false,
    })
  } 
}

exports.isStudent=async(req,res,next)=>{
    try{
         // find email from user(bcz you have put this while doing isAuth)
         console.log("for verification of role and email",req.user);
         const email=req.user.email;
         const role=req.user.role;
         if(!email || role){
            console.log("Getting error in student role verification");
            return res.status(400).json({
                message:"Not getting the email or role from the auth,check the cookie again",
                success:false,
    
            });
         }
         
   //find accountType from token only(bacause you have already put during token creation)

   if(role!=='student'){
   return res.status(400).json({
    message:"Your are not authorized to acess this route",
    success:false,
   });
   }
   next();
    }
    catch(err){
              console.log("Error! in student authentication!");
              return res.status(400).json({
                message:"there is an error in role verification",
                success:false,
              })
        }
  

}

exports.isAdmint=async(req,res,next)=>{
    try{
         // find email from user(bcz you have put this while doing isAuth)
         console.log("for verification of role and email",req.user);
         const email=req.user.email;
         const role=req.user.role;
         if(!email || role){
            console.log("Getting error in admin role verification");
            return res.status(400).json({
                message:"Not getting the email or role from the auth,check the cookie again",
                success:false,
    
            });
         }
         
   //find accountType from token only(bacause you have already put during token creation)

   if(role!=='admin'){
   return res.status(400).json({
    message:"Your are not authorized to acess this route",
    success:false,
   });
   }
   next();
    }
    catch(err){
              console.log("Error! in admin authentication!");
              return res.status(400).json({
                message:"there is an error in role verification",
                success:false,
              })
        }
  

}