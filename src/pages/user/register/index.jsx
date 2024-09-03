import React, { useState, useEffect } from 'react';
import { usersApi } from '../../../service/base';
import { v4 as uuid4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    usersApi.getAllUsers().then(res => setUsers(res));
  }, []);

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    token: uuid4(),
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === registerData.email || user.userName === registerData.name);
    if (
      validateEmail(registerData.email) &&
      validatePassword(registerData.password) &&
      registerData.confirmPassword === registerData.password &&
      validateUserName(registerData.name) &&
      !user
    ) {
      usersApi.addUser({
        email: registerData.email,
        password: registerData.password,
        userName: registerData.name,
        token: registerData.token,
        lastActivity: new Date(),
        userCart: [],
        orders: [],
        favlist: [],
        status: 'Active',
        role: 'user'
      });
      setRegisterData({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        token: uuid4(),
      });
      setNotification('');
      navigate('/login');
    } else {
      handleValidationErrors(user);
    }
  };

  const handleValidationErrors = (user) => {
    if (user) setNotification('User already exists');
    else if (!validateEmail(registerData.email)) setNotification('Invalid email');
    else if (!validatePassword(registerData.password)) setNotification('Invalid password');
    else if (registerData.confirmPassword !== registerData.password) setNotification('Passwords do not match');
    else setNotification('Please register with correct values');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn-register">Register</button>
        {notification && <div className="notification"><p>{notification}</p></div>}
      </form>
      <div className="login-redirect">
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}

export default Register;
