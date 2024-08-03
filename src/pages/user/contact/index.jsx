import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

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
      'service_7qs79xq', // EmailJS servis kimliğiniz
      'template_la8xdru', // EmailJS şablon kimliğiniz
      formData, // Form verileri
      'uZiU_jvMcoRVe1YyL' // EmailJS kullanıcı kimliğiniz
    )
    .then((response) => {
      console.log('Başarılı!', response.status, response.text);
      setStatus('Mesajınız başarıyla gönderildi!');
      setFormData({ name: '', email: '', message: '' }); // Formu sıfırla
    })
    .catch((err) => {
      console.log('Başarısız...', err);
      setStatus('Bir hata oluştu, lütfen tekrar deneyin.');
    });
  };

  return (
    <div className="contact-container">
      <h2>İletişim</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Adınız *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>E-posta Adresiniz *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mesajınız *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-send">GÖNDER</button>
      </form>
      {status && setTimeout(()=>{
        return(
           <p className="status-message">{status}</p>
        )
      } , 2000)}
    </div>
  );
};

export default Contact;
