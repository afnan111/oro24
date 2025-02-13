import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.email || 'User'}!</p>
      <p>Your token: {token}</p>
      <button onClick={handleLogout}>Logout</button>

      {/* 
        You can show the inventory, blocks, floors, etc. here 
        by calling the relevant endpoints from your slice or service:
        
        e.g. 
        useEffect(() => {
          dispatch(fetchInventory(...));
        }, [dispatch]);
      */}
    </div>
  );
};

export default Dashboard;
