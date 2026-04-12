import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const handleSubmit = (e) => {
  e.preventDefault();
  alert("Submitted");
};

const Register = () => {
  const [formData, setFormData] = useState({ name: '', number: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      alert('Registration Successful! Please login.');
      navigate('/login'); // Sends user to login page after success
    } catch (err) {
      console.error('Registration error', err.response?.data || err.message || err);
      alert(err.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Create CivicLink Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Full Name" 
          required
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Phone Number" 
          required
          onChange={(e) => setFormData({...formData, number: e.target.value})} 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          required
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', background: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
