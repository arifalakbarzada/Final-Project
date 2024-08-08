import React, { useState } from "react";
import { usersApi } from "../../../../service/base";

const AccountDetails = () => {
  const user = localStorage.getItem('user')
  const [userData, setUserData] = useState(JSON.parse(user))
  const [formData, setFormData] = useState({
    userName: userData.userName,
    email: userData.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  }

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const validateUserName = (userName) => {
    const minLength = 3;
    const maxLength = 15;
    const regex = /^[a-zA-Z0-9_]+$/;
  let result;
    if (userName.length < minLength) {
      return `Username must be at least ${minLength} characters long.`;
    }
    if (userName.length > maxLength) {
      return `Username cannot be longer than ${maxLength} characters.`;
    }
    if (!regex.test(userName)) {
      return "Username can only contain letters, numbers, and underscores.";
    }
 if (userName.length >=minLength && userName.length <= maxLength && regex.test(userName)) {
  result = true;
}
    return result;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.currentPassword === userData.password && formData.newPassword === formData.confirmPassword && validatePassword(formData.newPassword) && validateEmail(formData.email) && validateUserName(formData.userName)) {
console.log(formData);
usersApi.changeUserData(userData.id , {
  userName: formData.userName ,
  password : formData.newPassword,
  email: formData.email
})
    }
    
  };

  return (
    <form className="account-details-form" onSubmit={handleSubmit}>
      <h2>Account Details</h2>
      <div className="input-group">
      </div>
      <input
        type="text"
        name="userName"
        placeholder="Display Name"
        defaultValue={userData.userName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        defaultValue={userData.email}
        // value={formData.email}
        onChange={handleChange}
      />

      <h2>Password change</h2>
      <input
        type="password"
        name="currentPassword"
        placeholder="Current Password"
        value={formData.currentPassword}
        onChange={handleChange}
      />
      <div className="input-group">
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="save-btn">
        SAVE CHANGES
      </button>
    </form>
  );
};

export default AccountDetails;
