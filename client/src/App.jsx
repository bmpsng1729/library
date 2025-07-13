import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Components
import {
  Navbar, Contact, NewsPaper, Login, Signup, Home, Facility,
  ProfileForm, TimeTable, Admin, Payment, StudentDetails,
  OtpVerification, RegisterStudent, AdminOnly, StudentOnly,
  ProtectedRoute
} from "./components/index"

import SidebarCard from './components/dashboard/student/SidebarCard'
import UploadPdf from './components/dashboard/admin/UploadPdf'

function App() {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin)
  const userData = useSelector((state) => state.auth.userData)

  return (
    <>
      <Navbar />

      <Routes>

        {/* Smart redirect at "/" based on role */}
        <Route
          path="/"
          element={
            isLoggedin ? (
              userData?.accountType === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Home />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/facility" element={<Facility />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Pages (redirect if already logged in) */}
        <Route
          path="/login"
          element={
            isLoggedin ? (
              <Navigate to={userData?.accountType === "admin" ? "/admin" : "/dashboard"} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedin ? (
              <Navigate to={userData?.accountType === "admin" ? "/admin" : "/dashboard"} />
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/verify-otp"
          element={
            isLoggedin ? (
              <Navigate to={userData?.accountType === "admin" ? "/admin" : "/dashboard"} />
            ) : (
              <OtpVerification />
            )
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          {/* Admin-Only Routes */}
          <Route element={<AdminOnly />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/register" element={<RegisterStudent />} />
            <Route path="/admin/upload-pdf" element={<UploadPdf />} />
          </Route>

          {/* Student-Only Routes */}
          <Route element={<StudentOnly />}>
            <Route path="/dashboard" element={<SidebarCard />} />
            <Route path="/dashboard/update-profile" element={<ProfileForm />} />
            <Route path="/dashboard/time-table" element={<TimeTable />} />
            <Route path="/dashboard/fee-payment" element={<Payment />} />
            <Route path="/dashboard/your-detail" element={<StudentDetails />} />
          </Route>

        </Route>

        {/* Optional: Add a NotFound route for invalid paths */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  )
}

export default App
