import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const handleSubmit = (e) => {
  e.preventDefault();
  alert("Login submitted");
};

const Login = () => {
  const [formData, setFormData] = useState({ number: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', formData);
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      alert('Welcome back, ' + data.name);
      
      if (data.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
      <h2>CivicLink Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Phone Number" 
          onChange={(e) => setFormData({...formData, number: e.target.value})} 
          style={inputStyle}
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          style={inputStyle}
        />
        <button type="submit" style={btnStyle}>Login</button>
      </form>
    </div>
  );
};

const inputStyle = { display: 'block', width: '100%', marginBottom: '10px', padding: '10px' };
const btnStyle = { width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' };

export default Login;