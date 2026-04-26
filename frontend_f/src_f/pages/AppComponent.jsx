import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Landing from './Landing';
import FileComplaint from './FileComplaint';
import TrackComplaint from './TrackComplaint';
import OfficerReport from './OfficerReport';
import ManageUsers from './ManageUsers';
import SystemConfiguration from './SystemConfiguration';
import OfficerCases from './OfficerCases';

// Protected Route Wrapper
const ProtectedRoute = ({ element, requiredRole = null }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && userInfo.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return element;
};

function App() {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo') || 'null'));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo') || 'null'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/file-complaint"
            element={<ProtectedRoute element={<FileComplaint />} />}
          />
          <Route
            path="/track-complaint"
            element={<ProtectedRoute element={<TrackComplaint />} />}
          />
          <Route
            path="/officer-report"
            element={<ProtectedRoute element={<OfficerReport />} />}
          />
          <Route
            path="/manage-users"
            element={<ProtectedRoute element={<ManageUsers />} requiredRole="admin" />}
          />
          <Route
            path="/system-configuration"
            element={<ProtectedRoute element={<SystemConfiguration />} requiredRole="admin" />}
          />
          <Route
            path="/officer-cases"
            element={<ProtectedRoute element={<OfficerCases />} requiredRole="department_officer" />}
          />

          {/* Redirects */}
          <Route path="*" element={userInfo ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;