import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Login = () => {
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);

  const handlePasswordReset = () => {
    setShowPasswordReset(true);
    setPasswordResetSent(false);
  };

  const handleBackToLogin = () => {
    setShowPasswordReset(false);
    setPasswordResetSent(false);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    emailjs.sendForm(
      'service_7qs79xq',
      'template_la8xdru', 
      { email },          
      'uZiU_jvMcoRVe1YyL' 
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setPasswordResetSent(true);
    })
    .catch((err) => {
      console.log('FAILED...', err);
      console.log(email);
    });
  };

  return (
    <div className="auth-container">
      {!showPasswordReset ? (
        <>
          <div className="auth-form">
            <h2>Login</h2>
            <form>
              <div className="form-group">
                <label>Username or email address *</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input type="password" required />
              </div>
              <button type="submit" className="btn btn-login">LOGIN</button>
              <div className="remember-me">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <button type="button" className="forgot-password" onClick={handlePasswordReset}>
                Lost your password?
              </button>
            </form>
          </div>
          <div className="auth-form">
            <h2>Register</h2>
            <form>
              <div className="form-group">
                <label>Username or email address *</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input type="password" required />
              </div>
              <button type="submit" className="btn btn-register">REGISTER</button>
            </form>
          </div>
        </>
      ) : (
        <div className="auth-form">
          <h2>Reset Password</h2>
          {passwordResetSent ? (
            <p className="reset-notification">A password reset link has been sent to your email address.</p>
          ) : (
            <form onSubmit={handleResetSubmit}>
              <div className="form-group">
                <label>Enter your email address *</label>
                <input type="email" name="email" required />
              </div>
              <button type="submit" className="btn btn-reset">RESET PASSWORD</button>
              <button type="button" className="btn btn-back" onClick={handleBackToLogin}>
                Back to Login
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Login
