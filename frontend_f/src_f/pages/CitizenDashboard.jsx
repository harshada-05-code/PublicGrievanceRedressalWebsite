import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, FilePlus, Search as SearchIcon, 
  FileText, Hourglass, CheckSquare, Building, User
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DashboardUI.css';

const CitizenDashboard = ({ userInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Refresh complaints when component loads or location changes
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(storedComplaints);
  }, [location]);

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // Calculate statistics based on complaints
  const activeComplaints = complaints.filter(c => c.status === 'Pending' || c.status === 'In Progress').length;
  const awaitingAction = complaints.filter(c => c.status === 'Awaiting Response').length;
  const resolutionsReceived = complaints.filter(c => c.status === 'Resolution Received' || c.status === 'Closed').length;

  const filteredComplaints = complaints.filter(c => {
    return c.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || 
           c.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.dept?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.status?.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={18} /> Notifications
            </button>
            {showNotifications && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', backgroundColor: 'white', border: '1px solid #eaeaea', borderRadius: '8px', width: '250px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10 }}>
                <div style={{ padding: '10px 15px', borderBottom: '1px solid #eaeaea', fontWeight: 600, fontSize: '14px' }}>Notifications</div>
                <div style={{ padding: '10px 15px', fontSize: '13px', color: '#4b5563', borderBottom: '1px solid #eaeaea' }}>
                  <strong>System Action</strong><br/>
                  Your profile has been updated.
                </div>
                <div style={{ padding: '10px 15px', fontSize: '13px', color: '#4b5563' }}>
                  <strong>Welcome</strong><br/>
                  Welcome to the platform!
                </div>
              </div>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <div 
              className="profile-menu icon-btn" 
              onClick={() => setShowProfileMenu(!showProfileMenu)} 
              style={{cursor: 'pointer', fontWeight: 600}}
            >
              <User size={18} /> Profile ▾
            </div>
            {showProfileMenu && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', backgroundColor: 'white', border: '1px solid #eaeaea', borderRadius: '8px', width: '150px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10 }}>
                <div 
                  onClick={handleSignOut}
                  style={{ padding: '10px 15px', color: '#b91c1c', cursor: 'pointer', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}
                >
                  Sign Out
                </div>
              </div>
            )}
          </div>
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
          <div 
            className="stat-card border-green" 
            style={{cursor: 'pointer'}} 
            onClick={() => setSearchQuery('Pending')}
          >
            <div className="stat-label">Your Active Complaints</div>
            <div className="stat-val-row">
              <span className="stat-number">{activeComplaints}</span>
              <FileText className="stat-icon-color green" />
            </div>
            <div className="progress-bar"><div className="fill green" style={{width: '30%'}}></div></div>
          </div>
          
          <div 
            className="stat-card border-yellow" 
            style={{cursor: 'pointer'}} 
            onClick={() => setSearchQuery('Awaiting Response')}
          >
            <div className="stat-label">Awaiting Action</div>
            <div className="stat-val-row">
              <span className="stat-number">{awaitingAction}</span>
              <Hourglass className="stat-icon-color yellow" />
            </div>
            <div className="progress-bar"><div className="fill yellow" style={{width: '10%'}}></div></div>
          </div>

          <div 
            className="stat-card filled-green" 
            style={{cursor: 'pointer'}} 
            onClick={() => setSearchQuery('Closed')}
          >
            <div className="stat-label">Resolutions Received</div>
            <div className="stat-val-row">
              <span className="stat-number">{resolutionsReceived}</span>
              <div className="icon-group"><CheckSquare /><Building size={16}/></div>
            </div>
            <div className="progress-bar"><div className="fill white" style={{width: '70%'}}></div></div>
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
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((c, i) => (
                  <tr key={i}>
                    <td>{c.id}</td>
                    <td>{c.subject}</td>
                    <td>{c.date}</td>
                    <td>{c.dept}</td>
                    <td>{c.status}</td>
                    <td>
                      <a 
                        href="#" 
                        className="action-link green"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/track-complaint', { state: { complaintId: c.id } });
                        }}
                      >
                        {c.status === 'Closed' ? 'View Archive' : 'View Details'}
                      </a>
                    </td>
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
