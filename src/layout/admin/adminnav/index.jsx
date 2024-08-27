import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../redux/slices/userSlice'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'

function AdminNavbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div  className="admin-header">

         <div className="logo" onClick={()=>{
          navigate('/')
         }}>
        <h1>TechShop</h1>
      </div>
      <nav className="nav-links">
        <ul>
          <li><NavLink to={'/admin/dashboard'}>Dashboard</NavLink></li>
          <li><NavLink to={'edit'}>Products</NavLink></li>
          <li><NavLink to={'users'}>Users</NavLink></li>
          <li><NavLink to={'orders'}>Orders</NavLink></li>
          <li><button onClick={
            ()=>{
              dispatch(logoutUser())
              navigate('/login')
            }
          }><CiLogout /> Logout</button></li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminNavbar