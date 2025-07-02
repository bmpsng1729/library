const { current } = require("@reduxjs/toolkit");
const { razorpayInstance } = require("../config/razorpay");
const { order } = require("@mui/system");
const crypto = require("crypto");
const { Currency } = require("lucide-react");
require("dotenv").config();

const instance = razorpayInstance();
// 1st step-initialize payment

exports.createOrder = async (req, res) => {
    try {
        // const { amount } = req.body;
         const amount=500;

        const options = {
            amount: amount * 100,
            currency: "INR", // ✅ fixed spelling
            receipt: `receipt_order_${Date.now()}`,
        };

        instance.orders.create(options, (err, order) => {
            if (err || !order) {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong in order creation",
                });
            }

            return res.status(200).json(order); // ✅ return order object
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
        const { order_id, payment_id, signature } = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;

        // create a hmacObjec
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(order_id + "|" + payment_id);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature === signature) {
            // TODO:::::::: DB operations
            // sucessfull payment
            // return res.status(200).json({
            //     message: "Payment Sucessfull",
            //     success: true,

            // });
            return res.status(200).json(order)
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