import React, { useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import { setToken } from '../utils/auth';
import '../styles/Login.css';
import logo from '../assets/ebookhub.png';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8081/auth/login", { username, password });
        const { token } = response.data;
        setToken(token);
        console.log(token);
        setMessage("Log in successful.");
    } catch (error) {
        setMessage("Log in Failed. Please try again.")
    }
};

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Ebook Hub Logo" className="logo" />
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                    className="login-input"
                />
            </div>
            <div>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    className="login-input"
                />
            </div>
            <button type="submit" className="btn btn-primary login-btn">Log in</button>
        </form>
        <p>{message}</p>
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
