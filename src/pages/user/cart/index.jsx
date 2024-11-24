import React, { useEffect } from 'react';
import { cartApi, favListApi } from '../../../service/base';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeCartItem, setCartItems } from '../../../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { setFavList } from '../../../redux/slices/favListSlice';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.items);
  const favList = useSelector(state => state.favList.items);

  const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    if (user && user.id) {
      cartApi.getCart(user.id).then(res => dispatch(setCartItems(res.userCart)));
      favListApi.getFavList(user.id).then(res => dispatch(setFavList(res.favlist)));
    }
  }, [dispatch]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      {cart.length > 0 ? (
        <div className="cart-container">
          <h1>Your Cart</h1>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-details">
                <h4 onClick={() => {
                  navigate(`/products/${item.id}/${item.colorId}/${item.color}`);
                }}>
                  {item.name} - {item.color}
                </h4>
                <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                <div className="cart-quantity">
                  <button onClick={() => {
                    dispatch(decreaseQuantity({ colorId: item.colorId, fav: favList }));
                  }}>-</button>
                  <p>{item.quantity}</p>
                  <button onClick={() => {
                    dispatch(increaseQuantity({ colorId: item.colorId, fav: favList }));
                  }}>+</button>
                </div>
              </div>
              <div className="cart-remove">
                <button onClick={() => {
                  dispatch(removeCartItem({ colorId: item.colorId, fav: favList }));
                }}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p className="total-price">Total: ${calculateTotal()}</p>
            <button className="checkout-button" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to={'/'} className="shop-now-btn">Shop Now</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
