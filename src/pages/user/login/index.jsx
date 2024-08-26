import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, loginUser } from '../../../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { usersApi } from '../../../service/base';
const Login = () => {
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
    const user = users.find(user =>
      (user.email === loginData.email || user.userName === loginData.email) &&
      user.password === loginData.password
    );

    if (user) {
      // const activity = new Date();
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      dispatch(loginUser({ user, rememberMe }));
     navigate('/myaccount/dashboard'
)

    } else {
      console.error('Invalid login credentials');
    }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn-login">Login</button>
        <div className="remember-me">
          <input type="checkbox" name="rememberMe" onChange={() => setRememberMe(!rememberMe)} />
          <label htmlFor="remember">Remember Me</label>
        </div>
      </form>
      <div className="login-options">
        <Link to={'/forgetpassword'}>Lost your password?</Link>
        <Link to={'/register'} className="create-account">Create Account</Link>
      </div>
    </div>
  );

};

export default Login;
