import React, { useState } from "react";
import axios from "axios";
import { Select } from "../../index"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
function Payment() {
    // to load the modal of razorpay
    const amount = JSON.parse(localStorage.getItem("userData")).fee;
    const { register, handleSubmit } = useForm();
    const currYear = new Date().getFullYear();
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay(paymentMonth) {
        console.log("paymentMonth", paymentMonth);
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        // for order creation

        const result = await axios.post("/api/v1/auth/payment/create-order");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        console.log("order created", result);

        const { amount, id: order_id, currency } = result.data;


        const options = {
            key: "rzp_test_b3MBa8l5gG1tAu", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "officers library",
            description: `You are paying for ${paymentMonth}`,
            order_id: order_id,
            handler: async function (response) {    // called after successfull payment
                try {
                    const data = {
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        paymentMonth: paymentMonth.paidMonth,
                    };
                    // for payment verification
                    const result = await axios.post("/api/v1/auth/payment/verify-payment", data);
                    console.log("result",result);
                  if(result.data.success){
                    toast.success( result.data.message||"payment successfull");
                  }
                    //DB OPERATiON:::-- if result.data.msg based on this do the db operation
                }
                catch (err) {
                   console.log("error in payment verification",err);
                   toast.error("error in payment verfication");
                }

            }
        };
        /// after excution of handler funtion payment successfull razorpay window will open from below code
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="mt-10">
            <form className="App-header" onSubmit={handleSubmit(displayRazorpay)}>

                <Select label="Enter Month for paying" options={[
                    `january ${currYear}`,
                    `february ${currYear}`,
                    `march ${currYear}`,
                    `april ${currYear}`,
                    `may ${currYear}`,
                    `june ${currYear}`,
                    `july ${currYear}`,
                    `august ${currYear}`,
                    `september ${currYear}`,
                    `october ${currYear}`,
                    `november ${currYear}`,
                    `december ${currYear}`
                ]} {...register("paidMonth", { required: true })} />

                <button className="bg-red-400 p-2 border-2 text-white cursor-pointer" type="submit">
                    {`Pay ₹${amount}`}
                </button>
            </form>
        </div>
    );
}

export default Payment;

