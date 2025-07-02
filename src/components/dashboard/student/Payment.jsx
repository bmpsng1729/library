import React from "react";
import axios from "axios";
function Payment() {
    // to load the modal of razorpay
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

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
                     // for order creation
        const result = await axios.post("/api/v1/auth/student/create-order");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

       const { amount, id: order_id, currency } = result.data;


        const options = {
            key: "rzp_test_ns2v5BKbsspADO", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Soumya Corp.",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                                // for payment verification
                const result = await axios.post("/api/v1/auth/student/verify-payment", data);

                alert(result.data.msg);
                //DB OPERATiON:::-- if result.data.msg based on this do the db operation
            },
            prefill: {
                name: "Soumya Dey",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="mt-10">
            <header className="App-header">
                <p>Buy React now!</p>
                <button className="bg-red-400 p-2 border-2 text-white cursor-pointer" onClick={displayRazorpay}>
                    Pay ₹500
                </button>
            </header>
        </div>
    );
}

export default Payment;

