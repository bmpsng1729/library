
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
// import { toast } from "react-toastify";
import{login} from "../../slices/authSlice";
import { Button, Input, Logo, Select } from '../index'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    console.log(typeof(data))
    console.log(data);
    setError("")
    try {
      // const userData = await authService.createAccount(data)  // make a bd call here

      // const userData = await fetch("http://localhost:4000/api/v1/auth/signup", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //  body: JSON.stringify(data)
      // });

      let userData;

      const datas = await userData.json();

      if (!userData.ok) {
        toast.error(datas.message || "Something went wrong");

      } else {
          dispatch(login(userData));
      navigate("/signin")
        toast.success("Signup successful");
      
      }
     
  }
        
        catch (error) {
  setError(error.message)
  }
}

return (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
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
          to="/signin"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign In
        </Link>
      </p>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
        <div className="flex space-x-4">
          <Select
            label="Preparing for"
            options={[
    "UPSC",
    "SSC CGL",
    "NDA",
    "CDS",
    "Group D",
    "jEE/NEET",
    "Other"
  ]}
            {...register("preparing-for", { required: true })}
          />
          <Select
            label="gender"
            options={["male", "female",]}
            {...register("gender", { required: true })}
          />
        </div>

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
        <Input
          label="Password: "
          type="password"
          placeholder="Enter password"
          {...register("password", { required: true })}
        />
        <Input
          label="mob. number"
          type="text"
          maxLength="10"
          placeholder="Enter contact number"
          {...register("mobile-number", { required: true })}
        />

        <Button type="submit" className="w-full hover:cursor-pointer">
          Create Account
        </Button>
      </form>
    </div>
  </div>
);


}

export default Signup