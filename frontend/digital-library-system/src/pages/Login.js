import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/Login.css';
import logo from '../assets/ebookhub.png';

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
        <p class="text">or</p>
        <button className="btn btn-facebook">login with facebook</button>
        <button className="btn btn-google">login with google</button>
        <p className="register-link">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
