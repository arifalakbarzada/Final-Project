import React from 'react'
import { FiActivity, FiMapPin, FiShoppingCart } from 'react-icons/fi';

function AccountDashBoard() {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
      <div className="dashboard-widgets">
        <div className="widget">
          <FiActivity className="widget-icon" />
          <div className="widget-details">
            <h3>Recent Activity</h3>
            <p>See your latest account activity.</p>
          </div>
        </div>
        <div className="widget">
          <FiShoppingCart className="widget-icon" />
          <div className="widget-details">
            <h3>Orders</h3>
            <p>Track your current and past orders.</p>
          </div>
        </div>
        <div className="widget">
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

