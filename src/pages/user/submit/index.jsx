import React from 'react';
import { useNavigate } from 'react-router';

const Submit = () => {
    const navigate = useNavigate();
  return (
    <div className="submit-container">
      <h2>Thank You for Your Order!</h2>
      <p>Your order has been successfully placed.</p>
      
      <button className="btn-back-to-cart" onClick={() => {navigate('/cart')}}>
        Back to Cart
      </button>
    </div>
  );
};

export default Submit;
