import React from 'react';
import '../styles/Hero.css';
import homeImage from '../assets/home_image01.png'; 

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>
          Explore Boundless <span>Knowledge</span> and Find  
          Joy in Every <span>Read</span>
        </h1>
        <p>Your gateway to digital reading</p>
        <button>Learn More</button>
      </div>
      <div className="hero-image">
        <img src={homeImage} alt="Reading Illustration" />
      </div>
    </section>
  );
};

export default Hero;
