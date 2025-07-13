
const user = require("../models/user");
const otp = require("../models/otp");
const profile = require("../models/profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { mailSender } = require("../utils/mailSender");
const { registrationSuccessFullEmail, succefullRegistrationEmail } = require("../mail/registrationSuccessFullEmail");
const crypto = require("crypto");

// TODO:::implement log in later for the user only
// sign up is only for admin
exports.signup = async (req, res) => {
    try {
        const {  gender, email, mobNumber, name, password, accountType } = req.body
// validate for required details
        // put into env file
        const adminEmails = ["bmpsng@gmail.com", "tuntunsingh829204@gmail.com"];
        if (!adminEmails.includes(email)) {
            return res.status(400).json({
                message: "you are not authorize to signup as a admin",
                success: false,
            });

        }
       
        if (!email || !name || !password || !accountType) {
            return res.status(400).json({
                message: "you have not entered all required details,try again!!",
                success: false,
            });
        }
        if (accountType !== "admin") {
            return res.status(400).json({
                message: "only admins are allowed",
                success: false
            })
        }


 // check if user has registered or not
        const existUser = await user.findOne({ email })
           console.log("existuser",existUser);

        if (existUser) {  // to insure user is student and already signed up
            if(existUser.isVerified){
                return res.status(400).json({
                    message:"you have already verified ,please log in as a admin",
                    success:true,
                });
            }

            return res.status(400).json({

                message: "you are not verified ,please verify with otp or resend otp",
                success: false,
            });
        }

 //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashed password",hashedPassword);
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
        console.log("user profile created",profieDetails);


// generate otp  and saved to database,
        const otpgenerated = crypto.randomInt(1000, 9999).toString();
        const expiresIn = new Date(Date.now() + 10 * 60 * 1000);  // 10hrs
        console.log("otp and expire time",otpgenerated,expiresIn);
        //save to the database
        const userDatails = await user.create({
            email,
            password: hashedPassword,
            gender,
            mobNumber: Number(mobNumber),
            name,
            additionalDetails: profieDetails._id,
            accountType: accountType,
            isVerified: false,
        });
        console.log("created user details",userDatails);
        // save otp
        const optSavedData = await otp.create({
            id: userDatails._id,
            expiresIn: expiresIn,
            otpString: otpgenerated,

        });
        // send to the email
        const sentMailDetails = mailSender(email, "verification otp", otpgenerated);
        // return a successfull otp generation message
        return res.status(200).json({
            message: "email with otp sent successfully!, please verify",
            success: true,
        });
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
        const { email, password, accountType } = req.body;
        // keep this in the process.env file


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "provide all details carefully"
            });
        }
        // validate the 
        //check exist or not
        let existUser = await user.findOne({ email });
        console.log("existuser", existUser);
        if (!existUser) {
            return res.status(400).json({
                success: false,
                message: "Dear User!,it seems like you are not the part of officers library,contact us!"
            });
        }
        if (existUser.isVerified == false) {
            return res.status.json({
                message: "dear user you not verified yet",
                success: false,
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
            existUser = existUser.toObject();
            existUser.token = token;

            delete existUser.password;
            // set into cookie
            const options = {
                httpOnly: true,      // prevent JavaScript access (XSS protection)
                // secure: true,        // send only on HTTPS (set to false for local dev)
                maxAge: 3 * 24 * 60 * 60 * 1000 * 10 // 30 days
            }
            res.cookie("token", token, options);  // ke,value,some options
            // return a sucessfull return 
            // console.log("existuser",existUser);

            const user = {
                email: existUser.email,
                gender: existUser.gender,
                name: existUser.name,
                seatReserved: existUser.seatReserved,
                studyHr: existUser.studyHr,
                preparingFor: existUser.preparingFor,
                remAmount: existUser.remAmount,
                paidAmount: existUser.paidAmount,
                mobNumber: existUser.mobNumber,
                fee: existUser.fee,
                accountType:existUser.accountType,
            }
            // send a successfull email to the user
            const name = existUser.name;
            const date = Date.now();
            const mailResponse = mailSender(email, "successfull Login", succefullRegistrationEmail(name, date));
            console.log("mailResponse", mailResponse);

            return res.status(200).json({
                message: "Congratulations! logged in sucessfully",
                success: true,
                user: user
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

exports.logout = async (req, res) => {
    try {
        const options = {
            httpOnly: true,      // prevent JavaScript access (XSS protection)
            // secure: true,        // send only on HTTPS (set to false for local dev)

        }
        res.clearCookie('token', options);
        return res.status(200).json({
            messsage: "logged out successfully",
            success: true,
        })
    }
    catch (err) {
        return res.status(400).json({
            message: "problem in log out",
            success: false,
        })
    }
}

exports.verifyOtp = async (req, res) => {
    try {
// fetch email and otp
        const { email, otpval } = req.body;
// fetch details from the db
        const userDetail =await user.findOne({ email });

// do required validataion
        if (!userDetail) {
            return res.status(400).json({
                message: "you have not registered",
                success:false,
            });
        }
        if(userDetail.accountType!=="admin")
            return res.status(400).json({
        message:"you are not allowed to acess this route",
        success:false,
        });
        
       
   // already verified
        if (userDetail.accountType === "admin" && userDetail.isVerified == true) {
            return res.status(200).json({
                message: "dear admin you have already verified,please login",
                success: true,
            });
        }
// fetch otp
         const otpDetails =await otp.findOne({ id: userDetail._id });
        // check otp
    
        if (otpDetails.otpString !== otpval || userDetail.expiresIn < new Date()) {
            return res.status(400).json({
                message: "otp expired or invalid otp",
                success: false,
            });
        }
 //mark verified and save
        userDetail.isVerified = true,
            await userDetail.save()
 // delete data from the otp schema
        const otpDeleteDetail = await user.findOneAndDelete({ id: userDetail._id });
        console.log("otp deleted data", otpDeleteDetail);

 // return a successfull message
        return res.status(200).json({
            message: "you are verified now you can log in as a admin",
            success: true,
        });


    }
    catch (err) {
        console.log("err in vefifying the otp");
        return res.status(400).json({
            message: "there is an error in otp verification",
            success: false,
        });
    }
}

exports.resendOtp = async (req, res) => {
    try {
        //fetch the detail
        const { email } = req.body;
        // delete the otp if exist
        const userDetail = await user.findOne({ email });
        console.log(userDetail);
        if(!userDetail || userDetail.accountType!=="admin") return res.status(400).json({message:"unauthurized acess",success:false});
        if ( userDetail.accountType==="admin" && userDetail.isVerified == true) {
            return res.status.json({ message: "already verified", success: true });
        }

        const otpval = crypto.randomInt(1000, 9999).toString();
        const expiresIn = new Date(Date.now() + 10 * 60 * 1000);  // 10hrs
        const updatedotp = await otp.findOneAndUpdate({ id: userDetail._id },{
                     otpString:otpval,
                     expiresIn:expiresIn,
        });
        console.log("deleted user from otp",updatedotp);;
        
        mailSender(email, "verify otp", otpval);
        
        return res.status(200).json({
            message:"otp resended to your email",
            success:true,
        });
    }
    catch (err) {
        console.log("there is an error in resending the otp", err);
        return res.status(400).json({
            message: "there is an error in resending the opt",
            success: false,

        })
    }
}

