
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
// import { toast } from "react-toastify";
import { signup } from "../../../slices/authSlice";
import { Button, Input, Logo, Select } from "../../index"
import axios from 'axios'
import { toast } from 'react-toastify';


function RegisterStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState("")


  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    console.log("data:",data);
    setError("")
    try {
      const userData = await axios.post("/api/v1/auth/admin/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // set is registered true

    //   dispatch(signup(data.email));
      // set into local storage
    //   localStorage.setItem("isRegistered", JSON.stringify(true));
     console.log("data",userData.data)
      if (userData.data.success) {
        toast.success(userData.data.message || "signup sucessfull");
        navigate("/verify-otp");
      }
      else {
        toast.error(userData.data.message || "error in signup")
      }
    }
    catch (error) {
      setError(error.message)
    }
    // for showing login if signed up store the signup
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-2">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
        {/* Optional: Add Logo */}
        <div className="mb-4 flex justify-center">
          {/* <img src={logo} alt="Logo" className="h-10" /> */}
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter full name"
              {...register("name", { required: true })}
            />
           <Input
            label="Email: "
            placeholder="Enter email"
            type="email"
            {...register("email", { required: true })}
          />
            <div className='flex  gap-1'>
            <Input
              label="Fees"
              placeholder="Enter Fee Amount"
              {...register("fee", { required: true })}
            />
            <Input
              label="Study Hours"
              type="text"
              maxLength="10"
              placeholder="Enter study hours"
              {...register("studyHr", { required: true })}
            />
          </div>


         
          <div className="flex space-x-4">

            <Select
              label="gender"
              options={["male", "female",]}
              {...register("gender", { required: true })}
            />
            <Input
              label="mob. Number"
              type="text"
              maxLength="10"
              placeholder="Enter contact number"
              {...register("mobNumber", { required: true })}
            />
          </div>


          <Button type="submit" className="w-full hover:cursor-pointer">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );


}

export default RegisterStudent
