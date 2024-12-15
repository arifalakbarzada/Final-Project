import React, { useState, useEffect } from 'react';
import { usersApi } from '../../../service/base';
import { v4 as uuid4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../../redux/slices/userSlice';
import { BsEye } from 'react-icons/bs';
import { FaEyeSlash } from 'react-icons/fa';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [nameErrorVisible, setNameErrorVisible] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [emailErrorVisible, setEmailErrorVisible] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [passwordErrorVisible, setPasswordErrorVisible] = useState(false)
  const [confirmPasswordErrorVisible, setConfirmPasswordErrorVisible] = useState(false)
  const [userNames, setUserNames] = useState([])
  const [userEmails, setUserEmails] = useState([])

  useEffect(() => {
    usersApi.getAllUsers().then(res => dispatch(setUsers(res)));
  }, [dispatch]);
  useEffect(() => {
    const names = users.map(user => user.userName)
    const emails = users.map(user => user.email)
    setUserNames(names)
    setUserEmails(emails)
  }, [dispatch])

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  };
  const validateUserName = (name) => {
    return name.length >= 3
  };

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
        role: 'user'
      });
      setRegisterData({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        token: uuid4(),
      });
      toast.success('Registration is successful');
      navigate('/login');

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
            onChange={(e) => {
              setRegisterData({ ...registerData, name: e.target.value })
              if (e.target.value.trim() === '' || validateUserName(e.target.value)) {
                setNameError(false)
                setNameErrorVisible(false)
              }
              else if (!validateUserName(e.target.value)) {
                setNameError(true)
                setNameErrorVisible(true)
              }
            }
            }
            onFocus={(e) => {
              if (e.target.value.trim() === '' || validateUserName(e.target.value)) {
                setNameError(false)
                setNameErrorVisible(false)
              }
              else if (!validateUserName(e.target.value)) {
                setNameError(true)
                setNameErrorVisible(true)
              }
            }}
            onBlur={() => { setNameErrorVisible(false) }}
            required
            autoComplete='off'
          />
          <div className="error-side">
            {nameErrorVisible ? <p>Username must be at least 3 characters long.</p> : null}
            {userNames.includes(registerData.name) ? <p>This username is already taken.</p> : null}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={registerData.email}
            onChange={(e) => {
              setRegisterData({ ...registerData, email: e.target.value })
              if (e.target.value.trim() === '' || validateEmail(e.target.value)) {
                setEmailError(false)
                setEmailErrorVisible(false)
              }
              else if (!validateEmail(e.target.value)) {
                setEmailError(true)
                setEmailErrorVisible(true)
              }
            }
            }
            onFocus={(e) => {
              if (e.target.value.trim() === '' || validateEmail(e.target.value)) {
                setEmailError(false)
                setEmailErrorVisible(false)
              }
              else if (!validateEmail(e.target.value)) {
                setEmailError(true)
                setEmailErrorVisible(true)
              }
            }}
            onBlur={() => { setEmailErrorVisible(false) }}
            required
            autoComplete='off'
          />
          <div className="error-side">
            {emailErrorVisible ? <p>Invalid email address.</p> : null}
            {userEmails.includes(registerData.email) ? <p>This email is already in use.</p> : null}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type={visiblePassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={registerData.password}
            onChange={(e) => {
              setRegisterData({ ...registerData, password: e.target.value })
              if (e.target.value.trim() === '' || validatePassword(e.target.value)) {
                setPasswordError(false)
                setPasswordErrorVisible(false)
              }
              else if (!validatePassword(e.target.value)) {
                setPasswordError(true)
                setPasswordErrorVisible(true)
              }
            }
            }
            onFocus={
              (e) => {
                if (e.target.value.trim() === '' || validatePassword(e.target.value)) {
                  setPasswordError(false)
                  setPasswordErrorVisible(false)
                }
                else if (!validatePassword(e.target.value)) {
                  setPasswordError(true)
                  setPasswordErrorVisible(true)
                }
              }
            }
            onBlur={() => { setPasswordErrorVisible(false) }}
            required
          />
          <div className='eyeIcon' onClick={() => {
            setVisiblePassword(!visiblePassword)
          }}>{visiblePassword ? <>
            <FaEyeSlash />
          </> : <>
            <BsEye />
          </>}</div>
          <div className="error-side">
            {passwordErrorVisible ? <p>Password must be at least 8 characters long, containing at least one letter and one number.</p> : null}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type={visibleConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            name="confirm-password"
            value={registerData.confirmPassword}
            onChange={(e) => {
              setRegisterData({ ...registerData, confirmPassword: e.target.value })
              if (e.target.value.trim() === '' || e.target.value === registerData.password) {
                setConfirmPasswordError(false)
                setConfirmPasswordErrorVisible(false)
              }
              else if (e.target.value !== registerData.password) {
                setConfirmPasswordError(true)
                setConfirmPasswordErrorVisible(true)
              }
            }
            }
            onFocus={
              (e) => {
                if (e.target.value.trim() === '' || e.target.value === registerData.password) {
                  setConfirmPasswordError(false)
                  setConfirmPasswordErrorVisible(false)
                }
                else if (e.target.value !== registerData.password) {
                  setConfirmPasswordError(true)
                  setConfirmPasswordErrorVisible(true)
                }
              }
            }
            onBlur={() => { setConfirmPasswordErrorVisible(false) }}
            required
          />
          <div className='eyeIcon' onClick={() => {
            setVisibleConfirmPassword(!visibleConfirmPassword)
          }}>{visibleConfirmPassword ? <>
            <FaEyeSlash />
          </> : <>
            <BsEye />
          </>}</div>
          <div className="error-side">
            {confirmPasswordErrorVisible ? <p>Passwords do not match</p> : null}
          </div>
        </div>
        <button type="submit" className="btn-register" disabled={!passwordError && !confirmPasswordError && !nameError && !emailError && !userNames.includes(registerData.name) && !userEmails.includes(registerData.email) && registerData.confirmPassword.trim() && registerData.email.trim() && registerData.name.trim() && registerData.password.trim() ? false : true}>Register</button>
      </form>
      <div className="login-redirect">
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}

export default Register;
