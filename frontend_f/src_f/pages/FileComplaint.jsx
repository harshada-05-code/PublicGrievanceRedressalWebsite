import React, { useState, useEffect } from 'react';
import { User, Plus, Home, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/apiConfig';
import './DashboardUI.css';

const FileComplaint = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    category: 'Roads',
    address: '',
    pincode: '',
    description: ''
  });
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userInfo') || 'null');
    setUserInfo(data || { name: 'John Doe', email: 'name@example.com', number: '+91 98765 43210' });
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024;
      
      if (!isValidType) alert(`${file.name} is not a valid file type. Please upload images or PDFs.`);
      if (!isValidSize) alert(`${file.name} is too large. Maximum size is 5MB.`);
      
      return isValidType && isValidSize;
    });
    
    if (validFiles.length + attachedFiles.length > 3) {
      alert('Maximum 3 files allowed');
      return;
    }
    
    setAttachedFiles([...attachedFiles, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userData = JSON.parse(localStorage.getItem('userInfo') || 'null');
      const token = userData?.token;

      if (!token) {
        alert('Authentication failed. Please login again.');
        navigate('/login');
        return;
      }

      const submitData = new FormData();
      submitData.append('title', formData.description.length > 50 ? formData.description.substring(0, 50) + '...' : formData.description);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('address', formData.address);
      
      attachedFiles.forEach(file => {
        submitData.append('images', file);
      });

      const response = await fetch(API_ENDPOINTS.CREATE_GRIEVANCE, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to submit complaint');
        console.error('Backend error:', data);
        return;
      }

      const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      const trackingId = 'CP-' + (data.data?.id || Date.now().toString().slice(-6));
      const newComplaint = {
        id: trackingId,
        subject: formData.description.length > 50 ? formData.description.substring(0, 50) + '...' : formData.description,
        fullDescription: formData.description,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        dept: formData.category,
        status: 'Pending',
        address: formData.address,
        pincode: formData.pincode,
        description: formData.description,
        userId: userInfo?._id || 'user',
        filedAt: new Date().toISOString(),
        backendId: data.data?.id
      };
      complaints.push(newComplaint);
      localStorage.setItem('complaints', JSON.stringify(complaints));
      
      alert('Complaint Submitted successfully! Tracking ID: ' + trackingId);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Connection error. Please make sure the backend server is running.');
    }
  };

  return (
    <div className="dashboard-container" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      {/* Header */}
      <header className="dash-header">
        <div className="logo-container cursor-pointer" onClick={() => navigate('/dashboard')}>
          <span className="logo-badge">CL</span>
          <span style={{fontWeight: 700}}>CivicLink Portal</span>
        </div>
        <div className="header-actions">
          <Home 
            size={26} 
            color="#4b5563" 
            style={{cursor: 'pointer', transition: 'color 0.2s'}} 
            onClick={() => navigate('/dashboard')} 
            onMouseOver={(e) => e.currentTarget.style.color = '#0d5c2c'}
            onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
          />
        </div>
      </header>

      {/* Main Content */}
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
                    <option value="Roads">Roads</option>
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Waste">Waste</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Address & Pincode Row */}
                <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem'}}>
                  <div className="form-group" style={{marginBottom: 0}}>
                    <label className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Incident Address / Location</label>
                    <div className="input-container" style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                      <MapPin style={{position: 'absolute', left: '1rem', color: '#64748b'}} size={18} />
                      <input 
                        type="text" 
                        placeholder="Area, Street number, Landmark" 
                        className="auth-input"
                        style={{width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem', border: '1px solid #e2e8f0', borderRadius: '6px'}}
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{marginBottom: 0}}>
                    <label className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Pincode</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 110001" 
                      className="auth-input"
                      style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '6px'}}
                      value={formData.pincode}
                      onChange={e => setFormData({...formData, pincode: e.target.value})}
                      required
                    />
                  </div>
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

              {/* Hidden File Input */}
              <input 
                ref={fileInputRef}
                type="file" 
                multiple 
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                style={{display: 'none'}}
              />

              {/* Attach Button */}
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  backgroundColor: '#dcfce3', color: '#0d5c2c', border: '1px solid #0d5c2c',
                  padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '500', 
                  cursor: 'pointer', marginBottom: '1.5rem'
                }}
              >
                Attach Documents/Images <Plus size={16} />
              </button>

              {/* Display Attached Files */}
              {attachedFiles.length > 0 && (
                <div style={{
                  backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '6px',
                  padding: '1rem', marginBottom: '1.5rem'
                }}>
                  <p style={{fontWeight: '600', marginBottom: '0.5rem', color: '#0d5c2c'}}>
                    Attached Files ({attachedFiles.length}/3)
                  </p>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                    {attachedFiles.map((file, idx) => (
                      <li key={idx} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '0.5rem', backgroundColor: 'white', marginBottom: '0.5rem',
                        borderRadius: '4px', fontSize: '0.9rem'
                      }}>
                        <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        <button 
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          style={{
                            backgroundColor: '#fca5a5', color: '#991b1b', border: 'none',
                            padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer',
                            fontSize: '0.85rem', fontWeight: '500'
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
      <footer style={{position: 'relative', backgroundColor: '#0d5c2c', color: 'white', textAlign: 'center', padding: '2rem'}}>
        <h2 style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'}}>
          Your Voice, Our Priority
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#a7f3d0" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute', right: '5%', bottom:'2rem'}}>
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
          </svg>
        </h2>
      </footer>
    </div>
  );
};

export default FileComplaint;
