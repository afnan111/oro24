import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/dashboard.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
