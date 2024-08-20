import React, { useEffect } from 'react'
import { cartApi } from '../../../service/base'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeCartItem, setCartItems } from '../../../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart.items);

  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  useEffect(() => {
    cartApi.getCart(JSON.parse(user).id).then(res => dispatch(setCartItems(res.userCart)));
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className='cart-container'>
      {
        cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <ul key={index} className='cart-item'>
                <li className="cart-image">
                  <img src={item.image} alt={item.name} />
                </li>
                <li className="cart-name">
                  <h4 onClick={() => {
                    navigate(`/products/${item.id}/${item.colorId}/${item.color}`)
                  }}>{item.name} {item.color}</h4>
                </li>
                <li className="cart-price">
                  <p>Price: ${item.price.toFixed(2)}</p>
                </li>
                <li className="cart-quantity">
                  <button onClick={() => {
                    dispatch(decreaseQuantity(item.colorId))
                  }}>-</button>
                  <p>{item.quantity}</p>
                  <button onClick={() => {
                    dispatch(increaseQuantity(item.colorId))
                  }}>+</button>
                </li>
                <li className="cart-remove">
                  <button onClick={() => {
                    dispatch(removeCartItem(item.colorId))
                  }}>X</button>
                </li>
              </ul>
            ))}
            <div className="cart-summary">
              <p className="total-price">Total: ${calculateTotal()}</p>
              <button className="checkout-button">Checkout</button>
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/" className="home-link">Go to Home</Link>
          </div>
        )
      }
    </div>
  );
}

export default Cart;
