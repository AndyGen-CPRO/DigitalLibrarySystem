import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './pages/About';
import Login from './pages/Login';
import BrowseBooks from './pages/BrowseBooks';
import Profile from './pages/Profile';
import Register from './pages/Registration'; 
import { getToken, getRole, getLoggedUsername, removeToken, removeRole, removeLoggedUsername } from './utils/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import AddBook from './pages/AddBook';
import BookList from './pages/BookList';


const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      const role = getRole();
      const name = getLoggedUsername();
      setUserToken(token);
      setUserRole(role);
      setUsername(name);
    }
  }, []);

  const handleLogin = (token, role, username) => {
    setUserToken(token);
    setUserRole(role);
    setUsername(username);
  };

  const handleLogout = () => {
    setUserToken(null);
    setUserRole("");
    setUsername("");
    
    removeToken();
    removeRole();
    removeLoggedUsername();
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
         userToken={userToken} 
         userRole={userRole} 
         username={username} 
         onLogout={handleLogout} 
        />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/browse-books"
            element={<BrowseBooks />}
          />
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />
          <Route
            path="/add-book"
            element={<AddBook />}
          />
          <Route
            path="/book-list"
            element={<BookList />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
