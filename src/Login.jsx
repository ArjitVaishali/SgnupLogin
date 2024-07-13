import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log('Login result:', result.data);
        if (result.data === "Success") {
          // Fetch user data to store in localStorage
          axios.get(`http://localhost:3001/user?email=${email}`)
            .then(response => {
              console.log('User data:', response.data);
              localStorage.setItem('user', JSON.stringify(response.data));
              navigate('/home');
            })
            .catch(err => {
              console.error('Error fetching user data:', err);
            });
        } else {
          console.error('Login failed:', result.data);
        }
      })
      .catch(err => {
        console.error('Error during login:', err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p>Don't Have an Account?</p>
        <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
