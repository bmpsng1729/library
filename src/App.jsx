import { useState } from 'react'
import './App.css'
import { Navbar,Contact, NewsPaper,Login, Signup,Home, Facility } from "./components/index"
import { Routes,Route } from 'react-router'



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
       
        
      </Routes>
      
    </>
  )
}

export default App
