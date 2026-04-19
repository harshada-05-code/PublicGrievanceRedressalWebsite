import React from 'react';
import { Search, Bell, UserPlus, Settings, User, FileText, CheckCircle, ChevronDown } from 'lucide-react';
import './DashboardUI.css';

const AdminDashboard = () => {
  return (
    <div className="admin-portal-container">
      {/* Header */}
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
          <h1 className="cl-welcome-title">Welcome, Administrator</h1>
          <p className="cl-welcome-subtitle">Control Center. Manage system users, data, and settings.</p>
        </div>

        {/* Big Action Cards */}
        <div className="cl-action-cards-row">
          <div className="cl-action-card primary">
            <div className="cl-ac-icon">
              <UserPlus size={24} />
            </div>
            <div className="cl-ac-text">
              <h2>Manage User Accounts</h2>
              <p>View, edit, or remove all system users.</p>
            </div>
          </div>
          <div className="cl-action-card secondary">
            <div className="cl-ac-icon secondary-icon">
              <Settings size={28} color="#666" />
            </div>
            <div className="cl-ac-text">
              <h2>System Configuration</h2>
              <p>Adjust global portal settings and workflows.</p>
            </div>
          </div>
        </div>

        {/* Statistics & Logs Row */}
        <div className="cl-stats-row">
          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">Total Registered Citizens</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">3,450</span>
              <User size={24} color="#0d5c2c" />
            </div>
          </div>
          
          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">Total System Reports Filed</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">812</span>
              <FileText size={24} color="#0d5c2c" />
            </div>
          </div>

          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">System Health Status</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">Excellent</span>
              <CheckCircle size={24} color="#0d5c2c" />
            </div>
          </div>

          <div className="cl-stat-card cl-log-card">
            <div className="cl-stat-label" style={{marginBottom: '0.75rem', color: '#111', fontWeight: 600}}>Recent System Activity Log</div>
            <ul className="cl-activity-log">
              <li><span className="log-time">15 hours ago</span> <span className="log-action">User Added</span></li>
              <li><span className="log-time">24 hours ago</span> <span className="log-action">Role Updated</span></li>
              <li><span className="log-time">14 hours ago</span> <span className="log-action">Role Updated</span></li>
              <li><span className="log-time">13 hours ago</span> <span className="log-action">User Added</span></li>
            </ul>
          </div>
        </div>

        {/* Data Table Area */}
        <div className="cl-data-section">
          <h3 className="cl-section-title">Comprehensive Data Overview</h3>
          <div className="cl-table-container">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Reporter</th>
                  <th>Date Filed</th>
                  <th>Department</th>
                  <th>Current Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7150009</td>
                  <td>Andra Kumar</td>
                  <td>04-07-2023</td>
                  <td>Department</td>
                  <td>Currenfiled</td>
                  <td><a href="#" className="cl-action-link green">View Detailed Report</a></td>
                </tr>
                <tr>
                  <td>7150003</td>
                  <td>Andra Kumar</td>
                  <td>16-07-2023</td>
                  <td>Department</td>
                  <td>Escalate</td>
                  <td><a href="#" className="cl-action-link green">Escalate</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
