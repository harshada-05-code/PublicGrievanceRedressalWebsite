import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DashboardUI.css';

const TrackComplaint = () => {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Mock checking logic
  const handleSearch = (e) => {
    e.preventDefault();
    if(searchId.trim() !== '') {
      setHasSearched(true);
    }
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
        {hasSearched && (
          <div style={{background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem'}}>
              <div>
                <h2 style={{fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.25rem'}}>Complaint #{searchId || 'CP-20231026-01'}</h2>
                <div style={{color: '#64748b'}}>Subject: Pothole in Sector 7</div>
                <div style={{color: '#64748b'}}>Filed on: 26 Oct 2023 | Dept: Public Works</div>
              </div>
              <div style={{
                backgroundColor: '#fef3c7', color: '#f59e0b', padding: '0.5rem 1rem', 
                borderRadius: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                <Clock size={16} /> In Progress
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
                <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0'}}>26 Oct 2023, 10:30 AM</p>
                <p style={{marginTop: '0.5rem'}}>Your complaint has been successfully registered in the portal.</p>
              </div>

              {/* Step 2 */}
              <div style={{position: 'relative', marginBottom: '2rem'}}>
                <div style={{position: 'absolute', left: '-1.5rem', top: '0', backgroundColor: 'white'}}>
                  <CheckCircle2 color="#10b981" fill="#dcfce3" size={24} />
                </div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem'}}>Assigned to Public Works Department</h3>
                <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0'}}>26 Oct 2023, 02:15 PM</p>
                <p style={{marginTop: '0.5rem'}}>The complaint has been forwarded to the relevant departmental officer.</p>
              </div>

              {/* Step 3 */}
              <div style={{position: 'relative', marginBottom: '2rem'}}>
                <div style={{position: 'absolute', left: '-1.5rem', top: '0', backgroundColor: 'white'}}>
                  <Clock color="#f59e0b" fill="#fef3c7" size={24} />
                </div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem'}}>Under Investigation (Current)</h3>
                <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0'}}>27 Oct 2023, 09:00 AM</p>
                <p style={{marginTop: '0.5rem'}}>An officer is currently reviewing the issue on the ground.</p>
              </div>

              {/* Step 4 */}
              <div style={{position: 'relative', opacity: 0.5}}>
                <div style={{position: 'absolute', left: '-1.5rem', top: '0', backgroundColor: 'white'}}>
                  <AlertCircle color="#cbd5e1" size={24} />
                </div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem'}}>Resolution Provided</h3>
                <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '0'}}>Pending</p>
              </div>

            </div>
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
