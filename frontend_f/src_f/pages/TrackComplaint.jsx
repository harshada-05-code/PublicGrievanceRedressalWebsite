import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/apiConfig';
import './DashboardUI.css';

const TrackComplaint = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchId, setSearchId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [complaint, setComplaint] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Check if complaint ID was passed via navigation state
  useEffect(() => {
    if(location.state?.complaintId) {
      setSearchId(location.state.complaintId);
      searchComplaint(location.state.complaintId);
    }
  }, [location.state]);

  // Search and fetch complaint from backend API, then fallback to localStorage
  const searchComplaint = async (id) => {
    if(id.trim() !== '') {
      try {
        const userData = JSON.parse(localStorage.getItem('userInfo') || 'null');
        const token = userData?.token;

        if (token) {
          // Try backend first
          const response = await fetch(API_ENDPOINTS.GET_MY_GRIEVANCES, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            const allComplaints = data.data?.map(g => ({
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

            const found = allComplaints.find(c => c.id === id.trim());
            if (found) {
              setComplaint(found);
              setNotFound(false);
              setHasSearched(true);
              return;
            }
          }
        }

        // Fallback to localStorage
        const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        const found = complaints.find(c => c.id === id.trim());
        
        if(found) {
          setComplaint(found);
          setNotFound(false);
        } else {
          setComplaint(null);
          setNotFound(true);
        }
        setHasSearched(true);
      } catch (error) {
        console.error('Error searching complaint:', error);
        // Fallback to localStorage on error
        const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        const found = complaints.find(c => c.id === id.trim());
        
        if(found) {
          setComplaint(found);
          setNotFound(false);
        } else {
          setComplaint(null);
          setNotFound(true);
        }
        setHasSearched(true);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchComplaint(searchId);
  };

  return (
    <div className="dashboard-container" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      {/* Header */}
      <header className="dash-header">
        <div className="logo-container cursor-pointer" onClick={() => navigate('/dashboard')}>
          <span className="logo-badge">JP</span>
          <span style={{fontWeight: 700}}>Jan Shikayat Portal</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn" style={{border: '1px solid #eaeaea', backgroundColor: 'transparent'}}>हिंदी में देखें</button>
          <div className="profile-menu" style={{cursor: 'pointer'}} onClick={() => navigate('/dashboard')}>Dashboard</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dash-content" style={{flex: 1, paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto', width: '100%'}}>
        
        <button 
          onClick={() => navigate('/dashboard')} 
          style={{background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', cursor: 'pointer', marginBottom: '1.5rem'}}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <h1 style={{fontSize: '2.2rem', fontWeight: '800', color: '#0d5c2c', marginBottom: '0.5rem'}}>
          Track Complaint Status
        </h1>
        <p style={{color: '#4b5563', marginBottom: '2rem'}}>Enter your Application/Complaint Number to view the latest updates.</p>

        {/* Search Box */}
        <div style={{background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', marginBottom: '2rem'}}>
          <form onSubmit={handleSearch} style={{display: 'flex', gap: '1rem'}}>
            <div style={{flex: 1, position: 'relative'}}>
              <Search style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b'}} size={20} />
              <input 
                type="text" 
                placeholder="e.g. CP-20231026-01" 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                style={{
                  width: '100%', padding: '1rem 1rem 1rem 3rem', fontSize: '1rem',
                  border: '2px solid #e2e8f0', borderRadius: '8px', outline: 'none'
                }}
                required
              />
            </div>
            <button type="submit" style={{
              backgroundColor: '#0d5c2c', color: 'white', border: 'none', 
              padding: '0 1.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
            }}>
              Track Progress
            </button>
          </form>
        </div>

        {/* Results */}
        {hasSearched && complaint && (
          <div style={{background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem'}}>
              <div>
                <h2 style={{fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.25rem'}}>Complaint #{complaint.id}</h2>
                <div style={{color: '#64748b'}}>Subject: {complaint.subject}</div>
                <div style={{color: '#64748b'}}>Filed on: {complaint.date} | Dept: {complaint.dept}</div>
              </div>
              <div style={{
                backgroundColor: complaint.status === 'Pending' ? '#fef3c7' : '#dcfce3', 
                color: complaint.status === 'Pending' ? '#f59e0b' : '#10b981', 
                padding: '0.5rem 1rem', 
                borderRadius: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                {complaint.status === 'Pending' && <Clock size={16} />}
                {complaint.status === 'In Progress' && <Clock size={16} />}
                {complaint.status === 'Closed' && <CheckCircle2 size={16} />}
                {complaint.status}
              </div>
            </div>

            {/* Timeline */}
            <div style={{position: 'relative', paddingLeft: '1.5rem'}}>
              {/* Timeline Line */}
              <div style={{position: 'absolute', left: '6px', top: '24px', bottom: '24px', width: '2px', backgroundColor: '#e2e8f0'}}></div>
              
              {/* Step 1 */}
              <div style={{position: 'relative', marginBottom: '2rem'}}>
                <div style={{position: 'absolute', left: '-1.5rem', top: '0', backgroundColor: 'white'}}>
                  <CheckCircle2 color="#10b981" fill="#dcfce3" size={24} />
                </div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem'}}>Complaint Registered</h3>
                <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0'}}>{complaint.date}</p>
                <p style={{marginTop: '0.5rem'}}>Your complaint has been successfully registered in the portal.</p>
              </div>

              {/* Step 2 */}
              <div style={{position: 'relative', marginBottom: '2rem'}}>
                <div style={{position: 'absolute', left: '-1.5rem', top: '0', backgroundColor: 'white'}}>
                  {complaint.status !== 'Pending' ? 
                    <CheckCircle2 color="#10b981" fill="#dcfce3" size={24} /> :
                    <AlertCircle color="#cbd5e1" fill="white" size={24} />
                  }
                </div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem'}}>Assigned to {complaint.dept} Department</h3>
                <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0'}}>In Processing</p>
                <p style={{marginTop: '0.5rem'}}>The complaint has been forwarded to the relevant departmental officer.</p>
              </div>

              {/* Step 3 */}
              <div style={{position: 'relative', marginBottom: '2rem', opacity: complaint.status === 'Closed' ? 1 : 0.5}}>
                <div style={{position: 'absolute', left: '-1.5rem', top: '0', backgroundColor: 'white'}}>
                  {complaint.status === 'Closed' ? 
                    <CheckCircle2 color="#10b981" fill="#dcfce3" size={24} /> :
                    <Clock color="#f59e0b" fill="#fef3c7" size={24} />
                  }
                </div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem'}}>
                  {complaint.status === 'Closed' ? 'Resolution Provided' : 'Under Investigation (Current)'}
                </h3>
                <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0'}}>
                  {complaint.status === 'Closed' ? 'Completed' : 'In Progress'}
                </p>
                <p style={{marginTop: '0.5rem'}}>
                  {complaint.status === 'Closed' ? 
                    'Your grievance has been resolved. Check your email for resolution details.' :
                    'An officer is currently reviewing the issue on the ground.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Not Found Message */}
        {hasSearched && notFound && (
          <div style={{background: '#fee2e2', border: '1px solid #fecaca', color: '#991b1b', padding: '1.5rem', borderRadius: '8px', textAlign: 'center'}}>
            <p>Complaint ID <strong>{searchId}</strong> not found. Please check the tracking number and try again.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{backgroundColor: '#0d5c2c', color: 'white', textAlign: 'center', padding: '1.5rem'}}>
        <h2 style={{fontSize: '1.2rem', fontWeight: '600', margin: '0'}}>Jan Shikayat Portal Tracker</h2>
      </footer>
    </div>
  );
};

export default TrackComplaint;
