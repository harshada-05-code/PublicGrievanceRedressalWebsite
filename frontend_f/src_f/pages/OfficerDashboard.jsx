import React from 'react';
import { Search, Bell, Briefcase, BarChart2, User, ClipboardList, Trophy, ChevronDown } from 'lucide-react';
import './DashboardUI.css';
import { useNavigate } from 'react-router-dom';

const OfficerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-portal-container">
      {/* Header (Shared style with Admin) */}
      <header className="cl-header">
        <div className="cl-logo-container">
          <div className="cl-logo-badge">CL</div>
          <span className="cl-logo-text">Civic Link Portal</span>
        </div>
        
        <div className="cl-search-container">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search" className="cl-search-input" />
        </div>

        <div className="cl-header-actions">
          <button className="cl-notify-btn">
            <Bell size={18} />
            Notifications
          </button>
          <div className="cl-profile-dropdown">
            My Profile <ChevronDown size={14} />
          </div>
        </div>
      </header>

      <main className="cl-main-content">
        {/* Welcome Section */}
        <div className="cl-welcome-section">
          <h1 className="cl-welcome-title">Welcome, Officer Singh.</h1>
        </div>

        {/* Big Action Cards */}
        <div className="cl-action-cards-row">
          <div className="cl-action-card primary">
            <div className="cl-ac-icon" style={{borderColor: 'rgba(255,255,255,0.4)', background: 'transparent'}}>
              <Briefcase size={24} />
            </div>
            <div className="cl-ac-text">
              <h2>View My Assigned Cases</h2>
            </div>
          </div>
          <div className="cl-action-card primary" onClick={() => navigate('/officer-report')}>
            <div className="cl-ac-icon" style={{borderColor: 'rgba(255,255,255,0.4)', background: 'transparent'}}>
              <BarChart2 size={24} />
            </div>
            <div className="cl-ac-text">
              <h2>Generate Performance Report</h2>
            </div>
          </div>
        </div>

        {/* Statistics & Logs Row */}
        <div className="cl-stats-row">
          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">Complaints Assigned to You</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">5</span>
              <User size={24} color="#0d5c2c" />
            </div>
          </div>
          
          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">Pending Your Approval</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">2</span>
              <ClipboardList size={24} color="#0d5c2c" />
            </div>
          </div>

          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">Complaints Resolved this Month</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">18</span>
              <Trophy size={24} color="#0d5c2c" />
            </div>
          </div>

          {/* Pie Chart Card */}
          <div className="cl-stat-card" style={{justifyContent: 'center', padding: '1rem'}}>
            <div className="cl-stat-label" style={{marginBottom: '0.4rem', color: '#111', fontWeight: 600}}>My Assigned Case Priority</div>
            <div className="cl-pie-card-inner">
              <div className="cl-pie-legend">
                <div className="cl-legend-item"><span className="cl-legend-color" style={{backgroundColor: '#ef4444'}}></span> High</div>
                <div className="cl-legend-item"><span className="cl-legend-color" style={{backgroundColor: '#eab308'}}></span> Medium</div>
                <div className="cl-legend-item"><span className="cl-legend-color" style={{backgroundColor: '#22c55e'}}></span> Low</div>
              </div>
              <div className="cl-pie-visual"></div>
            </div>
          </div>
        </div>

        {/* Data Table Area */}
        <div className="cl-data-section">
          <h3 className="cl-section-title">My Cases Todo List</h3>
          <div className="cl-table-container">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Description</th>
                  <th>Date Received</th>
                  <th>Reported By</th>
                  <th>Priority</th>
                  <th>Current Status</th>
                  <th>Next Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7150009</td>
                  <td>Investigate Description</td>
                  <td>04-07-2023</td>
                  <td>Andra Kumar</td>
                  <td><span className="cl-badge cl-badge-high">High</span></td>
                  <td>Assigned</td>
                  <td><a href="#" className="cl-action-link green">Investigate Site</a></td>
                </tr>
                <tr>
                  <td>7150002</td>
                  <td>Currenfiled Description</td>
                  <td>16-07-2023</td>
                  <td>Andra Kumar</td>
                  <td><span className="cl-badge cl-badge-medium">Medium</span></td>
                  <td>In Progress</td>
                  <td><a href="#" className="cl-action-link green">Review Evidence</a></td>
                </tr>
                <tr>
                  <td>7150003</td>
                  <td>Review Closet Description</td>
                  <td>16-07-2023</td>
                  <td>Andra Kumar</td>
                  <td><span className="cl-badge cl-badge-low">Low</span></td>
                  <td>Awaiting Closure</td>
                  <td><a href="#" className="cl-action-link green">Close Case</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfficerDashboard;
