import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className=''>
      this is andi layout
          <Outlet/>
    </div>

    
  )
}

export default AdminLayout