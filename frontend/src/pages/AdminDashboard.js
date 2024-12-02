import React, { useEffect } from 'react';
import '../styles/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <ul>
          <li onClick={() => navigate('/add-book')}>Add Book</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
