import React from 'react';
import { Home, BarChart2, Users, Compass, Settings, LogOut, Bell, HelpCircle, User, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DashboardUI.css';

const OfficerReport = () => {
  const navigate = useNavigate();

  return (
    <div className="report-page-layout">
      {/* Left Sidebar */}
      <aside className="report-sidebar">
        <div className="sidebar-top">
          <button className="sidebar-btn" onClick={() => navigate('/dashboard')}><Home size={20} /></button>
          <button className="sidebar-btn active"><BarChart2 size={20} /></button>
          <button className="sidebar-btn"><Users size={20} /></button>
          <button className="sidebar-btn"><Compass size={20} /></button>
          <button className="sidebar-btn"><Settings size={20} /></button>
        </div>
        <div className="sidebar-bottom">
          <button className="sidebar-btn" onClick={() => navigate('/login')}><LogOut size={20} /></button>
        </div>
      </aside>

      <div className="report-content-wrapper">
        {/* Header */}
        <header className="report-header">
          <div className="cl-logo-container">
            <div className="cl-logo-badge">CL</div>
            <span className="cl-logo-text">Civic Link Portal</span>
          </div>
          <div className="report-header-actions">
            <button className="icon-action-btn"><Bell size={20} color="#666" /></button>
            <button className="icon-action-btn"><HelpCircle size={20} color="#666" /></button>
            <div className="profile-icon">
              <User size={20} color="#666" />
            </div>
          </div>
        </header>

        <main className="report-main-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 className="report-page-title" style={{ marginBottom: 0 }}>Officer Performance Report: Officer Singh</h1>
            <button onClick={() => navigate('/dashboard')} style={{ padding: '0.6rem 1.2rem', background: '#0d5c2c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} onMouseEnter={(e) => e.currentTarget.style.background = '#0a4621'} onMouseLeave={(e) => e.currentTarget.style.background = '#0d5c2c'}>
              <Home size={18} /> Return to Dashboard
            </button>
          </div>
          
          {/* Summary Metrics Row */}
          <section className="report-panel">
            <h2 className="panel-title">Summary Metrics</h2>
            <div className="metrics-row">
              {/* Metric 1 */}
              <div className="metric-cell">
                <h3 className="metric-label">Case Resolution Rate</h3>
                <div className="gauge-container">
                  <div className="gauge-bg"></div>
                  <div className="gauge-fill gauge-green"></div>
                  <div className="gauge-cover">
                    <span className="gauge-value">92%</span>
                  </div>
                </div>
                <p className="metric-subtext">Resolved: (147/160)</p>
              </div>
              
              {/* Metric 2 */}
              <div className="metric-cell">
                <h3 className="metric-label">Average Resolution Speed</h3>
                <div className="gauge-container">
                  <div className="gauge-bg"></div>
                  <div className="gauge-fill gauge-orange"></div>
                  <div className="gauge-cover">
                    <span className="gauge-value">3.8 Days</span>
                  </div>
                </div>
                <p className="metric-subtext">Target: 5 Days</p>
              </div>

              {/* Metric 3 */}
              <div className="metric-cell">
                <h3 className="metric-label">Citizen Satisfaction Score</h3>
                <div className="gauge-container">
                  <div className="gauge-bg"></div>
                  <div className="gauge-fill gauge-yellow"></div>
                  <div className="gauge-cover">
                    <Star size={24} color="#eab308" className="gauge-star" fill="#eab308" />
                    <span className="gauge-value">4.7 / 5</span>
                  </div>
                </div>
                <p className="metric-subtext">Based on 50 Reviews</p>
              </div>
            </div>
          </section>

          {/* Middle Charts Row */}
          <div className="charts-double-row">
            {/* Bar Chart Panel */}
            <section className="report-panel flex-2">
              <h2 className="panel-title">Monthly Resolution Breakdown</h2>
              <div className="chart-legend-center">
                <span className="legend-p"><span className="c-box bg-green"></span> Resolved</span>
                <span className="legend-p"><span className="c-box bg-gray"></span> Pending</span>
              </div>
              
              <div className="css-bar-chart-container">
                <div className="y-axis">
                  <span>100</span>
                  <span>80</span>
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                  <span>0</span>
                </div>
                <div className="x-axis-wrapper">
                  <div className="bar-group">
                    <div className="bar green-bar" style={{height: '75%'}}></div>
                    <div className="bar gray-bar" style={{height: '25%'}}></div>
                    <span className="x-label">Jan</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar green-bar" style={{height: '82%'}}></div>
                    <div className="bar gray-bar" style={{height: '22%'}}></div>
                    <span className="x-label">Feb</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar green-bar" style={{height: '92%'}}></div>
                    <div className="bar gray-bar" style={{height: '35%'}}></div>
                    <span className="x-label">Mar</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar green-bar" style={{height: '75%'}}></div>
                    <div className="bar gray-bar" style={{height: '20%'}}></div>
                    <span className="x-label">Apr</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar green-bar" style={{height: '88%'}}></div>
                    <div className="bar gray-bar" style={{height: '10%'}}></div>
                    <span className="x-label">May</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar green-bar" style={{height: '98%'}}></div>
                    <div className="bar gray-bar" style={{height: '15%'}}></div>
                    <span className="x-label">Jun</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Pie Chart Panel */}
            <section className="report-panel flex-1">
              <h2 className="panel-title">Case Type Distribution</h2>
              <div className="pie-chart-wrapper">
                <div className="report-pie">
                  <div className="pie-label l-1">Other<br/>20%</div>
                  <div className="pie-label l-2">Waste Management<br/>20%</div>
                  <div className="pie-label l-3">Streetlights<br/>25%</div>
                  <div className="pie-label l-4">Potholes<br/>35%</div>
                </div>
                <div className="pie-legend-side">
                  <span className="legend-p"><span className="c-box" style={{background:'#22c55e'}}></span> Potholes</span>
                  <span className="legend-p"><span className="c-box" style={{background:'#f97316'}}></span> Streetlights</span>
                  <span className="legend-p"><span className="c-box" style={{background:'#eab308'}}></span> Waste Management</span>
                  <span className="legend-p"><span className="c-box" style={{background:'#9ca3af'}}></span> Other</span>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Feedback Row */}
          <div className="feedback-double-row">
            <section className="report-panel flex-2">
              <h2 className="panel-title">Key Achievements & Feedback</h2>
              <ul className="achievement-list">
                <li>- Consistently exceeds resolution speed targets.</li>
                <li>- Received 10+ positive citizen commendations.</li>
                <li>- Successfully completed 'Advanced Conflict Resolution' training.</li>
              </ul>
            </section>
            
            <section className="report-panel flex-1">
              <h2 className="panel-title">Top Citizen Feedback</h2>
              <div className="stars-row">
                <Star size={18} fill="#eab308" color="#eab308" />
                <Star size={18} fill="#eab308" color="#eab308" />
                <Star size={18} fill="#eab308" color="#eab308" />
                <Star size={18} fill="#eab308" color="#eab308" />
                <Star size={18} fill="#eab308" color="#eab308" />
              </div>
              <blockquote className="feedback-quote">
                Officer Singh was incredibly helpful and quick! Problem solved. - Citizen A.
              </blockquote>
            </section>
          </div>

          <div className="report-footer-tag">
            <strong>Overall Performance: Exceptional</strong> <span className="bg-green-badge"><CheckCircle size={16} color="white" /></span>
          </div>

        </main>
      </div>
    </div>
  );
};

export default OfficerReport;
