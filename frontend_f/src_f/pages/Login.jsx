import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Lock } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ number: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let existingUsers = [];
    try {
      existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    } catch {}

    const user = existingUsers.find(u => u.number === formData.number && u.password === formData.password);

    if (user) {
      localStorage.setItem('userInfo', JSON.stringify({
        _id: user._id,
        name: user.name,
        number: user.number,
        role: user.role,
        token: 'mock-jwt-token-123'
      }));
      
      alert('Welcome back, ' + user.name);
      
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } else {
      alert("Invalid phone number or password. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-form-card">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Log in to track your complaints and updates</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-container">
                <Phone className="input-icon" />
                <input 
                  type="text" 
                  className="auth-input"
                  placeholder="+91 98765 43210" 
                  required
                  onChange={(e) => setFormData({...formData, number: e.target.value})} 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input 
                  type="password" 
                  className="auth-input"
                  placeholder="********" 
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
              </div>
            </div>

            <button type="submit" className="auth-button">
              Log In
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="auth-graphic"></div>
    </div>
  );
};

export default Login;