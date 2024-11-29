import React, { useState } from 'react';
import '../styles/Profile.css'; 
import avatar from '../assets/ebookhub.png'; 

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Squidward',
    lastName: 'Handsome',
    email: 'handsomesquidward@bikinibottom.com',
    phone: '+1 (987) 654-3210',
    address1: '123 Main St',
    address2: 'Bikini Bottom',
    address3: 'Under the Sea',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-image">
          <img src={avatar} alt="Profile Avatar" />
        </div>
        <div className="profile-info">
          <h2>Personal Information</h2>
          <div className="profile-section">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <h2>Payment Information</h2>
          <div className="profile-section">
            <label>Billing Address Line 1</label>
            <input
              type="text"
              name="address1"
              value={profileData.address1}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <label>Billing Address Line 2</label>
            <input
              type="text"
              name="address2"
              value={profileData.address2}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <label>Billing Address Line 3</label>
            <input
              type="text"
              name="address3"
              value={profileData.address3}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <button className="edit-btn" onClick={handleEdit}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
