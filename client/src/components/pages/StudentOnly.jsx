import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function StudentOnly() {
  const userData = useSelector((state) => state.auth.userData)
  return userData?.accountType === "student" ? <Outlet /> : <Navigate to="/" />
}

export default StudentOnly
