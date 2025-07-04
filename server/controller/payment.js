const { current } = require("@reduxjs/toolkit");
const { razorpayInstance } = require("../config/razorpay");
const { order } = require("@mui/system");
const payment = require("../models/payment")
const user = require("../models/user");
const crypto = require("crypto");
const { Currency } = require("lucide-react");
require("dotenv").config();

const instance = razorpayInstance();
// 1st step-initialize payment

exports.createOrder = async (req, res) => {
    try {
        // const { amount } = req.body;
        // fetch email from req.user.body and from there fetch fee
        const { email } = req.user.email;

        //find user detail to find fee of the user
        const userDatails = await user.findOne({ email });
        const amount = userDatails.amount;

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
        const { order_id, payment_id, signature, paymentMonth } = req.body;
        const { email } = req.user.email;

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


            const paymentDoneDetails = await payment.create({
                id: id,
                paidAt: Date.now(),
                paymentId: payment_id,
                paymentMonth: paymentMonth,
                amount: fee,


            });
            console.log("paymentDoneDetails",paymentDoneDetails);
            // sucessfull payment
            return res.status(200).json({
                message: "Payment Sucessfull",
                success: true,

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