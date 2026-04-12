import React, { useState, useEffect } from 'react';
import { User, Bell, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DashboardUI.css';

const FileComplaint = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    category: 'Public Works',
    description: ''
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userInfo') || 'null');
    // For preview purposes, if missing data we supply the mock screenshot defaults
    setUserInfo(data || { name: 'John Doe', email: 'name@example.com', number: '+91 98765 43210' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Complaint Submitted successfully! Tracking ID: CP-' + Date.now().toString().slice(-6));
    navigate('/dashboard');
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
          
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e5e7eb', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
          }}>
            <User size={20} color="#6b7280" />
          </div>

          <div className="profile-menu" style={{background:'#0d5c2c', color:'white', padding: '0.4rem 1rem', borderRadius:'6px', cursor:'pointer'}} 
               onClick={() => navigate('/register')}>Register</div>

          <User size={22} color="#4b5563" style={{cursor: 'pointer'}} />
          <Bell size={22} color="#4b5563" style={{cursor: 'pointer'}} />
        </div>
      </header>

      {/* Main Form Content */}
      <main className="dash-content" style={{flex: 1, paddingBottom: '4rem'}}>
        <h1 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: '800', color: '#0d5c2c', marginTop: '1rem', marginBottom: '2rem'}}>
          Grievance Services
        </h1>

        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
             <div style={{
               backgroundColor: '#0d5c2c', color: 'white', width: '50px', height: '50px', 
               borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
             }}>
               <Plus size={30} />
             </div>
             <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#111'}}>File New Complaint</h2>
          </div>

          <div style={{background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea'}}>
            <h3 style={{fontSize: '1.2rem', marginBottom: '1.5rem'}}>New Complaint Form</h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem'}}>
                
                {/* Logged in Badge */}
                {userInfo && (
                  <div style={{
                    backgroundColor: '#f5efe6', padding: '1.2rem', borderRadius: '8px', 
                    display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#111', fontSize: '1.05rem',
                    flexWrap: 'wrap'
                  }}>
                    <strong style={{fontWeight: '700'}}>Logged in as:</strong> 
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e5e7eb', 
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: '0.2rem'
                    }}>
                      <User size={14} color="#6b7280" />
                    </div>
                    <span>{userInfo.name}</span> 
                    <span style={{color: '#4b5563'}}>
                      ({userInfo.email || 'name@example.com'}, {userInfo.number})
                    </span>
                  </div>
                )}

                {/* Category */}
                <div className="form-group" style={{marginBottom: 0}}>
                  <label className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Grievance Category</label>
                  <select 
                    className="auth-input"
                    style={{width: '100%', padding: '0.8rem 1rem', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: 'white'}}
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Public Works">Public Works</option>
                    <option value="Water">Water Authority</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Waste">Waste Management</option>
                  </select>
                </div>
              </div>

              {/* Details */}
              <div className="form-group" style={{marginBottom: '1.5rem'}}>
                <label className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Grievance Details</label>
                <textarea 
                  placeholder="Description of Grievance..."
                  style={{width: '100%', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '6px', minHeight: '120px', resize: 'vertical', fontFamily: 'inherit'}}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>

              {/* Attach Button */}
              <button type="button" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: '#dcfce3', color: '#0d5c2c', border: '1px solid #0d5c2c',
                padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '500', 
                cursor: 'pointer', marginBottom: '1.5rem'
              }}>
                Attach Documents/Images <Plus size={16} />
              </button>

              {/* Submit Button */}
              <button type="submit" style={{
                display: 'block', width: '100%', backgroundColor: '#0d5c2c', color: 'white',
                border: 'none', padding: '0.9rem', borderRadius: '6px', fontSize: '1rem',
                fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s'
              }}>
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Banner */}
      <footer style={{backgroundColor: '#0d5c2c', color: 'white', textAlign: 'center', padding: '2rem'}}>
        <h2 style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'}}>
          Your Voice, Our Priority
          {/* Subtle star graphic from screenshot */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#a7f3d0" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute', right: '5%', bottom:'2rem'}}>
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
          </svg>
        </h2>
      </footer>
    </div>
  );
};

export default FileComplaint;
