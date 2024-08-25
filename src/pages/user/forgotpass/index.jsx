import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { usersApi } from '../../../service/base';
import { setUsers } from '../../../redux/slices/userSlice';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import { PiArrowElbowLeft, PiArrowLeft } from 'react-icons/pi';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({})
  const [formData, setFormData] = useState({
    link: '',
  })
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.items);
  const navigate = useNavigate();
  useEffect(() => {
    usersApi.getAllUsers().then(res => {
      dispatch(setUsers(res));
    });
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = users.filter((user) => user.email === email)[0]
    if (filtered) {
      setUserData(filtered)
      setFormData({
        link: `https://final-project-lovat-three.vercel.app/resetpassword/${filtered.id}/${filtered.token}`
      })
      if (formData.link) {
        emailjs.send(
          'service_7qs79xq', // EmailJS servis kimliğiniz
          'template_5u044cb', // EmailJS şablon kimliğiniz
          formData, // Form verileri
          'uZiU_jvMcoRVe1YyL' // EmailJS kullanıcı kimliğiniz
        )
      }

    }
    console.log(formData)
  }
  return (
    <div className="forget-password-container">
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address *</label>
          <input type="email" id="email" name="email" onChange={
            (e) => {
              setEmail(e.target.value)
            }
          } required />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      <div className="login-redirect">
        <p>
          <Link to="/login"> <PiArrowLeft />
          {' '}
          Back to{' '}Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
