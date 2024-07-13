// Home.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

function Home() {
  // Retrieve the user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigate to the edit page or handle the edit action
    navigate('/edit');
  };

  return (
    <div className="home-container">
      {user ? (
        <div className="user-info">
          <h2>Welcome, {user.name}</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <div className="guest-message">
          <h2>Welcome, Guest</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
