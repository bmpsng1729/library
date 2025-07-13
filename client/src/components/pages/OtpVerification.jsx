import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function OtpVerification() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [resendTimer, setResendTimer] = useState(30); // 30 sec timer
    const inputRefs = useRef([]);
    const email = useSelector((state) => state.auth.userData);
    const navigate=useNavigate();

    useEffect(() => {
        const timer =
            resendTimer > 0 &&
            setInterval(() => setResendTimer((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, "");
        if (value.length === 0) {
            otp[index] = "";
        } else {
            otp[index] = value[0];
            if (index < 3) inputRefs.current[index + 1].focus();
        }
        setOtp([...otp]);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResend = async () => {
        try {
            if (resendTimer === 0) {
                console.log("Resend OTP");
                // You can call your backend resend logic here
                const response = await axios.post("/api/v1/auth/resend-otp", { email }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                if (response.data.success) {
                    toast.success(response.data.message || "otp resend successfully")
                }
                console.log("response of resend otp", response);
                setResendTimer(30);
            }
        }
        catch (err) {
            toast.error(response.data.message || "error in resending the otp");
            console.log("erorr in resend otp", err);
        }

    };

    const handleSubmit = async () => {
        try {
            const finalOtp = otp.join("");
            console.log("Entered OTP is:", finalOtp);
            const data = {
                "otpval": finalOtp,
                "email": email,
            }
            // You can send finalOtp to your backend here
            const response = await axios.post("/api/v1/auth/verify-otp", data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            console.log("backend sended otp", response.data);
            if (response.data.success) {
                 navigate('/login');
                toast.success(response.data.message || "otp verified successflly");
               

            }

        }
        catch (err) {
            toast.error(response.data.message || "err in otp verification")
            console.log("error in otpVerification,", err);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">OTP Verification</h2>
                <p className="text-center mb-4 text-gray-600">Enter the 4-digit code sent to your number</p>
                <div className="flex justify-center space-x-4 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength="1"
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Verify OTP
                </button>

                <div className="text-center mt-6 text-sm text-gray-600">
                    Didn’t receive the code?{" "}
                    <button
                        onClick={handleResend}
                        className={`font-medium ${resendTimer > 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:underline"
                            }`}
                        disabled={resendTimer > 0}
                    >
                        Resend OTP {resendTimer > 0 && `in ${resendTimer}s`}
                    </button>
                </div>
            </div>
        </div>
    );
}
