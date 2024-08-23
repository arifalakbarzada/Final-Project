import React, { useEffect, useState } from 'react'
import { ordersApi } from '../../../../service/base';

function AccountOrders() {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  const [orders, setOrders] = useState([])
  useEffect(() => {
    ordersApi.getOrders(JSON.parse(user).id).then(res => setOrders(res.orders))
  }, [])
  
  return (
    <div className="orders">
      <h2 className="orders-title">Your Orders</h2>
      <table className="orders-table">
        {
orders.length>0?
        <>
      <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
          orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</td>
              <td>{order.total}</td>
            </tr>
          ))
        }
        </tbody>   
        </>
       
     :(
          <div>
            <p>Orders Not Found</p>
          </div>
        )   }
      </table>
    </div>
  );
}

export default AccountOrders