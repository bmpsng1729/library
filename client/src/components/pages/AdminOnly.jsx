import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function AdminOnly() {
  const userData = useSelector((state) => state.auth.userData);
  console.log("userdata",userData);
  return userData?.accountType === "admin" ? <Outlet /> : <Navigate to="/" />
}

export default AdminOnly
