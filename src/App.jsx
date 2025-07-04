
// TODO::: when application load make sure to complete the rem amount.....

import { useState } from 'react'
import './App.css'
import { Navbar,Contact, NewsPaper,Login, Signup,Home, Facility,ProfileForm,TimeTable,Admin,Payment,StudentDetails} from "./components/index"
import { Routes,Route } from 'react-router'
import SidebarCard from './components/dashboard/student/SidebarCard'
import UploadPdf from './components/dashboard/admin/UploadPdf'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        {/* public routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/facility' element={<Facility/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

        <Route path='dashboard' element={<SidebarCard/>}/>
        <Route path='dashboard/update-profile' element={<ProfileForm/>}/>
        <Route path='dashboard/time-table'element={<TimeTable/>}></Route>
        <Route path="admin" element={<Admin/>}/>
        <Route path='admin/upload-pdf' element={<UploadPdf/>}/>
        <Route path='/dashboard/fee-payment' element={<Payment/>} ></Route>
        <Route path='dashboard/your-detail' element={<StudentDetails/>}></Route>

       
        
      </Routes>
      
    </>
  )
}

export default App
