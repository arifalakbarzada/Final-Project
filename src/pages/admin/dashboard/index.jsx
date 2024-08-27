import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, users: 2400 },
  { name: 'Feb', sales: 3000, users: 1398 },
  { name: 'Mar', sales: 2000, users: 9800 },
  { name: 'Apr', sales: 2780, users: 3908 },
  { name: 'May', sales: 1890, users: 4800 },
  { name: 'Jun', sales: 2390, users: 3800 },
  { name: 'Jul', sales: 3490, users: 4300 },
];

const Dashboard = () => {
  return (
    <div className="statistics-dashboard">
      <h2>Dashboard Statistics</h2>

      <div className="stats-cards">
        <div className="stats-card">
          <h3>Total Sales</h3>
          <p>$50,000</p>
        </div>
        <div className="stats-card">
          <h3>Total Users</h3>
          <p>12,000</p>
        </div>
        <div className="stats-card">
          <h3>Active Orders</h3>
          <p>350</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Sales & Users Growth</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
