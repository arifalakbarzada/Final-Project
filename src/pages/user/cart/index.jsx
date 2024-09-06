import React, { useEffect } from 'react';
import { cartApi } from '../../../service/base';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeCartItem, setCartItems } from '../../../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.items);
  const favList = useSelector(state => state.favList.items);
  
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  useEffect(() => {
    if (user && user.id) {
      cartApi.getCart(user.id).then(res => dispatch(setCartItems(res.userCart)));
    }
  }, [dispatch, user]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <>
      {cart.length > 0 ? (
        <div className='cart-container'>
          {cart.map((item, index) => (
            <ul key={index} className='cart-item'>
              <li className="cart-image">
                <img src={item.image} alt={item.name} />
              </li>
              <li className="cart-name">
                <h4 onClick={() => {
                  navigate(`/products/${item.id}/${item.colorId}/${item.color}`);
                }}>
                  {item.name} {item.color}
                </h4>
              </li>
              <li className="cart-price">
                <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
              </li>
              <li className="cart-quantity">
                <button onClick={() => {
                  dispatch(decreaseQuantity({ colorId: item.colorId, fav: favList }));
                }}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => {
                  dispatch(increaseQuantity({ colorId: item.colorId, fav: favList }));
                }}>+</button>
              </li>
              <li className="cart-remove">
                <button onClick={() => {
                  dispatch(removeCartItem({ colorId: item.colorId, fav: favList }));
                }}>X</button>
              </li>
            </ul>
          ))}
          <div className="cart-summary">
            <p className="total-price">Total: ${calculateTotal()}</p>
            <button className="checkout-button" onClick={() => navigate('/checkout')}>Checkout</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button className="shop-now-btn"><Link to={'/'}>Shop Now</Link></button>
        </div>
      )}
    </>
  );
}

export default Cart;
