import React from 'react'
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../../../redux/slices/userSlice';
import { MdDashboard } from 'react-icons/md';
import { FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
import { GrUserSettings } from 'react-icons/gr';

function SideBarForMyAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };
  return (
    <div className="sidebar">
      <ul>
        <li onClick={()=>navigate('dashboard')}> <NavLink to="dashboard"><MdDashboard /> Dashboard</NavLink></li>
        <li onClick={()=>navigate('orders')}><NavLink to="orders"><FaShoppingCart /> Orders</NavLink></li>
        <li onClick={()=>navigate('address')}><NavLink to="address"><FaMapMarkerAlt /> Address</NavLink></li>
        <li onClick={()=>navigate('settings')}><NavLink to="settings"><GrUserSettings /> Settings</NavLink></li>
      </ul>
      <div className='logout' onClick={handleLogout}><button><FiLogOut /> Logout</button></div>

    </div>
  )
}

export default SideBarForMyAccount