import React, { useState } from "react";
import "../styles/Registration.css";
import logo from "../assets/ebookhub.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const { username, email, password } = formData;

      const response = await axios.post(
        "http://localhost:8081/auth/register",
        { username, email, password }
      );
      const { token } = response.data;
      setToken(token);
      setMessage("Registration successful.");
      navigate("/login");
    } catch (error) {
      setMessage("Registration Failed. Please try again.");
    }

    console.log("Registration successful", formData);
  };

  return (
    <div className="register-page vh-100 d-flex justify-content-center align-items-center">
      <div className="register-container card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center">
          <img src={logo} alt="Ebook Hub Logo" className="img-fluid mb-3" style={{ maxWidth: "150px" }} />
          <h2 className="mb-4 text-white">Create an Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 mb-3">
            Register
          </button>
        </form>
        {message && <p className="text-center text-danger">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
