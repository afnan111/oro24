import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/dashboard.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img
          src="https://oro24-media.s3.me-south-1.amazonaws.com/assets/Oro-logo-white.png"
          alt="ORO24 Logo"
        />
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin" activeclassname="active">
            <i className="fas fa-home"></i> Dashboard
          </NavLink>
        </li>
        <li>
    
        </li>
        <li>
          <NavLink to="/units" activeclassname="active">
            <i className="fas fa-building"></i> Units
          </NavLink>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
