import React from 'react';
import '../styles/Login.css'; // Create this CSS file for custom styles
import logo from '../assets/ebookhub.png'; // Ensure the logo path is correct

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Ebook Hub Logo" className="logo" />
        <form>
          <input type="text" placeholder="username" className="login-input" />
          <input type="password" placeholder="password" className="login-input" />
          <button type="submit" className="btn btn-primary login-btn">login</button>
        </form>
        <p>or</p>
        <button className="btn btn-facebook">login with facebook</button>
        <button className="btn btn-google">login with google</button>
      </div>
    </div>
  );
};

export default Login;
