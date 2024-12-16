import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, loginUser, setUserFromLocalStorage } from '../../../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { usersApi } from '../../../service/base';
import { BsEye } from 'react-icons/bs';
import { FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users.items);
  const userRedux = useSelector((state) => state.users.user)
  const [visiblePassword, setVisiblePassword] = useState(false)

  useEffect(() => {
    usersApi.getAllUsers().then(res => dispatch(setUsers(res)));
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user =>
      (user.email === loginData.email || user.userName === loginData.email) &&
      user.password === loginData.password
    );

    if (user) {
      if (user.status === 'Active') {
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(setUserFromLocalStorage(user))
        } else {
          sessionStorage.setItem('user', JSON.stringify(user));
          dispatch(setUserFromLocalStorage(user))
        }
        dispatch(loginUser({ user, rememberMe }));
        navigate('/myaccount/dashboard');
      } else {
        toast.error('Your account is not active')
      }
    } else {
      toast.error('Invalid email or password')
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email or User Name:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
            autoComplete='off'
          />
        </div>
        <div className="input-group">
          <label htmlFor='password'>Password:</label>
          <input
            type={visiblePassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
            autoComplete='off'
          />

          <div className='eyeIcon' onClick={() => {
            setVisiblePassword(!visiblePassword)
          }}>{visiblePassword ? <>
            <FaEyeSlash />
          </> : <>
            <BsEye />
          </>}</div>
        </div>
        <button type="submit" className="btn-login">Login</button>
        <div className="remember-me">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember">Remember Me</label>
        </div>
      </form>
      <div className="login-options">
        <div className="login-option">
          <Link to={'/forgetpassword'}>Lost your password?</Link>
        </div>
        <div className="login-option">
          <Link to={'/register'}>Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
