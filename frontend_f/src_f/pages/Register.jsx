import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, ShieldCheck, Building } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', number: '', password: '', confirmPassword: '', role: 'citizen' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          number: formData.number,
          password: formData.password,
          role: formData.role,
          departmentId: null
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed. Please try again.');
        return;
      }

      // Store user info and token
      localStorage.setItem('userInfo', JSON.stringify({
        _id: data._id,
        name: data.name,
        number: data.number,
        role: data.role,
        token: data.token
      }));
      
      alert('Registration Successful! Redirecting to dashboard...');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Connection error. Please make sure the backend server is running.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-form-card">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Register to file and track your complaints</p>
          
          {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#ffe0e0', borderRadius: '0.5rem' }}>{error}</div>}
          
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
                  className={`account-type-btn ${formData.role === 'department_officer' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, role: 'department_officer'})}
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

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
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
