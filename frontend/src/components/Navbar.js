import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import logo from '../assets/ebookhub.png';

const Navbar = ({ userToken, userRole, username, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Ebook Hub Logo" width="200" height="70" />      
        </a>

        {/* Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
            {!userToken ? (
              <li className="nav-item">
                <a
                  className="nav-link btn btn-highlight text-dark px-3 py-1"
                  href="/login"
                >
                  <i className="fas fa-sign-in-alt"></i> Login
                </a>
              </li>
            ) : (
              <>
                <li className="nav-item"><a className="nav-link">Welcome, {username}</a></li>
                {userRole === 'admin' && (
                  <li className="nav-item">
                    <a className="nav-link" href="/admin-dashboard">Admin Dashboard</a>
                  </li>
                )}
                <li className="nav-item" onClick={onLogout}>
                  <a href="" className="nav-link">Log Out</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
