import React, { useState , useEffect } from 'react';
import { usersApi } from '../../../service/base';
import { v4 as uuid4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for routing
import { useDispatch } from 'react-redux';

function Register() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('')
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  }

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  function validateUserName(name) {
    const regex = /^[a-zA-Z0-9]{3,}$/;
    return regex.test(name)  
  }
useEffect(() => {
  usersApi.getAllUsers().then(res=>{
    setUsers(res)
  })
}, [])
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    token: uuid4(),
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      validateEmail(registerData.email) &&
      validatePassword(registerData.password) &&
      registerData.confirmPassword === registerData.password &&
      validateUserName(registerData.name)
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
        role : 'user'
      });
      setRegisterData({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        token: uuid4(),
      });
      navigate('/login')
      setNotification('')
    } 
    else if(!validateEmail(registerData.email)){
      // alert('Invalid email')
      setNotification('Invalid email')
      }
      else if(!validatePassword(registerData.password)){
        // alert('Invalid password')
        setNotification('Invalid password')
        }
        else if(registerData.confirmPassword !== registerData.password){
          // alert('Passwords do not match')
          setNotification('Passwords do not match')
        }

    else {
      console.error('Please register with correct values');
      setNotification('Please register with correct value')
    }
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
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                name: e.target.value,
              })
            }
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
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                email: e.target.value,
              })
            }
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
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                password: e.target.value,
              })
            }
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
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                confirmPassword: e.target.value,
              })
            }
            required
          />
        </div>
        <button type="submit" className="btn-register">
          Register
        </button>
      </form>
      {
        notification.length > 0?     
         <div className="notification">
        <p>{notification}</p>
      </div> : null
      }

      <div className="login-redirect">
        <p>
          Already have an account?{' '}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
