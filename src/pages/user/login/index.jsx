import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, loginUser } from '../../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../../../service/base';

const Login = () => {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users.items);

  useEffect(() => {
    usersApi.getAllUsers().then(res => {
      dispatch(setUsers(res));
    });
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === loginData.email && user.password === loginData.password);
    if (user) {
      dispatch(loginUser({ user, rememberMe })); // Yalnızca dispatch ile saklayın
      navigate('/myaccount'); // Doğru yönlendirme
    } else {
      console.error('Invalid login credentials');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password.length >= 8) {
      usersApi.addUser(registerData).then(() => {
        console.log('User registered successfully');
      }).catch(err => {
        console.error('Error registering user:', err);
      });
    } else {
      console.error('Password is too short');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username or email address *</label>
            <input
              type="text"
              required
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              required
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-login">LOGIN</button>
          <div className="remember-me">
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)} 
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
        </form>
      </div>
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username or email address *</label>
            <input
              type="email"
              required
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              required
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-register">REGISTER</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
