import React, { useState } from 'react';
import '../styles/dashboard.css';

const Header = () => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleLogout = () => {
    window.location.href = '/';  // Redirect to the login page
  };

  return (
    <header className="header">
      <h2 className="header-title">Ready Unit</h2>
      <div 
        className="header-profile" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <img
          src="https://images.vexels.com/media/users/3/135118/isolated/preview/676bf0e9f3c16649cd7f426c6dcd755a-flat-user-sign-with-round-background.png"
          alt="User"
          style={{ width: '50px', height: '50px' }}
          className="header-profile-pic"
        />
        {hover && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
