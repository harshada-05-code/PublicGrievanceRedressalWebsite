import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import CitizenDashboard from './CitizenDashboard';
import AdminDashboard from './AdminDashboard';
import OfficerDashboard from './OfficerDashboard';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userInfo') || 'null');
    setUserInfo(data);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userInfo) return <Navigate to="/login" replace />;

  if (userInfo.role === 'admin') {
    return <AdminDashboard userInfo={userInfo} />;
  }
  
  if (userInfo.role === 'department_officer') {
    return <OfficerDashboard userInfo={userInfo} />;
  }

  // Default fallback is citizen
  return <CitizenDashboard userInfo={userInfo} />;
};

export default Dashboard;
