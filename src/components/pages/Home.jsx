import React from 'react'
import poster from "../../assets/poster.png"
import {Contact,Facility} from '../index'

function Home() {
  return (
    <div>
 <div className="flex justify-center items-center h-screen bg-gray-100">
  <img
    src={poster}
    alt="Facilities Poster"
    className="h-[80vh] w-auto object-contain rounded-xl border-2 border-gray-300 shadow-lg"
  />
</div>


     <Facility/>
     <Contact />
    </div>
  )
}

export default Home
