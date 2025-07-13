import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate,Outlet } from 'react-router-dom'
function ProtectedRoute() {
     const isLoggedin = useSelector((state) => state.auth.isLoggedin);
     console.log("protected route,isloggedin",isLoggedin);
  return (
        
    isLoggedin ?<Outlet/>:<Navigate to="/login"/> 
  )
}

export default ProtectedRoute
