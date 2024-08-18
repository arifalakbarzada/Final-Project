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
    <div className="sidebar col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12">
      <ul>
        <li><NavLink to="dashboard">Dashboard</NavLink></li>
        <li><NavLink to="orders">Orders</NavLink></li>
        <li><NavLink to="address">Address</NavLink></li>
        <li><NavLink to="details">Account Details</NavLink></li>
      </ul>
      <div className='logout'><button onClick={handleLogout}><FiLogOut /> Logout</button></div>

    </div>
  )
}

export default SideBarForMyAccount