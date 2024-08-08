import React from 'react'
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../../../redux/slices/userSlice';

function SideBarForMyAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };
  return (
    <div className="sidebar col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <ul>
        <li> <NavLink
          to="dashboard"
          className={({ isActive }) => (isActive || window.location.pathname.startsWith('/dashboard') ? 'active' : '')}
        >Dashboard</NavLink></li>
        <li><NavLink to="orders" className={({ isActive }) => (isActive ? 'active' : '')}>Orders</NavLink></li>
        <li><NavLink to="resetpassword" className={({ isActive }) => (isActive ? 'active' : '')}>Reset Password</NavLink></li>
        <li><NavLink to="address" className={({ isActive }) => (isActive ? 'active' : '')}>Address</NavLink></li>
        <li><NavLink to="details" className={({ isActive }) => (isActive ? 'active' : '')}>Account Details</NavLink></li>
        <li><button onClick={handleLogout}><FiLogOut /> Logout</button></li>
      </ul>
    </div>
  )
}

export default SideBarForMyAccount