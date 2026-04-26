import React, { useState, useEffect } from 'react';
import { Search, Bell, Briefcase, BarChart2, User, ClipboardList, Trophy, ChevronDown, Globe } from 'lucide-react';
import './DashboardUI.css';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/apiConfig';

const text = {
  en: {
    title: "Civic Link Portal", langBtn: "हिंदी में देखें", notifications: "Notifications", signOut: "Sign Out",
    welcome: "Welcome, Officer Singh.", viewAssigned: "View My Assigned Cases", genReport: "Generate Performance Report",
    compAssigned: "Complaints Assigned to You", pendingAppr: "Pending Your Approval", compResMonth: "Complaints Resolved this Month",
    casePriority: "My Assigned Case Priority", high: "High", med: "Medium", low: "Low",
    todoList: "My Cases Todo List",
    thId: "Case ID", thDesc: "Description", thDate: "Date Received", thRep: "Reported By", thPri: "Priority", thStatus: "Current Status", thAction: "Next Action",
    invSite: "Investigate Site", revEvid: "Review Evidence", cloCase: "Close Case",
    assigned: "Assigned", inProg: "In Progress", awaitC: "Awaiting Closure"
  },
  hi: {
    title: "नागरिक लिंक पोर्टल", langBtn: "View in English", notifications: "सूचनाएँ", signOut: "लॉग आउट",
    welcome: "स्वागत है, अधिकारी सिंह।", viewAssigned: "मेरे सौंपे गए मामले देखें", genReport: "प्रदर्शन रिपोर्ट तैयार करें",
    compAssigned: "आपको सौंपी गई शिकायतें", pendingAppr: "आपकी स्वीकृति के लिए लंबित", compResMonth: "इस महीने हल की गई शिकायतें",
    casePriority: "मेरे सौंपे गए मामले की प्राथमिकता", high: "उच्च", med: "मध्यम", low: "निम्न",
    todoList: "मेरी मामलों की टू-डू सूची",
    thId: "केस आईडी", thDesc: "विवरण", thDate: "प्राप्त तिथि", thRep: "रिपोर्ट कर्ता", thPri: "प्राथमिकता", thStatus: "वर्तमान स्थिति", thAction: "अगली कार्रवाई",
    invSite: "साइट की जांच करें", revEvid: "साक्ष्य की समीक्षा करें", cloCase: "केस बंद करें",
    assigned: "सौंपा गया", inProg: "प्रगति पर है", awaitC: "समापन की प्रतीक्षा है"
  }
};

