import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
  return (
    isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes
