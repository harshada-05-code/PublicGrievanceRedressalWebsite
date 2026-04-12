import React from 'react';
import { Clock, FileText, BarChart2, Bell } from 'lucide-react';
import './DashboardUI.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dash-header">
        <div className="logo-container">
          <span className="logo-badge">JP</span>
          <span style={{fontWeight: 700}}>Jan Shikayat Portal</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn">हिंदी में देखें</button>
          <div className="profile-menu">Admin</div>
        </div>
      </header>

      <main className="dash-content">
        <div className="admin-tbar">
          <h1 className="welcome-title" style={{marginBottom: 0, fontSize: '1.75rem'}}>Admin Dashboard</h1>
          <div className="admin-filters">
            <span style={{fontSize:'0.875rem', color:'#666'}}>Time Period:</span>
            <select className="filter-select"><option>Last 30 Days</option></select>
            <div className="search-bar slim">
              <input type="text" placeholder="Filter by Dept/ID" />
            </div>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="admin-stats-cards">
          <div className="admin-stat-card">
            <div className="admin-stat-icon bg-red-light"><Clock size={20} color="#b91c1c" /></div>
            <div className="admin-stat-val">7.2 Days</div>
            <div className="admin-stat-label">Average Resolution Time</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon bg-orange-light"><FileText size={20} color="#c2410c" /></div>
            <div className="admin-stat-val">415</div>
            <div className="admin-stat-label">Pending Complaints</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon bg-green-light"><BarChart2 size={20} color="#15803d" /></div>
            <div className="admin-stat-val">8,950</div>
            <div className="admin-stat-label">Completed Resolutions</div>
          </div>
        </div>

        {/* Charts Mock Layout */}
        <div className="charts-grid border-top-banner">
          <div className="chart-card">
            <h3 className="chart-title">Departmental Workload: Open Complaints</h3>
            <div className="mock-bar-chart">
              {/* CSS pseudo chart */}
              <div className="bar-row"><span className="label">Public Works</span><div className="bar" style={{width: '90%'}}></div></div>
              <div className="bar-row"><span className="label">Health</span><div className="bar" style={{width: '60%'}}></div></div>
              <div className="bar-row"><span className="label">Education</span><div className="bar" style={{width: '50%'}}></div></div>
              <div className="bar-row"><span className="label">Transport</span><div className="bar" style={{width: '40%'}}></div></div>
              <div className="bar-row"><span className="label">Organisation</span><div className="bar" style={{width: '35%'}}></div></div>
              <div className="bar-row"><span className="label">Urban Development</span><div className="bar" style={{width: '20%'}}></div></div>
              <div className="bar-row"><span className="label">Public Works 2</span><div className="bar" style={{width: '10%'}}></div></div>
            </div>
          </div>
          <div className="chart-card">
            <h3 className="chart-title">Grievance Volume & Resolution Trend</h3>
            <div className="mock-line-chart">
              {/* Pure CSS/SVG Mock representation for the visual */}
              <svg viewBox="0 0 500 200" className="chart-svg">
                <polyline fill="none" stroke="#0d5c2c" strokeWidth="3" points="0,150 50,130 100,80 150,110 200,105 250,50 300,70 350,40 400,90 450,20 500,120"/>
                <polyline fill="none" stroke="#a7f3d0" strokeWidth="3" points="0,180 50,180 100,140 150,160 200,130 250,120 300,150 350,120 400,130 450,100 500,160"/>
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
