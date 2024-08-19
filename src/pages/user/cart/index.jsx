import React, { useEffect, useState } from 'react'
import { cartApi } from '../../../service/base'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem, setCartItems } from '../../../redux/slices/cartSlice';

function Cart() {
  // const [cart, setCart] = useState([])
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items)

  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  useEffect(() => {
    cartApi.getCart(JSON.parse(user).id).then(res => dispatch(setCartItems(res.userCart)))
  }, [])
  console.log(cart)
  return (
    <div className='cart-container'>
      {
        cart.length > 0 ? (
          cart.map((item, index) => {
            return (
              <ul key={index} className='cart-item'>
                <li className="cart-image">
                  <img src={item.image} alt={item.name} />
                </li>
                <li className="cart-name">
                  <h4>{item.name} {item.color}</h4>
                </li>
                <li className="cart-price">
                  <p>Price: {item.price.toFixed(2)}</p>
                </li>
                <li className="cart-quantity">
                  <button>-</button>
                  <p>{item.quantity}</p>
                  <button>+</button>
                </li>
                <li className="cart-remove">
                  <button onClick={()=>{
                    dispatch(removeCartItem(item.colorId))
                  }}>X</button>
                </li>
              </ul>
            )
          })
        ) : (
          <p>Cart is empty</p>
        )
      }
    </div>
  )

}

export default Cart