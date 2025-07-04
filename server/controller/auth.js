
const user = require("../models/user");
const profile = require("../models/profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.signup = async (req, res) => {
    try {
        // fetch all details,


     const { preparingFor, gender, email, mobNumber, name, password } = req.body
    
        // validate for required details
        if (!email || !name || !password) {
            return res.status(400).json({
                message: "you have not entered all required details,try again!!",
                success: false,
            });
        }

        // check if already exist
        const existUser = await user.findOne({ email });
        
        if (existUser) {
            return res.status(400).json({
                message: "dear user you have already registered, please signin!!",
                success: false,
            });
        }


        // ************ OTP VALIDATION**************88
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create an entry into the profile
        let profieDetails = await profile.create(
            {
                gender: "",
                dob: null,
                about: "",
                contactNumber: 9876543210,
                LinkdeinId: "https://www.linkedin.com/in/testuser",
                instagramId: "https://www.instagram.com/testuser",
                facebookId: "https://www.,facebook.com/testuser",
                address: "Room No. 102, Hostel-2, NIT Jamshedpur",
                city: "Jamshedpur",
                state: "Jharkhand",
                pincode: 831014,
                degree: "", // 
            }
        );
        // insert into db
        const userDatails = await user.create({
            email,
            password: hashedPassword,
            preparingFor,
            gender,
            mobNumber,
            name,
            additionalDetails: profieDetails._id
        });
        const details={
            email:userDatails.email,
            name:userDatails.name,
            accountType:userDatails.accountType,
            preparingFor:userDatails.preparingFor,
        }
        
        // send a sucessfull response
        return res.status(200).json({
            success: true,
            message: "congratulations!! ,registration done",
            details:details
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "there is an error in sigup ,try again",
        });
    }
}

exports.login = async (req, res) => {
    try {
        //take data from the req.body
        const { email, password } = req.body;
        // validate
    
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "provide all details carefully"
            });
        }
        //check exist or not
        let existUser = await user.findOne({ email });
              console.log("existuser",existUser);               
        if (!existUser) {
            return res.status(400).json({
                success: false,
                message: "dear uses you have not registered ,do registration and try again"
            });
        }
                      // upto here tested and running fine
        // verify the password
            
        if (await bcrypt.compare(password, existUser.password)) {
                
            //generate token
            const payload = {
                email: existUser.email,
                id: existUser._id,
                preparingFor: existUser.preparingFor
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

    
            // save the token in the user doc and sent into the cookie by making a field of token
           existUser= existUser.toObject();
             existUser.token=token;

             delete existUser.password;
            // set into cookie
            const options = {
                httpOnly: true,      // prevent JavaScript access (XSS protection)
                // secure: true,        // send only on HTTPS (set to false for local dev)
                maxAge: 3 * 24 * 60 * 60 * 1000*10 // 30 days
            }
            res.cookie("token",token,options);  // ke,value,some options
            // return a sucessfull return 
            // console.log("existuser",existUser);
            const user={
                email:existUser.email,
                gender:existUser.gender,
                name:existUser.name,
                seatReserved:existUser.seatReserved,
                studyHr:existUser.studyHr,
                preparingFor:existUser.preparingFor,
                remAmount:existUser.remAmount,
                paidAmount:existUser.paidAmount,
                mobNumber:existUser.mobNumber,
                fee:existUser.fee,
            }
        
            return res.status(200).json({
                message:"Congratulations! logged in sucessfully",
                success:true,
                user:user
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "dear user!,you have not entered the correct password,try again"
            })
        }

        //return a success response
    }
    catch (err) {

        return res.status(400).json({
            success: false,
            message: "there is an error in login,try again",
        })
    }
}

exports.logout=async(req,res)=>{
    try{
         const options = {
                httpOnly: true,      // prevent JavaScript access (XSS protection)
                // secure: true,        // send only on HTTPS (set to false for local dev)
               
            }
          res.clearCookie('token',options);
          return res.status(200).json({
            messsage:"logged out successfully",
            success:true,
          })
    }
    catch(err){
      return res.status(400).json({
        message:"problem in log out",
        success:false,
      })
    }
}

