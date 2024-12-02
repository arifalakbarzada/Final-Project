import React, { useEffect, useState } from 'react'
import { ordersApi } from '../../../../service/base';
import NotFoundForUserPage from '../../notfound';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../../../../redux/slices/orderSlice';

function AccountOrders() {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  const orders = useSelector(state => state.orders.items)
  const dispatch = useDispatch()
  useEffect(() => {
    ordersApi.getOrders(JSON.parse(user).id).then(res => setOrders(res.orders))
  }, [dispatch])

  return (
    <>
      {
        orders.length > 0 ?

          <div className="orders">
            <h2 className="orders-title">Your Orders</h2>
            <table className="orders-table">
              {
                orders.map((order)=>{
                  return(
                    <>
                    
                    </>
                  )
                }
              )
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