import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../redux/slices/userSlice'
import { Link } from 'react-router-dom'

function AdminNavbar() {
  const dispatch = useDispatch()
  return (
    <div  className="admin-header">

         <div className="logo">
        <h1>TechShop</h1>
      </div>
      <nav className="nav-links">
        <ul>
          <li><Link to={'/admin/dashboard'}>Dashboard</Link></li>
          <li><Link to={'edit'}>Products</Link></li>
          <li><Link to={'users'}>Users</Link></li>
          <li><Link to={'orders'}>Orders</Link></li>
          <li><a onClick={
            ()=>{
              dispatch(logoutUser())
            }
          }>Logout</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminNavbar