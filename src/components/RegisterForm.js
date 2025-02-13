import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    // add any other fields needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your register endpoint here
    // e.g., AuthService.register(formData)
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        {/* Logo */}
        <img
          src="https://oro24-media.s3.me-south-1.amazonaws.com/assets/Oro-logo-white.png"
          alt="ORO24 Logo"
          className="auth-logo"
        />

        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-title">Register</h2>

          <div className="auth-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Register
          </button>

          <div className="auth-register">
            Already have an account? <Link to="/">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
