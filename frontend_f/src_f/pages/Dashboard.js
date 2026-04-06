import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Roads', address: '' });
  
  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // 1. Load User's Grievances
  const fetchGrievances = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get('/api/grievances/my', config);
      setGrievances(data.data);
    } catch (err) {
      console.error("Error fetching grievances", err);
    }
  };

  useEffect(() => {
    if (userInfo) fetchGrievances();
  }, []);

  // 2. Submit New Grievance
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post('/api/grievances', formData, config);
      alert("Complaint Submitted Successfully!");
      setFormData({ title: '', description: '', category: 'Roads', address: '' }); // Reset form
      fetchGrievances(); // Refresh list
    } catch (err) {
      alert("Failed to submit complaint");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Welcome, {userInfo?.name}!</h1>
      
      {/* Form Section */}
      <section style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>File a New Complaint</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" required value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})} style={inputStyle} />
          
          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={inputStyle}>
            <option value="Roads">Roads</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Waste">Waste</option>
          </select>

          <textarea placeholder="Description" required value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})} style={inputStyle} />
          
          <input type="text" placeholder="Area/Address" required value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})} style={inputStyle} />
          
          <button type="submit" style={btnStyle}>Submit Complaint</button>
        </form>
      </section>

      {/* List Section */}
      <h3>Your Previous Complaints</h3>
      {grievances.length === 0 ? <p>No complaints filed yet.</p> : (
        grievances.map(g => (
          <div key={g._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <h4>{g.title} <span style={{ fontSize: '12px', color: 'blue' }}>({g.status})</span></h4>
            <p>{g.description}</p>
            <small>Category: {g.category} | Location: {g.address}</small>
          </div>
        ))
      )}
    </div>
  );
};

// Simple Styles
const inputStyle = { display: 'block', width: '100%', marginBottom: '10px', padding: '8px' };
const btnStyle = { background: '#007bff', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' };

export default Dashboard;
