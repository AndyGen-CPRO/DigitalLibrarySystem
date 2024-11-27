import React from 'react';
import '../styles/Navbar.css';
import logo from '../assets/ebookhub.png'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo"><img src={logo} alt="Reading Illustration" /></div>
      <ul>
        <li><a href="#home">home</a></li>
        <li><a href="#about">about</a></li>
        <li><a href="#contact">contact</a></li>
        <li><a href="#login">login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
