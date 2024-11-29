import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken, setRole, setLoggedUsername } from '../utils/auth';
import '../styles/Login.css'; // Keep custom styles if needed
import logo from '../assets/ebookhub.png';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    setMessage(""); // Clear previous messages
    try {
      const response = await axios.post("http://localhost:8081/auth/login", { username, password });
      const { token, role, username: responseName } = response.data;

      // Save authentication data
      setToken(token);
      setRole(role);
      setLoggedUsername(responseName);
      onLogin(token, role, username);

      setMessage("Log in successful.");
      navigate("/browse-books"); // Redirect user
    } catch (error) {
      setMessage("Log in failed. Please check your username and password.");
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100">
      <div className="login-container bg-secondary text-white p-4 rounded shadow">
        <img src={logo} alt="Ebook Hub Logo" className="logo mx-auto d-block mb-4" />
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-warning w-100 mb-3" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Error Message */}
        {message && (
          <div className={`alert ${message.includes("successful") ? "alert-success" : "alert-danger"} mt-3`}>
            {message}
          </div>
        )}

        {/* Social Login Buttons */}
        <p className="text-center mt-3">or</p>
        <button className="btn-facebook w-100 mb-2">
          Login with Facebook
        </button>
        <button className="btn-google w-100 mb-3">
          Login with Google
        </button>

        {/* Registration Link */}
        <p className="text-center">
          Don't have an account? <Link to="/register" className="text-warning">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
