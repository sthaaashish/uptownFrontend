import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Hero from './Hero'

const RootLayout = ({title,subtitle}) => {

  const [pathname, setPathname]=useState("home")
  const location = useLocation();

  useEffect(() => {
setPathname(location.pathname)
  }, [location.pathname]);

  return (
    <div>
     <Hero title={title} subtitle={subtitle} pathNames={pathname}/>
     <Outlet/>
     <Footer/>
    </div>
  )
}

export default RootLayout
