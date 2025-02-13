import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => {
        // On success, navigate to admin dashboard
        navigate('/admin');
      })
      .catch(() => {});
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url('https://s3-alpha-sig.figma.com/img/34ea/2a52/4d2e1b427c47d7ba71034a89efe6524f?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EDmt1SbdLmVgJHhIVc-sUveDey9UWsMa1ckG0EF17~6wpSOy-kFK8Jkvw~alG85hfjYpVbF3XuN4O2THgU9i0QZzY0g0aefEcCPUCIxgi5c6q8WnFBgZSGI4IRCd~4HOcUN6dNmpHlnzG0xm1VCy5l63vLqcz3BEwbEytmP6zLBjrLJ4LL-~a-YoZq3NJpuUvCvo2Nm5JbnpiREc~7Zg6n73V3Uf2IVXCeQrCY2E~0Vv~CNnW7kEA5VVHSLp6zqn4CKqxlxvzZ0EpFs8u8HSC9dbqvbE2FrqmZqT9fxtOxgHrljaUIyjgAHXMIhI8f1F0fm8kLjm5OgesPd-9pGRjQ__')` }}>
      <div className="auth-form-wrapper">
        {/* Logo - replace with your actual image */}
        <img
          src="https://oro24-media.s3.me-south-1.amazonaws.com/assets/Oro-logo-white.png"
          alt="ORO24 Logo"
          className="auth-logo"
        />

        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-title">Sign In</h2>

          {error && <div className="auth-error">{error}</div>}

          <div className="auth-input-group">
            <label htmlFor="email">Please Enter Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">Please Enter Your Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-checkbox-group">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe1}
                onChange={handleChange}
              />
              Remember Me
            </label>
          </div>

          <div className="auth-checkbox-group">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Show Password
            </label>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="auth-register">
            Want to be a partner with ORO24? <Link to="/register">Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
