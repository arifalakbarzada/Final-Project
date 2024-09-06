import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      'service_7qs79xq', 
      'template_la8xdru', 
      formData, 
      'uZiU_jvMcoRVe1YyL'
    )
    .then((response) => {
      console.log('Success!', response.status, response.text);
      setStatus('Your message was sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((err) => {
      console.log('Failed...', err);
      setStatus('An error occurred, please try again.');
    });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn-send">Send</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default Contact;
