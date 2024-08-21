import React, { useState } from 'react'
import { usersApi } from '../../../service/base';
import { v4 as uuid4 } from 'uuid';


function Register() {
    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(password);
      }
    
      function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      }
    const [registerData, setRegisterData] = useState({
        email : '',
        password : '',
        name : '' ,
        confirmPassword : '',
        token : uuid4()
    })
    const handleRegister = (e) => {
        e.preventDefault();
        if (validateEmail(registerData.email) &&validatePassword(registerData.password) && registerData.confirmPassword === registerData.password) {
          usersApi.addUser({
            email: registerData.email,
            password: registerData.password,
            userName: registerData.name,
            token: registerData.token,
            userCart : [],
            orders : [], 
            favlist : []
          })
          setRegisterData(
            {
              email: '',
              password : '',
              name : '',
              confirmPassword : '',
              token : uuid4()
            }
          )
        } else {
          console.error('Please register with correct values');
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
                onChange={(e) => setRegisterData({...registerData , name : e.target.value})}
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
                onChange={(e) => setRegisterData({...registerData , email : e.target.value})}
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
                onChange={(e) => setRegisterData({...registerData , password :e.target.value})}
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
                onChange={(e) => setRegisterData({...registerData , confirmPassword :e.target.value})}
                required
            />
        </div>
        <button type="submit" className="btn-register">Register</button>
    </form>
</div>
  )
}

export default Register