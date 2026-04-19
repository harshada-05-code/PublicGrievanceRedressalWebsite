import React from 'react';
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

function App() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

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
            element={userInfo ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/file-complaint"
            element={userInfo ? <FileComplaint /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/track-complaint"
            element={userInfo ? <TrackComplaint /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/officer-report"
            element={userInfo ? <OfficerReport /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/manage-users"
            element={userInfo && userInfo.role === 'admin' ? <ManageUsers /> : <Navigate to="/dashboard" replace />}
          />
          <Route
            path="/system-configuration"
            element={userInfo && userInfo.role === 'admin' ? <SystemConfiguration /> : <Navigate to="/dashboard" replace />}
          />
          <Route
            path="/officer-cases"
            element={userInfo && userInfo.role === 'department_officer' ? <OfficerCases /> : <Navigate to="/dashboard" replace />}
          />

          {/* Redirects */}
          <Route path="*" element={userInfo ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;