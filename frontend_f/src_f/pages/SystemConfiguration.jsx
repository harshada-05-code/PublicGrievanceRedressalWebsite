import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Clock, BellRing, Settings as SettingsIcon, AlertTriangle, ShieldAlert } from 'lucide-react';
import './DashboardUI.css';

const SystemConfiguration = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    departments: ['Roads & Infrastructure', 'Water Supply', 'Waste Management', 'Electricity Board'],
    sla: { potholes: 3, water: 5, electricity: 2, waste: 4 },
    notifications: { email: true, sms: false },
    maintenanceMode: false
  });

  const [newDept, setNewDept] = useState('');

  // Audit Logs Mock Data
  const [logs] = useState([
    { id: 1, action: "Admin enabled SMS Notifications globally.", time: "10 mins ago" },
    { id: 2, action: "Admin added 'Electricity Board' to departments.", time: "2 hours ago" },
    { id: 3, action: "Admin changed SLA for 'potholes' from 5 to 3 days.", time: "1 day ago" }
  ]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('systemSettings');
      if(stored) setSettings(JSON.parse(stored));
    } catch {}
  }, []);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('systemSettings', JSON.stringify(newSettings));
  };

  const handleAddDept = () => {
    if(!newDept) return;
    saveSettings({ ...settings, departments: [...settings.departments, newDept] });
    setNewDept('');
  };

  const handleRemoveDept = (dept) => {
    saveSettings({ ...settings, departments: settings.departments.filter(d => d !== dept) });
  };

  const updateSla = (key, val) => {
    saveSettings({ ...settings, sla: { ...settings.sla, [key]: Number(val) } });
  };

  const toggleNotification = (type) => {
    saveSettings({ ...settings, notifications: { ...settings.notifications, [type]: !settings.notifications[type] } });
  };

  const toggleMaintenance = () => {
    const isMaintenance = !settings.maintenanceMode;
    if(isMaintenance) {
      if(!window.confirm("WARNING: Enabling Maintenance Mode will take the citizen portal offline! Proceed?")) return;
    }
    saveSettings({ ...settings, maintenanceMode: isMaintenance });
  };

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
        </div>
      </header>

      <main className="cl-main-content">
        <div className="cl-welcome-section flex-spread" style={{alignItems: 'center'}}>
          <div>
            <h1 className="cl-welcome-title" style={{fontSize: '2rem'}}>System Configuration</h1>
            <p className="cl-welcome-subtitle">Adjust core rules, departments, service levels, and visibility status.</p>
          </div>
          
          {/* Big Red Button */}
          <button 
            onClick={toggleMaintenance}
            className={`btn-solid cl-maintenance-btn ${settings.maintenanceMode ? 'active' : ''}`}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '1rem 2rem',
              backgroundColor: settings.maintenanceMode ? '#b91c1c' : '#f9fafb',
              color: settings.maintenanceMode ? 'white' : '#b91c1c',
              border: '2px solid #b91c1c', borderRadius: '8px', cursor: 'pointer', fontWeight: 800,
              boxShadow: settings.maintenanceMode ? '0 0 15px rgba(185,28,28,0.5)' : 'none'
            }}
          >
            <AlertTriangle size={24} />
            {settings.maintenanceMode ? "SYSTEM IS OFFLINE (MAINTENANCE)" : "TAKE SYSTEM OFFLINE"}
          </button>
        </div>

        <div className="charts-grid" style={{gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem'}}>
          
          {/* Departments */}
          <div className="chart-card">
            <h3 className="chart-title" style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><Building size={18} color="#0d5c2c" /> Department Management</h3>
            <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1rem'}}>
              <input type="text" className="cl-search-input" value={newDept} onChange={e => setNewDept(e.target.value)} placeholder="New Department Name" style={{background: '#f9fafb', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius:'6px', flex: 1}}/>
              <button className="btn-solid green" onClick={handleAddDept}>Add</button>
            </div>
            <ul style={{listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto'}}>
              {settings.departments.map(dept => (
                <li key={dept} style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid #eee', alignItems: 'center'}}>
                  <span>{dept}</span>
                  <button onClick={() => handleRemoveDept(dept)} style={{background: 'none', color: '#ef4444', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600}}>Remove</button>
                </li>
              ))}
            </ul>
          </div>

          {/* SLA Targets */}
          <div className="chart-card">
            <h3 className="chart-title" style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><Clock size={18} color="#0d5c2c" /> SLA Target Days</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
               {Object.entries(settings.sla).map(([key, val]) => (
                 <div key={key} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: '#f9fafb', borderRadius: '6px', border: '1px solid #eee'}}>
                   <span style={{textTransform: 'capitalize', fontWeight: 500}}>{key} Default SLA:</span>
                   <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <input type="number" min="1" max="60" value={val} onChange={(e) => updateSla(key, e.target.value)} style={{width: '60px', padding: '0.3rem', borderRadius: '4px', border: '1px solid #ccc', textAlign: 'center'}} />
                      <span style={{color: '#666', fontSize: '0.85rem'}}>Days</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="chart-card">
            <h3 className="chart-title" style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><BellRing size={18} color="#0d5c2c" /> Notification Toggles</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '6px', border: '1px solid #eee'}}>
                <div>
                  <h4 style={{margin: 0}}>Global Email Alerts</h4>
                  <p style={{margin: 0, fontSize: '0.8rem', color: '#666'}}>Automated emails on complaint stage changes.</p>
                </div>
                <label className="cl-toggle-switch">
                  <input type="checkbox" checked={settings.notifications.email} onChange={() => toggleNotification('email')} />
                  <span className="cl-slider round"></span>
                </label>
              </div>

              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '6px', border: '1px solid #eee'}}>
                <div>
                  <h4 style={{margin: 0}}>Global SMS Alerts</h4>
                  <p style={{margin: 0, fontSize: '0.8rem', color: '#666'}}>Automated SMS text messages to citizens.</p>
                </div>
                <label className="cl-toggle-switch">
                  <input type="checkbox" checked={settings.notifications.sms} onChange={() => toggleNotification('sms')} />
                  <span className="cl-slider round"></span>
                </label>
              </div>

            </div>
          </div>

          {/* Audit Logs */}
          <div className="chart-card">
            <h3 className="chart-title" style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><ShieldAlert size={18} color="#0d5c2c" /> Secure Audit Logs</h3>
            <ul className="cl-activity-log">
              {logs.map(log => (
                <li key={log.id} style={{padding: '0.75rem', background: '#f9fafb', marginBottom: '0.5rem', borderRadius: '6px', borderLeft: '3px solid #6b7280'}}>
                  <span className="log-action" style={{display: 'block', marginBottom: '0.2rem'}}>{log.action}</span>
                  <span className="log-time" style={{fontSize: '0.75rem'}}>{log.time}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SystemConfiguration;
