 


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
     
        <Route path="/" element={<Login />} />
  
        <Route path="/Register" element={<RegisterForm />} />
 
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


