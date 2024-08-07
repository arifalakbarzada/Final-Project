import React, { useEffect, useState } from 'react'
import { cartApi } from '../../../service/base'

function Cart() {
  const [cart, setCart] = useState([])
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  useEffect(() => {
   cartApi.getCart(JSON.parse(user).id).then(res=>setCart(res.userCart))
  }, [])
  console.log(cart)
  return (
    <div>Cart</div>
  )
}

export default Cart