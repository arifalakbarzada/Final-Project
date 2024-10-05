import React, { useEffect, useState } from 'react'
import { ordersApi } from '../../../../service/base';
import NotFoundForUserPage from '../../notfound';
import { useSelector } from 'react-redux';
import { setOrders } from '../../../../redux/slices/orderSlice';

function AccountOrders() {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  const orders = useSelector(state => state.orders.items)

  useEffect(() => {
    ordersApi.getOrders(JSON.parse(user).id).then(res => setOrders(res.orders))
  }, [])

  return (
    <>
      {
        orders.length > 0 ?

          <div className="orders">
            <h2 className="orders-title">Your Orders</h2>
            <table className="orders-table">
              {
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

              }
            </table>
          </div> : (
            <NotFoundForUserPage
              title="No Orders Found"
              message="You haven't placed any orders yet. Start shopping to see your orders here."
            />
          )
      }

    </>

  );
}

export default AccountOrders