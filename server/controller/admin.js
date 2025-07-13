const user = require("../models/user");
const profile=require("../models/profile")
const payment = require("../models/payment");
const { mailSender } = require("../utils/mailSender");
const { succefullRegistrationEmail } = require("../mail/registrationSuccessFullEmail")
const bcrypt=require("bcrypt");

// student list  
exports.studentCount = async (req, res) => {
    try {
         const studentCount = await User.countDocuments({ accountType: "student" });

         return res.status(200).json({
            message:"all student fetched",
            success:true,
            count:studentCount,
         });
    }
    catch (err) {
       return res.status(400).json({
        success:false,
        message:"there is an error in counting all students",
       })
    }
}

//register a user--kind of done
exports.registerStudent = async (req, res) => {
    try {
        // find data from the req body
        const { name, email, mobNumber, studyHr,gender,fee} = req.body;
        console.log("req.body:",req.body);
  
        const adminEmail = req.user.email;
        const date = Date.now();
        if (!name || !email || !mobNumber || !studyHr) {
            return res.status(400).json({
                message: "it seems like you have not provided the required details!!",
                success: false,
            });
        }
        // check if already register or not
        const detailsFromDb = await user.findOne({ email });
        if (detailsFromDb) {
            return res.status(400).json({
                success: false,
                message: "user have already registered"
            })
        }

        let profieDetails = await profile.create(
                    {
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
        const hashedPassword = await bcrypt.hash(email, 10);
        //register the student
        // hash the name as a password
        const registrationDetails = await user.create({
            email: email,
            name:name,
            password: hashedPassword,
            mobNumber: mobNumber,
            studyHr: Number(studyHr),
            gender:gender,
            fee:Number(fee),
            additionalDetails:profieDetails._id,
        });
        console.log("registration details,",registrationDetails);

        // sent a sucessfull message to the user
        const userMailRes = mailSender(email, "Student Registration Successfull", succefullRegistrationEmail(date, name));
        // sent a successfull email to the admin
        const adminMailRes = mailSender(adminEmail, "Student Registration Successfull", succefullRegistrationEmail(date, name));
        // return successfull response
        console.log("user mail res:",userMailRes);
        return res.status(200).json({
            success: true,
            message: "user registration successfull",
            // TODO:::: remove in final code
            userMailRes,
            adminMailRes,
            registrationDetails
        })
    }
    catch (err) {
        console.log("err in registering the student", err);
        return res.status(400).json({
            message: "Found Error! while registering the student",
            success: false,
        })
    }

}
//upload newspaper

//bar graph data
exports.barGraphData = async (req, res) => {
    try {
        const Payment = require("./models/payment"); // Adjust path if needed

        const currentYear = new Date().getFullYear();

        const monthlySummary = await payment.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lte: new Date(`${currentYear}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" } },
                    totalAmount: { $sum: "$amount" },
                    totalPayments: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.month": 1 }
            }
        ]);

        // return a sucessfull response
        return res.status(200).json({
            message: "bar graph data fetched",
            success: true,
            monthlySummary,
        });


    }
    catch (err) {
        console.log("error in bar graph data details->", err);
        return res.status(400).json({
            message: "there is an error in finding bar graph data",
            success: false,
        })
    }
}
// pie-chart data // types of student studying
exports.pieCharData = async (req, res) => {
    try {
        const preparingForCounts = await user.aggregate([
            {
                $match: {
                    accountType: "student" // Only count students, not admins
                }
            },
            {
                $group: {
                    _id: "$preparingFor",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 } // Optional: sort by count descending
            }
        ]);

        return res.status(200).json({
            success:true,
            message:"pie-chart data fetched successfully",
            preparingForCounts,
        })
    }

    catch (err) {
        return res.status(400).json({
            message: "there is an error in pie chart data details",
            success: false,

        })
    }
}
// search student details----TODO:::::::::
// 