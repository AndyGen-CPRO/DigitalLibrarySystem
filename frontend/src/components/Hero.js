import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Hero.css';
import homeImage from '../assets/home_image01.png';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const token = getToken();
  const navigate = useNavigate();

  const browseBooks = () => {
    navigate("/browse-books")
  }

  return (
    <div className="container-fluid bg-custom text-white py-5">
      <div className="row align-items-center">
        <div className="col-md-8 text-center text-md-middle">
          <h1 class="hero-text">
            Explore Boundless <span className="text-warning">Knowledge</span> and Find  
            Joy in Every <span className="text-warning">Read</span>
          </h1>
          <p>Your gateway to digital reading</p>
          <button className="btn btn-warning text-dark px-4 py-2">
            Learn More
          </button>
          {token && (
            <button className="btn btn-warning text-dark px-4 py-2" onClick={browseBooks}>Browse Books</button>
          )}
        </div>
        <div className="col-md-4 text-center">
          <img
            src={homeImage}
            alt="Reading Illustration"
            className="img-fluid" width="400" height="500" 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
