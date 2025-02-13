import React, { useState } from 'react';
import '../styles/dashboard.css';

const Header = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleToggleLogout = () => {
    setLogoutVisible(prevState => !prevState);
  };

  const handleLogout = () => {
    window.location.href = '/';  // Redirect to the login page
  };

  return (
    <header className="header">
      <h2 className="header-title">Ready Unit</h2>
      <div className="header-profile">
        <img
          src="https://images.vexels.com/media/users/3/135118/isolated/preview/676bf0e9f3c16649cd7f426c6dcd755a-flat-user-sign-with-round-background.png"
          alt="User"
          style={{ width: '50px', height: '50px' }}
          className="header-profile-pic"
          onClick={handleToggleLogout} // Toggle logout visibility on click
        />
        {logoutVisible && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
