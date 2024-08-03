// FooterComponent.jsx
import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
      <div className="row">
                <div className="footer-column col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <h3>Opening Time</h3>
                    <p>Mon – Fri: 8AM – 10PM</p>
                    <p>Sat: 9AM-8PM</p>
                    <p>Sun: Closed</p>
                    <p>We Work All The Holidays</p>
                </div>
                <div className="footer-column col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <h3>Quick Link</h3>
                    <ul>
                        <li>My Account</li>
                        <li>Wishlist</li>
                        <li>Order Tracking</li>
                        <li>Privacy Policy</li>
                        <li>Shipping Information</li>
                    </ul>
                </div>
                <div className="footer-column col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <h3>Information</h3>
                    <ul>
                        <li>About Us</li>
                        <li>Shopping Guide</li>
                        <li>Delivery Information</li>
                        <li>Privacy Policy</li>
                        <li>Our Store</li>
                    </ul>
                </div>
                <div className="footer-column col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <h3>123 Widget Street</h3>
                    <p>Acmeville, AC-1209</p>
                    <p>demo@example.com</p>
                    <p>+0123456789</p>
                </div>
            </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 TechShop Made with ❤️ by Arif Alakbarzada.</p>
                <div className="payment-methods">
                    <img src="visa.png" alt="Visa" />
                    <img src="amex.png" alt="American Express" />
                    <img src="discover.png" alt="Discover" />
                    <img src="paypal.png" alt="PayPal" />
                    <img src="mastercard.png" alt="MasterCard" />
                </div>
            </div>
        </div>
    );
};

export default Footer;
