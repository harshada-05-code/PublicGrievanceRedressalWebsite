import React from 'react';
import { AlertCircle, CheckCircle2, Clock, ThumbsUp } from 'lucide-react';
import './DashboardUI.css';

const OfficerDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dash-header flex-spread">
        <div className="logo-container">
          <span className="logo-badge">JP</span>
          <span style={{fontWeight: 700}}>Jan Shikayat Portal</span>
        </div>
        <div className="header-actions">
          <button className="lang-btn" style={{border:'none', background:'transparent'}}>हिंदी में देखें</button>
          <div className="profile-menu">Login</div>
          <div className="profile-menu" style={{background:'#0d5c2c', color:'white', padding: '0.4rem 1rem', borderRadius:'6px'}}>Register</div>
        </div>
      </header>

      <main className="dash-content">
        <h1 className="welcome-title text-green" style={{fontSize: '1.4rem', marginBottom:'0.5rem'}}>Department Officer Dashboard (Water Supply Dept.)</h1>
        
        {/* Officer Stats */}
        <div className="officer-stats-row">
          <div className="off-stat"><FileIcon fill="#ef4444"/> Pending: <strong>28</strong></div>
          <div className="off-stat"><AlertCircle size={16} color="#ef4444"/> Urgent: <strong>5</strong></div>
          <div className="off-stat"><CheckCircle2 size={16} color="#10b981"/> Resolved (this month): <strong>112</strong></div>
          <div className="off-stat"><ThumbsUp size={16} color="#10b981"/> Citizen Satisfaction (last month): <strong>4.2/5</strong></div>
        </div>

        {/* Filters */}
        <div className="officer-filters">
          <div className="flex-row">
            <span className="filter-text">Sort By:</span>
            <select><option>Newest</option></select>
            <span className="filter-text">Filter:</span>
            <select><option>All</option></select>
          </div>
          <div className="urgent-badge"><AlertCircle size={14}/> Urgent (Red Alerts)</div>
        </div>

        <div className="officer-grid">
          <div className="complaint-cards-col">
            <h2 style={{fontSize:'1.1rem', marginBottom:'1rem'}}>Pending Complaints</h2>
            
            <div className="complaint-card">
              <div className="card-top">
                <span className="comp-id">Complaint #JP-WS-23-0104</span>
                <span className="status-icon red"><AlertCircle size={16}/></span>
              </div>
              <h3 className="comp-subject">Pipeline Leak - Sector 7</h3>
              <div className="comp-meta red-text">Awaiting Action</div>
              <div className="comp-meta">Filed: 2h ago by Rajesh K.</div>
              <button className="btn-solid green">Review and Assign</button>
            </div>

            <div className="complaint-card">
              <div className="card-top">
                <span className="comp-id">Complaint #JP-WS-23-0102</span>
                <span className="status-icon yellow"><Clock size={16}/></span>
              </div>
              <h3 className="comp-subject">Low Water Pressure - Nehru Colony</h3>
              <div className="comp-meta yellow-text">Under Investigation</div>
              <div className="comp-meta">Filed: 1d ago by Priya S.</div>
              <div className="btn-row">
                <button className="btn-solid yellow-btn">Send for Clarification</button>
                <button className="btn-solid dark">Close</button>
              </div>
            </div>

            <div className="complaint-card">
              <div className="card-top">
                <span className="comp-id">Complaint #JP-WS-23-0098</span>
                <span className="status-icon green-icon"><CheckCircle2 size={16}/></span>
              </div>
              <h3 className="comp-subject">Billing Discrepancy</h3>
              <div className="comp-meta green-text">Resolution Submitted (Reviewing)</div>
              <div className="comp-meta">Filed: 3d ago by Amit G.</div>
              <button className="btn-solid green">Approve Resolution</button>
            </div>
          </div>

          <div className="officer-side-col">
            <div className="side-card">
              <h3 style={{fontSize:'1rem'}}>Grievance Cycle Time Trends</h3>
              <div className="mini-chart">
                 {/* Mini bars logic */}
                 <div className="mb-label">Average Processing Days in Last 2 months</div>
                 <div className="mb-chart">
                    <div className="mb-col"><div className="mb-bar dark-green" style={{height:'60px'}}></div><div className="mb-bar light-green" style={{height:'40px'}}></div><span>Dec</span></div>
                    <div className="mb-col"><div className="mb-bar dark-green" style={{height:'80px'}}></div><div className="mb-bar light-green" style={{height:'45px'}}></div><span>Jan - Feb</span></div>
                 </div>
              </div>
            </div>
            <div className="side-card">
              <h3 style={{fontSize:'1rem'}}>Recent Department Announcements</h3>
              <ul className="announcements">
                <li>Updated PWD coordination guidelines</li>
                <li>Updated PWD coordination updates</li>
                <li>Updated PWD coordination guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FileIcon = ({fill}) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13" fill={fill}></line>
    <line x1="16" y1="17" x2="8" y2="17" fill={fill}></line>
    <polyline points="10 9 9 9 8 9" fill={fill}></polyline>
  </svg>
)

export default OfficerDashboard;
