import React from 'react';

function About() {
  return (
    <div className="about-container">
      <div className="about-banner">
        <h1>About Us</h1>
      </div>
      <div className="about-content">
        <h2>Welcome to TechShop</h2>
        <p>
          At TechShop, we are passionate about bringing you the latest and greatest in mobile technology. 
          From the newest smartphones to the most advanced tablets, we have everything you need to stay connected and productive.
        </p>
        <h3>Our Mission</h3>
        <p>
          Our mission is to provide top-quality products at competitive prices, along with exceptional customer service. 
          We believe that everyone should have access to the best technology available, and we strive to make that a reality for our customers.
        </p>
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Wide range of products</li>
          <li>Competitive prices</li>
          <li>Expert customer support</li>
          <li>Fast and reliable shipping</li>
          <li>Secure online shopping experience</li>
        </ul>
        <h3>Contact Us</h3>
        <p>
          Have questions? We're here to help! Reach out to us at <a href="mailto:support@techshop.com">support@techshop.com</a> or call us at (123) 456-7890.
        </p>
      </div>
    </div>
  );
}

export default About;
