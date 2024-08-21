import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Checkout = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.items);
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      
      <div className="billing-details">
        <h3>Billing Details</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="john.doe@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="123 Main St" required />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="Anytown" required />
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zip Code</label>
            <input type="text" id="zipcode" placeholder="12345" required />
          </div>
          <button type="submit" className="btn-submit">Place Order</button>
        </form>
      </div>
      
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-item">
          <span>Item 1 x 1</span>
          <span>$50.00</span>
        </div>
        <div className="summary-item">
          <span>Item 2</span>
          <span>$25.00</span>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <span>$75.00</span>
        </div>
      </div>
      
      <button className="btn-back-to-cart" onClick={() => {navigate('/cart')}}>
        Back to Cart
      </button>
    </div>
  );
};

export default Checkout;
