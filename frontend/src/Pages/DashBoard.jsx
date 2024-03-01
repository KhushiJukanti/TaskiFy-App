import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

function DashBoard() {
  return (
    <div className='container-fluid'>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default DashBoard
