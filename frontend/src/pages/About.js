import React from 'react';
import '../styles/About.css'; 

const About = () => {
  return (
    <div className="about-page">
      <div className="about-sidebar">
        <ul>
          <li><a href="#introduction">Introduction</a></li>
          <li><a href="#mission">Mission</a></li>
          <li><a href="#vision">Vision</a></li>
          <li><a href="#team">The Team</a></li>
        </ul>
      </div>
      <div className="about-content">
        <h1>Welcome to Ebook Hub!</h1>
        <p>
          At Ebook Hub, we believe that reading is a journey that should be accessible to everyone.
          Our mission is to provide a digital sanctuary for book lovers, where you can explore a vast 
          collection of ebooks that inspire, educate, and entertain.
        </p>
      </div>
    </div>
  );
};

export default About;
