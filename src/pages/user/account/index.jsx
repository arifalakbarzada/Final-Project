import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

function MyAccount() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div id='myAccount'>
            <div className="sidebar col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <ul>
          <li className="active">Dashboard</li>
          <li>Orders</li>
          <li>Payment Method</li>
          <li>Address</li>
          <li>Account Details</li>
          <li><button onClick={handleLogout}><FiLogOut /> Logout</button></li>
        </ul>
      </div>
      <h1>Welcome, {user?.email}</h1>
      
    </div>
  );
}

export default MyAccount;
