import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../../slices/authSlice"
import { Button, Input, Logo, Select } from '../index'
import icon from "../../assets/icon.jpg"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const isLoggedin = useSelector((state) => state.auth.isLoggedin)
  const userData = useSelector((state) => state.auth.userData)

  // 🔁 Navigate after Redux state is updated
  useEffect(() => {
    if (isLoggedin && userData?.accountType) {
      if (userData.accountType === "admin") {
        navigate("/admin")
      } else if (userData.accountType === "student") {
        navigate("/dashboard")
      }
    }
  }, [isLoggedin, userData, navigate])

  // ⏎ Handle form submission
  const login = async (data) => {
    setError("")
    setLoading(true)

    try {
     const baseUrl = import.meta.env.VITE_API_BASE_URL;
         //  :::::::todo::: remove after testing
      console.log(`${baseUrl}/auth/login`);
      const response = await axios.post(`${baseUrl}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      if (response.data.success) {
        dispatch(authLogin(response.data))
        toast.success(response.data.message || "Successfully logged in")
      }

    } catch (err) {
      console.error("Login error:", err)
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 shadow-lg">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo src={icon} />
          </span>
        </div>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        {loading && <p className="text-blue-500 mt-2 text-center">Logging in...</p>}

        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
          <Select
            label="Account Type"
            options={["student", "admin"]}
            {...register("accountType", { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button type="submit" className="w-full">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
