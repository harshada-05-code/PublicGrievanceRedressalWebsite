import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, ShieldCheck, Building } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', number: '', password: '', confirmPassword: '', role: 'citizen' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // In-memory array mock registration
    let existingUsers = [];
    try {
      existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    } catch {}

    const isDuplicate = existingUsers.some(u => u.number === formData.number || u.email === formData.email);
    if (isDuplicate) {
      alert("Email or Phone number is already registered.");
      return;
    }

    const newUser = {
      _id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      number: formData.number,
      password: formData.password,
      role: formData.role
    };

    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    
    alert('Registration Successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-form-card">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Register to file and track your complaints</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group account-type-group">
              <label className="form-label">Account Type</label>
              <div className="account-type-selector">
                <button 
                  type="button" 
                  className={`account-type-btn ${formData.role === 'citizen' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, role: 'citizen'})}
                >
                  <User size={18} /> User
                </button>
                <button 
                  type="button" 
                  className={`account-type-btn ${formData.role === 'officer' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, role: 'officer'})}
                >
                  <ShieldCheck size={18} /> Officer
                </button>
                <button 
                  type="button" 
                  className={`account-type-btn ${formData.role === 'admin' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, role: 'admin'})}
                >
                  <Building size={18} /> Admin
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-container">
                <User className="input-icon" />
                <input 
                  type="text" 
                  className="auth-input"
                  placeholder="John Doe" 
                  required
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input 
                  type="email" 
                  className="auth-input"
                  placeholder="name@example.com" 
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-container">
                <Phone className="input-icon" />
                <input 
                  type="tel" 
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

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input 
                  type="password" 
                  className="auth-input"
                  placeholder="********" 
                  required
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                />
              </div>
            </div>

            <button type="submit" className="auth-button">
              Sign Up
            </button>
          </form>
          
          <div className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </div>
        </div>
      </div>
      <div className="auth-graphic"></div>
    </div>
  );
};

export default Register;
