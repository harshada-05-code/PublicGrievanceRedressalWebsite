import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Paperclip, MessageSquare, MapPin, CheckCircle, ChevronDown } from 'lucide-react';
import './DashboardUI.css';

import { API_ENDPOINTS } from '../config/apiConfig';

const OfficerCases = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [activeCase, setActiveCase] = useState(null);
  const [newComment, setNewComment] = useState('');

  const fetchCases = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userInfo') || 'null');
      const token = userData?.token;
      if (!token) return;

      const res = await fetch(API_ENDPOINTS.GET_MY_GRIEVANCES, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCases(data.data || []);
        if (activeCase) {
          const refreshedActive = data.data.find(c => c.id === activeCase.id);
          setActiveCase(refreshedActive || null);
        }
      }
    } catch (err) {
      console.error('Error fetching officer cases:', err);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const updateStatus = async (newStatus, commentOverride = null) => {
    if(!activeCase) return;
    try {
      const userData = JSON.parse(localStorage.getItem('userInfo') || 'null');
      const token = userData?.token;
      
      const res = await fetch(`${API_ENDPOINTS.CREATE_GRIEVANCE}/${activeCase.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          status: newStatus, 
          remarks: commentOverride || `Status updated to ${newStatus}` 
        })
      });
      
      if (res.ok) {
        fetchCases();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const addComment = () => {
    if(!newComment.trim() || !activeCase) return;
    updateStatus(activeCase.status, newComment);
    setNewComment('');
  };

  const markResolved = () => {
    updateStatus('Resolved', 'Case formally resolved by officer.');
    alert(`Case ${activeCase.id} explicitly marked as Resolved! Citizen will be notified.`);
  };

  const filteredCases = cases.filter(c => 
    c.id.toString().includes(searchTerm) || c.category.toLowerCase().includes(searchTerm.toLowerCase()) || c.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-portal-container" style={{backgroundColor: '#f3f4f6'}}>
      {/* Universal Header */}
      <header className="cl-header">
        <div className="cl-logo-container">
          <div className="cl-logo-badge">CL</div>
          <span className="cl-logo-text">Civic Link Portal</span>
        </div>
        <div className="cl-header-actions">
           <button className="btn-solid dark" onClick={() => navigate('/dashboard')} style={{display: 'flex', gap: '0.4rem', alignItems: 'center'}}>
             <ArrowLeft size={16} /> Return to Dashboard
           </button>
           <div className="cl-profile-dropdown" onClick={handleSignOut} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#b91c1c', fontWeight: 600}}>
             Sign Out <ChevronDown size={14} />
           </div>
        </div>
      </header>

      <main className="cl-main-content">
        <div className="cl-welcome-section flex-spread" style={{alignItems: 'center'}}>
          <div>
            <h1 className="cl-welcome-title" style={{fontSize: '2rem'}}>Digital Workflow</h1>
            <p className="cl-welcome-subtitle">Review details, append official case notes, and manage operational statuses.</p>
          </div>
          <div className="cl-search-container" style={{width: '300px'}}>
             <Search size={18} className="search-icon" />
             <input type="text" placeholder="Search ID, Location or Type..." className="cl-search-input" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        {/* Data Table Area */}
        <div className="cl-data-section">
          <div className="cl-table-container">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Category</th>
                  <th>Date Logged</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Current Status</th>
                  <th>Investigate</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map(c => (
                  <tr key={c.id}>
                    <td><strong>CP-{c.id}</strong></td>
                    <td>{c.category}</td>
                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td><MapPin size={14} style={{display:'inline', color:'#666', marginRight:'4px'}}/> {c.address}</td>
                    <td>
                       <span className="cl-badge cl-badge-medium">
                         Standard
                       </span>
                    </td>
                    <td><span style={{fontWeight: 600, color: c.status === 'Resolved' ? '#15803d' : c.status === 'In Progress' ? '#d97706' : '#1d4ed8'}}>{c.status}</span></td>
                    <td>
                      <button onClick={() => setActiveCase(c)} className="btn-solid green" style={{padding: '0.4rem 0.8rem', fontSize: '0.85rem'}}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCases.length === 0 && <tr><td colSpan="7" style={{textAlign:'center', padding: '2rem'}}>No cases found matching '{searchTerm}'.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Interactive Case Modal Overlay */}
      {activeCase && (
        <div className="cl-modal-backdrop">
          <div className="cl-modal-card">
             
             <div className="cl-modal-header">
               <h2 style={{margin:0}}>Case Details: #{activeCase.id}</h2>
               <button className="cl-modal-close" onClick={() => setActiveCase(null)}>✕</button>
             </div>

             <div className="cl-modal-grid">
               {/* Left Column: Citizen Case Info */}
               <div className="cl-modal-col left-col">
                 <div className="info-block">
                    <span className="info-label">Category / Type</span>
                    <strong className="info-val">{activeCase.category}</strong>
                 </div>
                 <div className="info-block">
                    <span className="info-label">Reporter Name</span>
                    <strong className="info-val">{activeCase.User?.name || 'Unknown'}</strong>
                 </div>
                 <div className="info-block">
                    <span className="info-label">Location Data</span>
                    <p className="info-val" style={{color:'#666'}}><MapPin size={14} style={{display:'inline'}}/> {activeCase.address}</p>
                 </div>
                 <div className="info-block" style={{marginTop: '1rem'}}>
                    <span className="info-label">Citizen Complaint Description</span>
                    <p className="info-box-text">{activeCase.description}</p>
                 </div>

                 {/* Mock Image Box */}
                 <div className="info-block" style={{marginTop: '1.5rem'}}>
                    <span className="info-label" style={{display:'flex', alignItems:'center', gap:'0.3rem'}}><Paperclip size={16}/> Attached Evidence</span>
                    <div className="mock-image-container">
                       <span style={{color: '#9ca3af', fontSize:'0.9rem'}}>[Placeholder: Citizen Image Upload]</span>
                    </div>
                 </div>
               </div>

               {/* Right Column: Officer Workflow Operations */}
               <div className="cl-modal-col right-col">
                  
                  <div className="workflow-status-card">
                     <h3 style={{margin: '0 0 0.8rem 0', fontSize: '1rem', color:'#111'}}>Update Case Status</h3>
                     <select 
                        value={activeCase.status} 
                        onChange={(e) => updateStatus(e.target.value)}
                        className="auth-input" 
                        style={{width:'100%', padding:'0.6rem', border:'1px solid #d1d5db', borderRadius:'6px', fontWeight:600}}
                     >
                        <option value="Assigned">Assigned (Not Started)</option>
                        <option value="In Progress">In Progress (Active Work)</option>
                        <option value="Resolved">Resolved (Completed)</option>
                     </select>
                  </div>

                  <div className="workflow-comments-card" style={{marginTop: '1.5rem'}}>
                     <h3 style={{margin: '0 0 0.8rem 0', fontSize: '1rem', color:'#111', display:'flex', alignItems:'center', gap:'0.4rem'}}><MessageSquare size={16}/> Official Case Notes</h3>
                     
                     <div className="comments-thread">
                        {(!activeCase.history || activeCase.history.length === 0) ? (
                           <p style={{fontSize:'0.85rem', color:'#9ca3af', fontStyle:'italic', textAlign:'center', marginTop:'1rem'}}>No official comments added yet.</p>
                        ) : (
                           activeCase.history.map((cm, idx) => (
                             <div key={idx} className="comment-bubble">
                               <span className="comment-date">{new Date(cm.updatedAt).toLocaleDateString()}</span>
                               <p className="comment-text">{cm.remarks}</p>
                             </div>
                           ))
                        )}
                     </div>

                     <div className="add-comment-box" style={{marginTop: '1rem'}}>
                       <textarea 
                         placeholder="Type new internal comment or note..." 
                         className="auth-input"
                         style={{width:'100%', minHeight:'80px', padding:'0.6rem', border:'1px solid #d1d5db', borderRadius:'6px', resize:'vertical', fontSize:'0.9rem'}}
                         value={newComment}
                         onChange={e => setNewComment(e.target.value)}
                       ></textarea>
                       <button onClick={addComment} className="btn-solid dark" style={{width:'100%', marginTop:'0.5rem'}}>Attach Comment</button>
                     </div>
                  </div>

                  {activeCase.status !== 'Resolved' && (
                    <button onClick={markResolved} className="btn-solid green cl-big-resolve-btn" style={{marginTop: 'auto'}}>
                        <CheckCircle size={18} /> MARK AS RESOLVED
                    </button>
                  )}
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficerCases;
