import React, { useEffect, useState } from 'react';
import { usersApi } from '../../../service/base';
import { useDispatch } from 'react-redux';

const OrderPage = () => {
  const dispatch = useDispatch()
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([])
  useEffect(() => {
    usersApi.getAllUsers().then(res => setUsers(res))
  }, [dispatch])
  useEffect(() => {
    users.forEach((user)=>{
      setOrders([...orders , ...user.orders])
    })
  }, [])
  

  return (
    <div className="order-page">
      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>No Orders Yet :(</h3>
          <p>You have no orders at the moment. Once orders are placed, they will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-item">
              <h3>Order #{order.id}</h3>
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default OrderPage;



  

