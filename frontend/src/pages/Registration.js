import React, { useState } from 'react';
import '../styles/Registration.css'; 
import logo from '../assets/ebookhub.png';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { setToken } from '../utils/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
        const {username, email, password } = formData;

        const response = await axios.post("http://localhost:8081/auth/register", { username, email, password });
        const { token } = response.data;
        setToken(token);
        setMessage("Register successful.");
        navigate("/login")
    } catch (error) {
        setMessage("Registration Failed. Please try again.")
    }

    console.log("Registration successful", formData);
    // Simulate API call or redirect to login page
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <img src={logo} alt="Ebook Hub Logo" className="logo" />
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="register-input"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="register-input"
          />
          <button type="submit" className="btn btn-primary register-btn">Register</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Register;
