import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../../slices/authSlice";
import { Button, Input, Logo, Select } from '../index'
import { useDispatch } from "react-redux";
import icon from "../../assets/icon.jpg"
// import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"
// import { toast } from "react-toastify";

import { useSelector } from "react-redux";

function Login() {
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")


  const login = async (data) => {
    setError("")
    try {
      // const session = await authService.login(data)   /// make a backend call

      // const response = await fetch("http://localhost:4000/api/v1/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });
 let response="hii";
      const datas = await response.json();



      if (!response.ok) {
        toast.error(datas.message || "something went wrong! try again");
      }


      else {
       
        dispatch(authLogin(datas));
    // saving token  into the localstorage
    console.log("token", JSON.stringify(datas.token));
        localStorage.setItem("token", JSON.stringify(datas.token));
         localStorage.setItem("userData", JSON.stringify(datas.user));
         console.log("userData",data.user);
        
        // toast.success('🦄 logged in successfully');

        if (datas.user.accountType === 'student') {
          navigate('/student/dashboard')
        }
        if (datas.user.accountType === "admin") {
          navigate('/admin/dashboard');
        }


      }



      // if (session) {
      //   // const userData = await authService.getCurrentUser()
      //   if (userData) dispatch(authLogin(userData));
      //   navigate("/")
      // }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 shadow-lg">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo src={icon} />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default Login
