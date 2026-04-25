import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Lock } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ number: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: formData.number,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed. Please try again.');
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
      
      alert('Welcome back, ' + data.name);
      
      // Redirect based on role
      if (data.role === 'admin') {
        navigate('/dashboard', { replace: true });
      } else if (data.role === 'department_officer') {
        navigate('/officer-cases', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError('Connection error. Please make sure the backend server is running.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-form-card">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Log in to track your complaints and updates</p>
          
          {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#ffe0e0', borderRadius: '0.5rem' }}>{error}</div>}
          
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

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
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