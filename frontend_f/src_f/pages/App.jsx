import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Landing from './Landing';
import FileComplaint from './FileComplaint';
import TrackComplaint from './TrackComplaint';

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

          {/* Redirects */}
          <Route path="*" element={userInfo ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;