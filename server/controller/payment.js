
const { razorpayInstance } = require("../config/razorpay");
const payment = require("../models/payment")
const user = require("../models/user");
const crypto = require("crypto");
require("dotenv").config();
const{mailSender}=require("../utils/mailSender");
const {paymentSuccessEmail}=require("../mail/paymentSucessfullEmail");
const { successfulPaymentMessageToAdmin } = require("../mail/successfulPaymentMessageToAdmin ");

const instance = razorpayInstance();
// 1st step-initialize payment

exports.createOrder = async (req, res) => {
    try {
        // const { amount } = req.body;
        // fetch email from req.user.body and from there fetch fee
        //find user detail to find fee of the user
        const email=req.user.email;
        const userDatails = await user.findOne({ email });
        const amount = userDatails.fee;
      const options = {
            amount: amount * 100,
            currency: "INR", //  fixed spelling
            receipt: `receipt_order_${Date.now()}`,
        };

        instance.orders.create(options, (err, order) => {
            if (err || !order) {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong in order creation",
                });
            }
             console.log("order created successfull:",order);
            return res.status(200).json(order); //  return order object
        });
    } catch (err) {
        console.error("Error in order creation:", err);
        return res.status(400).json({
            message: "Something went wrong in order creation of Razorpay",
            success: false,
        });
    }
};

// payment verification (last step)
// order_id+hmacObject+payment_id=signature 
exports.paymentVerification = async (req, res) => {
    try {
        console.log("came in the payment verification");
        const { order_id, payment_id, signature, paymentMonth } = req.body;
        console.log("orderid,paymentid,signature,paymentmonth",order_id,payment_id,signature,paymentMonth);
        const  email  = req.user.email;
        console.log("email",email);
        

        const secret = process.env.RAZORPAY_KEY_SECRET;

        // create a hmacObjec
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(order_id + "|" + payment_id);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature === signature) {
            // TODO:::::::: DB operations
            const userDatails = await user.findOne({ email });
            const fee = userDatails.fee;
            const id = userDatails._id;
            console.log("user details in payment verifation:",userDatails);


            const paymentDoneDetails = await payment.create({
                id: id,
                paidAt: Date.now(),
                paymentId: payment_id,
                paymentMonth: paymentMonth,
                amount: fee,


            });
            // update the remAmount and paidAmount
              const remAmount=userDatails.remAmount-fee;
              const paidAmount=userDatails.paidAmount+fee
              
              userDatails.remAmount=remAmount;
              userDatails.paidAmount=paidAmount;
              await userDatails.save();
            //sent sucess mail to the user
                 mailSender(email,"payment successfyll",paymentSuccessEmail(userDatails.name,userDatails.fee,order_id,payment_id,paymentMonth))
             // email to the user
            mailSender("bmpsng@gmail.com",`${userDatails.name}`,successfulPaymentMessageToAdmin(userDatails.name,userDatails.fee,order_id,payment_id,userDatails.joiningDate))

            // sucessfull payment
            return res.status(200).json({
                message: "Payment Sucessfull",
                success: true,
                paymentDoneDetails,

            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "some error in payment verification"
            })
        }
    }
    catch (err) {
        return res.status(400).json({
            message: "some error in payment verification",
            success: false,
        })
    }

}