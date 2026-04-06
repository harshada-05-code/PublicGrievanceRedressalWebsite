import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';

function App() {
  // Simple check to see if user is logged in
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes - Only show if logged in */}
          <Route 
            path="/dashboard" 
            element={userInfo ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/admin" 
            element={userInfo?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/register" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;