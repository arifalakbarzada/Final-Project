import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about-container">
      <div className="about-banner">
        <h1>About TechShop</h1>
      </div>
      <div className="about-content">
        <h2>Welcome to TechShop</h2>
        <p>
          At TechShop, we're committed to bringing you the latest in mobile technology. Whether it's the newest smartphones or cutting-edge tablets, our curated selection ensures you have access to the best tools for staying connected and productive.
        </p>
        <h3>Our Mission</h3>
        <p>
          Our mission is simple: deliver top-tier products at competitive prices, paired with unparalleled customer service. We believe that everyone deserves access to the latest technology, and we strive to make that possible for all our customers.
        </p>
        <h3>Why Choose TechShop?</h3>
        <ul>
          <li>Extensive range of products</li>
          <li>Competitive and transparent pricing</li>
          <li>Dedicated customer support team</li>
          <li>Swift and secure delivery services</li>
          <li>Safe and reliable online shopping experience</li>
        </ul>
        <h3>Contact Us</h3>
        <p>
          Got questions? We're here to assist! Reach out to us at <Link to={'/contact'}>Our Contact Page</Link> or call us at (123) 456-7890.
        </p>
      </div>
    </div>
  );
}



export default About;
