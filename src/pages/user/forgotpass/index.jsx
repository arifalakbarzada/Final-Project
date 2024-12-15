import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { usersApi } from '../../../service/base';
import { setUsers } from '../../../redux/slices/userSlice';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import { PiArrowLeft } from 'react-icons/pi';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({ link: '' });
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.items);
  const navigate = useNavigate();

  useEffect(() => {
    usersApi.getAllUsers().then(res => dispatch(setUsers(res)));
  }, [dispatch]);
  const validateEmail = (email) =>{
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email);
    if (user) {
      setUserData(user);
      const link = `https://final-project-lovat-three.vercel.app/resetpassword/${user.id}/${user.token}`;
      setFormData({ link });
      emailjs.send(
        'service_7qs79xq',
        'template_5u044cb',
        { link },
        'uZiU_jvMcoRVe1YyL'
      );
      toast.success('Password reset link sent to your email.')
    } else {
      toast.error('Email not found')
    }
  };

  return (
    <div className="forget-password-container">
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email address *</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='off'
          />
        </div>
        <button type="submit" className='forgetPassBtn'>Send Reset Link</button>
      </form>
      <div className="login-redirect">
        <p><Link to="/login"><PiArrowLeft /> Back to Log in</Link></p>
      </div>
    </div>
  );
}

export default ForgetPassword;