const OfficerDashboard = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const [showNotifications, setShowNotifications] = useState(false);
  const [myGrievances, setMyGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = text[lang];

  useEffect(() => {
    fetchMyGrievances();
  }, []);

  const fetchMyGrievances = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userInfo') || 'null');
      const token = userData?.token;

      if (!token) return;

      const response = await fetch(API_ENDPOINTS.GET_MY_GRIEVANCES, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setMyGrievances(data.data || []);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    } finally {
      setLoading(false);
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
      {/* Header (Shared style with Admin) */}
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
                <div style={{ padding: '12px 15px', borderBottom: '1px solid #eaeaea', fontWeight: '600', fontSize: '14px' }}>Notifications</div>
                <div style={{ padding: '12px 15px', fontSize: '13px', color: '#4b5563', borderBottom: '1px solid #eaeaea' }}>
                  <strong>New Assignment</strong><br/>
                  2 new cases assigned to you
                </div>
                <div style={{ padding: '12px 15px', fontSize: '13px', color: '#4b5563', borderBottom: '1px solid #eaeaea' }}>
                  <strong>Escalation Notice</strong><br/>
                  Case #7150009 requires immediate attention
                </div>
                <div style={{ padding: '12px 15px', fontSize: '13px', color: '#4b5563' }}>
                  <strong>Performance Update</strong><br/>
                  Your monthly resolution rate: 92%
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
          <h1 className="cl-welcome-title">{t.welcome}</h1>
        </div>

        {/* Big Action Cards */}
        <div className="cl-action-cards-row">
          <div 
            className="cl-action-card primary" 
            onClick={() => navigate('/officer-cases')}
            onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';}}
            onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}
            style={{transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', cursor: 'pointer'}}
          >
            <div className="cl-ac-icon" style={{borderColor: 'rgba(255,255,255,0.4)', background: 'transparent'}}>
              <Briefcase size={24} />
            </div>
            <div className="cl-ac-text">
              <h2>{t.viewAssigned}</h2>
            </div>
          </div>
          <div 
            className="cl-action-card primary" 
            onClick={() => navigate('/officer-report')}
            onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';}}
            onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}
            style={{transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', cursor: 'pointer'}}
          >
            <div className="cl-ac-icon" style={{borderColor: 'rgba(255,255,255,0.4)', background: 'transparent'}}>
              <BarChart2 size={24} />
            </div>
            <div className="cl-ac-text">
              <h2>{t.genReport}</h2>
            </div>
          </div>
        </div>

        {/* Statistics & Logs Row */}
        <div className="cl-stats-row">
          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">{t.compAssigned}</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">{myGrievances.length}</span>
              <User size={24} color="#0d5c2c" />
            </div>
          </div>
          
          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">{t.pendingAppr || 'Assigned Cases'}</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">{myGrievances.filter(g => g.status === 'Assigned' || g.status === 'In Progress').length}</span>
              <ClipboardList size={24} color="#0d5c2c" />
            </div>
          </div>

          <div className="cl-stat-card border-bottom-green">
            <div className="cl-stat-label">{t.compResMonth}</div>
            <div className="cl-stat-val-row">
              <span className="cl-stat-number">{myGrievances.filter(g => g.status === 'Resolved').length}</span>
              <Trophy size={24} color="#0d5c2c" />
            </div>
          </div>

          {/* Pie Chart Card */}
          <div className="cl-stat-card" style={{justifyContent: 'center', padding: '1rem'}}>
            <div className="cl-stat-label" style={{marginBottom: '0.4rem', color: '#111', fontWeight: 600}}>{t.casePriority}</div>
            <div className="cl-pie-card-inner">
              <div className="cl-pie-legend">
                <div className="cl-legend-item"><span className="cl-legend-color" style={{backgroundColor: '#ef4444'}}></span> {t.high}</div>
                <div className="cl-legend-item"><span className="cl-legend-color" style={{backgroundColor: '#eab308'}}></span> {t.med}</div>
                <div className="cl-legend-item"><span className="cl-legend-color" style={{backgroundColor: '#22c55e'}}></span> {t.low}</div>
              </div>
              <div className="cl-pie-visual"></div>
            </div>
          </div>
        </div>

        {/* Data Table Area */}
        <div className="cl-data-section">
          <h3 className="cl-section-title">{t.todoList}</h3>
          <div className="cl-table-container">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>{t.thId}</th>
                  <th>{t.thDesc}</th>
                  <th>{t.thDate}</th>
                  <th>{t.thRep}</th>
                  <th>{t.thPri}</th>
                  <th>{t.thStatus}</th>
                  <th>{t.thAction}</th>
                </tr>
              </thead>
              <tbody>
                {myGrievances.length > 0 ? myGrievances.slice(0, 5).map((grievance, idx) => {
                  const getPriority = (cat) => {
                    if (['Water', 'Electricity'].includes(cat)) return { label: 'High', class: 'cl-badge-high' };
                    if (['Roads', 'Waste'].includes(cat)) return { label: 'Medium', class: 'cl-badge-medium' };
                    return { label: 'Low', class: 'cl-badge-low' };
                  };
                  const priority = getPriority(grievance.category);
                  return (
                  <tr key={idx}>
                    <td>CP-{grievance.id}</td>
                    <td>{grievance.title || 'N/A'}</td>
                    <td>{new Date(grievance.createdAt).toLocaleDateString()}</td>
                    <td>{grievance.User?.name || 'N/A'}</td>
                    <td><span className={`cl-badge ${priority.class}`}>{priority.label}</span></td>
                    <td>{grievance.status}</td>
                    <td><button onClick={() => navigate('/officer-cases')} className="cl-action-link green" style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>View</button></td>
                  </tr>
                  );
                }) : (
                  <tr><td colSpan="7" style={{textAlign: 'center', padding: '1rem', color: '#999'}}>No cases assigned</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfficerDashboard;
