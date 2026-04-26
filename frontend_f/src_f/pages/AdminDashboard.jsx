import React, { useState, useEffect } from 'react';
import { Search, Bell, UserPlus, Settings, User, FileText, CheckCircle, ChevronDown, Globe } from 'lucide-react';
import './DashboardUI.css';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/apiConfig';

const text = {
  en: {
    title: "CivicLink Portal", langBtn: "हिंदी में देखें", notifications: "Notifications", signOut: "Sign Out",
    welcome: "Welcome, Administrator", welcomeSub: "Control Center. Manage system users, data, and settings.",
    manageUsers: "Manage User Accounts", manageUsersDesc: "View, edit, or remove all system users.",
    sysConfig: "System Configuration", sysConfigDesc: "Adjust global portal settings and workflows.",
    totCit: "Total Registered Citizens", totRep: "Total System Reports Filed", sysHealth: "System Health Status", excellent: "Excellent",
    activityLog: "Recent System Activity Log",
    dataOver: "Comprehensive Data Overview",
    thId: "Report ID", thRep: "Reporter", thDate: "Date Filed", thDept: "Department", thStatus: "Current Status", thAction: "Action",
    vRep: "View Detailed Report", esc: "Escalate"
  },
  hi: {
    title: "नागरिक लिंक पोर्टल", langBtn: "View in English", notifications: "सूचनाएँ", signOut: "लॉग आउट",
    welcome: "स्वागत है, प्रशासक", welcomeSub: "नियंत्रण केंद्र। सिस्टम उपयोगकर्ताओं, डेटा और सेटिंग्स प्रबंधित करें।",
    manageUsers: "उपयोगकर्ता खाते प्रबंधित करें", manageUsersDesc: "सभी सिस्टम उपयोगकर्ताओं को देखें, संपादित करें या हटा दें।",
    sysConfig: "सिस्टम कॉन्फ़िगरेशन", sysConfigDesc: "वैश्विक पोर्टल सेटिंग्स और वर्कफ़्लो समायोजित करें।",
    totCit: "कुल पंजीकृत नागरिक", totRep: "कुल सिस्टम रिपोर्ट", sysHealth: "सिस्टम स्वास्थ्य स्थिति", excellent: "उत्कृष्ट",
    activityLog: "हाल की सिस्टम गतिविधि लॉग",
    dataOver: "व्यापक डेटा अवलोकन",
    thId: "रिपोर्ट आईडी", thRep: "रिपोर्टर", thDate: "तिथि", thDept: "विभाग", thStatus: "वर्तमान स्थिति", thAction: "कार्रवाई",
    vRep: "विस्तृत रिपोर्ट देखें", esc: "आगे बढ़ाएं"
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [grievances, setGrievances] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = text[lang];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userInfo') || 'null');
      const token = userData?.token;

      if (!token) return;

      const grievanceRes = await fetch(API_ENDPOINTS.GET_MY_GRIEVANCES.replace('/my', ''), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const grievanceData = await grievanceRes.json();
      setGrievances(grievanceData.data || []);

      const userRes = await fetch(API_ENDPOINTS.GET_ALL_USERS, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const userData_list = await userRes.json();
      setUsers(userData_list || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignGrievance = async (grievanceId, officerId) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userInfo') || 'null');
      const token = userData?.token;
      
      const res = await fetch(API_ENDPOINTS.ASSIGN_GRIEVANCE(grievanceId), {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ officerId })
      });
      
      if (res.ok) {
        // Refresh data
        fetchData();
        alert('Grievance successfully assigned!');
      } else {
        const errorData = await res.json();
        alert(`Failed to assign: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error assigning grievance:', err);
      alert('Error assigning grievance');
    }
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
  };

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <div className="admin-portal-container">
      {/* Header */}
      <header className="cl-header">
        <div className="cl-logo-container">
          <div className="cl-logo-badge">CL</div>
          <span className="cl-logo-text">{t.title}</span>
        </div>
        
        <div className="cl-search-container">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search" className="cl-search-input" />
        </div>

        <div className="cl-header-actions">
          <button className="cl-notify-btn" onClick={toggleLang} style={{border: 'none', background: 'transparent'}}>
             <Globe size={18} /> {t.langBtn}
          </button>
          <div style={{ position: 'relative' }}>
            <button className="cl-notify-btn" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={18} />
              {t.notifications}
            </button>
            {showNotifications && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', backgroundColor: 'white', border: '1px solid #eaeaea', borderRadius: '8px', width: '280px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10 }}>
                <div style={{ padding: '12px 15px', borderBottom: '1px solid #eaeaea', fontWeight: 600, fontSize: '14px' }}>Notifications</div>
                <div style={{ padding: '12px 15px', fontSize: '13px', color: '#4b5563', borderBottom: '1px solid #eaeaea' }}>
                  <strong>System Action</strong><br/>
                  New user registered: John Doe
                </div>
                <div style={{ padding: '12px 15px', fontSize: '13px', color: '#4b5563', borderBottom: '1px solid #eaeaea' }}>
                  <strong>Escalation Alert</strong><br/>
                  3 grievances pending escalation
                </div>
                <div style={{ padding: '12px 15px', fontSize: '13px', color: '#4b5563' }}>
                  <strong>System Status</strong><br/>
                  All systems operational
                </div>
              </div>
            )}
          </div>
          <div className="cl-profile-dropdown" onClick={handleSignOut} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#b91c1c', fontWeight: 600}}>
            {t.signOut} <ChevronDown size={14} />
          </div>
        </div>
      </header>

      <main className="cl-main-content">
        {/* Welcome Section */}
        <div className="cl-welcome-section">
          <div className="cl-welcome-text">
            <h1 className="cl-welcome-title">{t.welcome}</h1>
            <p>{t.welcomeSub}</p>
          </div>
        </div>

        {/* Action Cards Row */}
        <div className="cl-action-cards-row">
          <div className="cl-action-card primary" onClick={() => navigate('/manage-users')} style={{cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s'}} onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}>
            <div className="cl-ac-icon primary-icon" style={{borderColor: 'rgba(255,255,255,0.4)', background: 'transparent'}}>
              <UserPlus size={28} color="#fff" />
            </div>
            <div className="cl-ac-text">
              <h2>{t.manageUsers}</h2>
              <p>{t.manageUsersDesc}</p>
            </div>
          </div>
          
          <div className="cl-action-card secondary" onClick={() => navigate('/system-configuration')} style={{cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s'}} onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}>
            <div className="cl-ac-icon secondary-icon">
              <Settings size={28} color="#666" />
            </div>
            <div className="cl-ac-text">
              <h2>{t.sysConfig}</h2>
              <p>{t.sysConfigDesc}</p>
            </div>
          </div>
        </div>

        {/* Statistics & Logs Row */}
        <div className="cl-stats-row">
          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">{t.totCit}</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">{users.length}</span>
              <User size={24} color="#0d5c2c" />
            </div>
          </div>
          
          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">{t.totRep}</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">{grievances.length}</span>
              <FileText size={24} color="#0d5c2c" />
            </div>
          </div>

          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">{t.sysHealth}</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">{t.excellent}</span>
              <CheckCircle size={24} color="#0d5c2c" />
            </div>
          </div>

          <div className="cl-stat-card cl-log-card">
            <div className="cl-stat-label" style={{marginBottom: '0.75rem', color: '#111', fontWeight: 600}}>{t.activityLog}</div>
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
          <h3 className="cl-section-title">{t.dataOver}</h3>
          <div className="cl-table-container">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>{t.thId}</th>
                  <th>{t.thRep}</th>
                  <th>{t.thDate}</th>
                  <th>{t.thDept}</th>
                  <th>{t.thStatus}</th>
                  <th>Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {grievances.length > 0 ? grievances.slice(0, 5).map((grievance, idx) => (
                  <tr key={idx}>
                    <td>CP-{grievance.id}</td>
                    <td>{grievance.User?.name || 'N/A'}</td>
                    <td>{new Date(grievance.createdAt).toLocaleDateString()}</td>
                    <td>{grievance.category}</td>
                    <td><span className={`cl-badge ${grievance.status === 'Resolved' ? 'cl-badge-low' : grievance.status === 'Assigned' ? 'cl-badge-medium' : 'cl-badge-high'}`}>{grievance.status}</span></td>
                    <td>
                      <select 
                        value={grievance.assignedOfficerId || ''} 
                        onChange={(e) => handleAssignGrievance(grievance.id, e.target.value)}
                        style={{padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc'}}
                      >
                        <option value="">Unassigned</option>
                        {users.filter(u => u.role === 'department_officer').map(officer => (
                          <option key={officer._id || officer.id} value={officer._id || officer.id}>{officer.name} ({officer.number})</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6" style={{textAlign: 'center', padding: '1rem', color: '#999'}}>No data available</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
