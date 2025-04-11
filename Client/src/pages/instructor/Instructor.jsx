import React from 'react'
import { Outlet } from 'react-router-dom'
const Instructor = () => {
  return (
    <div>
      <h1>Instructor</h1>
      <Outlet/>
    </div>
  )
}

export default Instructor;
