 


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './components/DashboardHome'; 
import Login from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
function App() {
  return (
    <Router>
      <Routes>
        {/* Example: If you have a login route */}
        <Route path="/" element={<Login />} />
 
        {/* Example: If you have a login route */}
        <Route path="/Register" element={<RegisterForm />} />
        {/* Admin / Dashboard route */}
        <Route
          path="/admin"
          element={
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


