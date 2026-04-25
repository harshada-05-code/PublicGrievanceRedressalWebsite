import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, FilePlus, Search as SearchIcon, 
  FileText, Hourglass, CheckSquare, Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DashboardUI.css';

const CitizenDashboard = ({ userInfo }) => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(storedComplaints);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // Calculate statistics based on complaints
  const activeComplaints = complaints.filter(c => c.status === 'Pending' || c.status === 'In Progress').length;
  const awaitingAction = complaints.filter(c => c.status === 'Awaiting Response').length;
  const resolutionsReceived = complaints.filter(c => c.status === 'Resolution Received' || c.status === 'Closed').length;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dash-header">
        <div className="logo-container">
          <span className="logo-badge">CL</span>
          <span style={{fontWeight: 700}}>Civic Link Portal</span>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <SearchIcon size={16} color="#6b7280" />
            <input type="text" placeholder="Search" />
          </div>
          <button className="icon-btn"><Bell size={18} /> Notifications</button>
          <div className="profile-menu" onClick={handleSignOut} style={{cursor: 'pointer', color: '#b91c1c', fontWeight: 600}}>Sign Out ▾</div>
        </div>
      </header>

      <main className="dash-content">
        <h1 className="welcome-title">Welcome, {userInfo?.name || 'Citizen'}</h1>
        <p className="welcome-subtitle">Welcome back. Manage your grievances or submit new ones.</p>

        {/* Action Cards */}
        <div className="action-cards">
          <div className="action-card primary" onClick={() => navigate('/file-complaint')}>
            <div className="ac-icon"><FilePlus /></div>
            <div>
              <h3>File a New Complaint</h3>
              <p>Submit a new grievance to relevant authorities.</p>
            </div>
          </div>
          <div className="action-card secondary" onClick={() => navigate('/track-complaint')}>
            <div className="ac-icon grey"><SearchIcon /></div>
            <div>
              <h3>Check Track Progress</h3>
              <p>View status of all your submitted complaints.</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card border-green">
            <div className="stat-label">Your Active Complaints</div>
            <div className="stat-val-row">
              <span className="stat-number">{activeComplaints}</span>
              <FileText className="stat-icon-color green" />
            </div>
            <div className="progress-bar"><div className="fill green" style={{width: '30%'}}></div></div>
          </div>
          
          <div className="stat-card border-yellow">
            <div className="stat-label">Awaiting Action</div>
            <div className="stat-val-row">
              <span className="stat-number">{awaitingAction}</span>
              <Hourglass className="stat-icon-color yellow" />
            </div>
            <div className="progress-bar"><div className="fill yellow" style={{width: '10%'}}></div></div>
          </div>

          <div className="stat-card filled-green">
            <div className="stat-label">Resolutions Received</div>
            <div className="stat-val-row">
              <span className="stat-number">{resolutionsReceived}</span>
              <div className="icon-group"><CheckSquare /><Building size={16}/></div>
            </div>
            <div className="progress-bar"><div className="fill white" style={{width: '70%'}}></div></div>
          </div>

          <div className="updates-panel">
            <h4>Latest System Updates</h4>
            <p>New tracking feature added,<br/>Department selection improved.</p>
          </div>
        </div>

        {/* Table */}
        <div className="recent-activity">
          <h2>Recent Complaint Activity</h2>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Subject</th>
                <th>Date Filed</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length > 0 ? (
                complaints.map((c, i) => (
                  <tr key={i}>
                    <td>{c.id}</td>
                    <td>{c.subject}</td>
                    <td>{c.date}</td>
                    <td>{c.dept}</td>
                    <td>{c.status}</td>
                    <td><a href="#" className="action-link green">{c.status === 'Closed' ? 'View Archive' : 'View Details'}</a></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '2rem', color: '#999'}}>No complaints filed yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
