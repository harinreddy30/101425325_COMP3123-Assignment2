import 'bulma/css/bulma.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      console.log(`Email updated: ${value}`); // Debugging email input
    }
    if (name === 'password') {
      setPassword(value);
      console.log(`Password updated: ${value}`); // Debugging password input
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    console.log('Attempting to log in...'); // Debugging form submission

    try {
      console.log(`Sending login request for email: ${email}`);
      const response = await apiClient.post('/api/v1/user/login', { email, password });

      console.log('Response received:', response); // Debugging server response

      if (response.status === 200) {
        console.log('Login successful!');
        setMessage('Login successful!');
        localStorage.setItem('token', response.data.token);
        console.log('Token saved to localStorage:', response.data.token); // Debugging token storage
        navigate('/employeelist');
      }
    } catch (error) {
      console.error('Login error:', error); // Debugging error object
      setMessage(
        error.response?.data?.message || 'An error occurred while logging in.'
      );
    }
  };

  return (
    <div className="container is-max-desktop mt-5">
      <div className="box">
        <h2 className="title is-4 has-text-centered">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control">
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                placeholder="Enter email"
                value={email}
                onChange={handleInput}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control">
              <input
                type="password"
                id="password"
                name="password"
                className="input"
                placeholder="Enter password"
                value={password}
                onChange={handleInput}
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary is-fullwidth">
                Login
              </button>
            </div>
          </div>
        </form>
        {message && <p className="has-text-danger has-text-centered mt-3">{message}</p>}
        <p className="has-text-centered mt-3">
          Don't have an account?{' '}
          <a href="/signup" className="has-text-primary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
