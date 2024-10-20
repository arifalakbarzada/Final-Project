import React, { useEffect, useState } from 'react'
import { FiActivity, FiMapPin, FiShoppingCart, FiUser } from 'react-icons/fi';
import { usersApi } from '../../../../service/base';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

function AccountDashBoard() {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  const navigate = useNavigate()
  const [activity, setActivity] = useState('')
  const dispatch = useDispatch()
  const [role, setRole] = useState('')
  useEffect(() => {
    if (user) {
      usersApi.getSingleUser(JSON.parse(user).id).then(res => {
        setRole(res.role)
        setActivity(res.lastActivity)
      }
      )
    }
  }, [dispatch])
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
      <div className="dashboard-widgets">
        <div className="widget">
          <FiActivity className="widget-icon" />
          <div className="widget-details">
            <h3>Recent Activity</h3>
            <p>{new Date(activity).toLocaleString('en-US', { timeZone: 'Asia/Baku' })}</p>
          </div>
        </div>
        <div className="widget" onClick={() => {
          navigate('/myaccount/orders')
        }}>
          <FiShoppingCart className="widget-icon" />
          <div className="widget-details">
            <h3>Orders</h3>
            <p>Track your current and past orders.</p>
          </div>
        </div>
        <div className="widget" onClick={() => {
          navigate('/myaccount/address')
        }}>
          <FiMapPin className="widget-icon" />
          <div className="widget-details">
            <h3>Manage Addresses</h3>
            <p>Edit and manage your saved addresses.</p>
          </div>
        </div> {
          role === 'admin' ? <>
            <div className="widget widget-admin" onClick={() => {
              navigate('/admin/dashboard')
            }}>

              <FiUser className="widget-icon" />
              <div className="widget-details">
                <h3>Admin Panel</h3>
                <p>Manage the platform as an admin.</p>
              </div>
            </div>
          </> : null
        }


      </div>
    </div>
  );
}

export default AccountDashBoard

