import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, FilePlus, Search as SearchIcon, 
  FileText, Hourglass, CheckSquare, Building, User, Globe
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/apiConfig';

const text = {
  en: {
    title: "Civic Link Portal", langBtn: "हिंदी में देखें",
    notifications: "Notifications", profile: "Profile", signOut: "Sign Out",
    welcome: "Welcome, ", welcomeSub: "Welcome back. Manage your grievances or submit new ones.",
    fileComp: "File a New Complaint", fileDesc: "Submit a new grievance to relevant authorities.",
    trackComp: "Check Track Progress", trackDesc: "View status of all your submitted complaints.",
    active: "Your Active Complaints", await: "Awaiting Action",
    resolved: "Resolutions Received", recent: "Recent Complaint Activity",
    thId: "Complaint ID", thSub: "Subject", thDate: "Date Filed", thDept: "Department", thStatus: "Status", thAction: "Action",
    vArch: "View Archive", vDet: "View Details", noComp: "No complaints filed yet."
  },
  hi: {
    title: "नागरिक लिंक पोर्टल", langBtn: "View in English",
    notifications: "सूचनाएँ", profile: "प्रोफ़ाइल", signOut: "लॉग आउट",
    welcome: "स्वागत है, ", welcomeSub: "वापसी पर स्वागत है। अपनी शिकायतों का प्रबंधन करें या नई शिकायत दर्ज करें।",
    fileComp: "नई शिकायत दर्ज करें", fileDesc: "अधिकारियों को नई शिकायत प्रस्तुत करें।",
    trackComp: "प्रगति की जांच करें", trackDesc: "अपनी प्रस्तुत शिकायतों की स्थिति देखें।",
    active: "सक्रिय शिकायतें", await: "कार्रवाई की प्रतीक्षा",
    resolved: "प्राप्त समाधान", recent: "हाल की शिकायत गतिविधि",
    thId: "शिकायत आईडी", thSub: "विषय", thDate: "तिथि", thDept: "विभाग", thStatus: "स्थिति", thAction: "कार्रवाई",
    vArch: "संग्रह देखें", vDet: "विवरण देखें", noComp: "अभी तक कोई शिकायत नहीं।"
  }
};
import './DashboardUI.css';

const CitizenDashboard = ({ userInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const t = text[lang];

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
  };

  useEffect(() => {
    // Fetch complaints from backend
    const fetchComplaints = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userInfo') || 'null');
        const token = userData?.token;

        if (!token) {
          console.log('No token, using localStorage fallback');
          const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
          setComplaints(storedComplaints);
          return;
        }

        const response = await fetch(API_ENDPOINTS.GET_MY_GRIEVANCES, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const formattedComplaints = data.data?.map(g => ({
            id: 'CP-' + g.id,
            subject: g.title,
            fullDescription: g.description,
            date: new Date(g.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            dept: g.category,
            status: g.status || 'Pending',
            address: g.address,
            description: g.description,
            userId: g.userId,
            filedAt: g.createdAt,
            backendId: g.id
          })) || [];
          setComplaints(formattedComplaints);
          // Update localStorage backup
          localStorage.setItem('complaints', JSON.stringify(formattedComplaints));
        } else {
          // Fallback to localStorage if backend fails
          console.log('Backend error, using localStorage fallback');
          const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
          setComplaints(storedComplaints);
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
        // Fallback to localStorage
        const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        setComplaints(storedComplaints);
      }
    };

    fetchComplaints();
  }, [location]);

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
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
          <span style={{fontWeight: 700}}>{t.title}</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleLang} style={{border: 'none', background: 'transparent'}}>
             <Globe size={18} /> {t.langBtn}
          </button>
          <div style={{ position: 'relative' }}>
            <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={18} /> {t.notifications}
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
              <User size={18} /> {t.profile} ▾
            </div>
            {showProfileMenu && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', backgroundColor: 'white', border: '1px solid #eaeaea', borderRadius: '8px', width: '150px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10 }}>
                <div 
                  onClick={handleSignOut}
                  style={{ padding: '10px 15px', color: '#b91c1c', cursor: 'pointer', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}
                >
                  {t.signOut}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="dash-content">
        <h1 className="welcome-title">{t.welcome}{userInfo?.name || 'Citizen'}</h1>
        <p className="welcome-subtitle">{t.welcomeSub}</p>

        {/* Action Cards */}
        <div className="action-cards">
          <div className="action-card primary" onClick={() => navigate('/file-complaint')}>
            <div className="ac-icon"><FilePlus /></div>
            <div>
              <h3>{t.fileComp}</h3>
              <p>{t.fileDesc}</p>
            </div>
          </div>
          <div className="action-card secondary" onClick={() => navigate('/track-complaint')}>
            <div className="ac-icon grey"><SearchIcon /></div>
            <div>
              <h3>{t.trackComp}</h3>
              <p>{t.trackDesc}</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card border-green" style={{cursor: 'pointer'}} onClick={() => setSearchQuery('Pending')}>
            <div className="stat-label">{t.active}</div>
            <div className="stat-val-row">
              <span className="stat-number">{activeComplaints}</span>
              <FileText className="stat-icon-color green" />
            </div>
            <div className="progress-bar"><div className="fill green" style={{width: '30%'}}></div></div>
          </div>
          
          <div className="stat-card border-yellow" style={{cursor: 'pointer'}} onClick={() => setSearchQuery('Awaiting Response')}>
            <div className="stat-label">{t.await}</div>
            <div className="stat-val-row">
              <span className="stat-number">{awaitingAction}</span>
              <Hourglass className="stat-icon-color yellow" />
            </div>
            <div className="progress-bar"><div className="fill yellow" style={{width: '10%'}}></div></div>
          </div>

          <div className="stat-card filled-green" style={{cursor: 'pointer'}} onClick={() => setSearchQuery('Closed')}>
            <div className="stat-label">{t.resolved}</div>
            <div className="stat-val-row">
              <span className="stat-number">{resolutionsReceived}</span>
              <div className="icon-group"><CheckSquare /><Building size={16}/></div>
            </div>
            <div className="progress-bar"><div className="fill white" style={{width: '70%'}}></div></div>
          </div>
        </div>

        {/* Table */}
        <div className="recent-activity">
          <h2>{t.recent}</h2>
          <table className="dash-table">
            <thead>
              <tr>
                <th>{t.thId}</th>
                <th>{t.thSub}</th>
                <th>{t.thDate}</th>
                <th>{t.thDept}</th>
                <th>{t.thStatus}</th>
                <th>{t.thAction}</th>
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
                        {c.status === 'Closed' ? t.vArch : t.vDet}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '2rem', color: '#999'}}>{t.noComp}</td>
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
