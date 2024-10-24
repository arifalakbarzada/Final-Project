import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { cartApi, ordersApi, usersApi } from '../../../service/base';
import { setOrders } from '../../../redux/slices/orderSlice';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const navigate = useNavigate();
  const [userCart, setUserCart] = useState([]);
  const orders = useSelector((state) => state.orders.items);

  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  const [checkoutDetails, setCheckoutDetails] = useState({
    userName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const calculateTotal = () => {
    return userCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  useEffect(() => {
    cartApi.getCart(JSON.parse(user).id).then(res => setUserCart(res.userCart));
    ordersApi.getOrders(JSON.parse(user).id).then(res => setOrders(res.orders));
  }, [user]);

  const handleCheckout = async (e) => {
    e.preventDefault();

    const addressData = {
      zipCode: checkoutDetails.zipCode,
      city: checkoutDetails.city,
      address: checkoutDetails.address
    };

    const validationErrors = validateAddressForm(addressData);
    if (Object.keys(validationErrors).length) {

      return;
    }

  };

  const validateAddressForm = (addressData) => {
    const errors = {};
    const zipCodePattern = /^\d{5}(-\d{4})?$/;
    if (!addressData.zipCode || !zipCodePattern.test(addressData.zipCode)) {
      errors.zipCode = "Invalid Zip Code";
    }
    const cityPattern = /^[a-zA-Z\s]+$/;
    if (!addressData.city || !cityPattern.test(addressData.city)) {
      errors.city = "Invalid City Name";
    }
    if (!addressData.address || addressData.address.trim().length < 5) {
      errors.address = "Address is too short";
    }
    return errors;
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="billing-details">
        <h3>Billing Details</h3>
        <form onSubmit={handleCheckout}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="John Doe" required onChange={
              (e) => setCheckoutDetails({ ...checkoutDetails, userName: e.target.value })
            } />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="john.doe@example.com" required onChange={
              (e) => setCheckoutDetails({ ...checkoutDetails, email: e.target.value })
            } />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="123 Main St" required onChange={
              (e) => setCheckoutDetails({ ...checkoutDetails, address: e.target.value })
            } />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="Anytown" required onChange={
              (e) => setCheckoutDetails({ ...checkoutDetails, city: e.target.value })
            } />
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zip Code</label>
            <input type="text" id="zipcode" placeholder="12345" required onChange={
              (e) => setCheckoutDetails({ ...checkoutDetails, zipCode: e.target.value })
            } />
          </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {userCart.length > 0 ? userCart.map((item, index) => (
          <div key={index} className="summary-item">
            <span>{item.name} , {item.color} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        )) : (
          <div>
            <p>No items in cart</p>
          </div>
        )}
        <div className="summary-total">
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>
                      <button type="submit" className="btn-submit">Place Order</button>

<div className="back-to-cart flex-center">
  <button className="btn-back-to-cart" onClick={() => { navigate('/cart') }}>
        Back to Cart
      </button>     
</div>

      </form>
      </div>

   
    </div>
  );
};

export default Checkout;
