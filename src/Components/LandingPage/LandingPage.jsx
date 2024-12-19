import React from 'react'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

function LandingPage() {
  return (
    <>
        
        <Outlet/>
        
        <Footer/>
    </>
  )
}

export default LandingPage