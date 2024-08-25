import React, { useEffect, useState } from 'react'
import { FiActivity, FiMapPin, FiShoppingCart } from 'react-icons/fi';
import { usersApi } from '../../../../service/base';
import { useNavigate } from 'react-router';

function AccountDashBoard() {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  const navigate = useNavigate()
  const [activity, setActivity] = useState('')
  useEffect(()=>{
usersApi.getSingleUser(JSON.parse(user).id).then(res=>setActivity(res.lastActivity))
  },[window.location.href])
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
      <div className="dashboard-widgets">
        <div className="widget">
          <FiActivity className="widget-icon" />
          <div className="widget-details">
            <h3>Recent Activity</h3>
            <p>{activity}</p>
          </div>
        </div>
        <div className="widget" onClick={()=>{
          navigate('/myaccount/orders')
        }}>
          <FiShoppingCart className="widget-icon" />
          <div className="widget-details">
            <h3>Orders</h3>
            <p>Track your current and past orders.</p>
          </div>
        </div>
        <div className="widget" onClick={()=>{
          navigate('/myaccount/address')
        }}>
          <FiMapPin className="widget-icon" />
          <div className="widget-details">
            <h3>Manage Addresses</h3>
            <p>Edit and manage your saved addresses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashBoard

