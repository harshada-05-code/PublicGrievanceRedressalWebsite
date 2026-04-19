import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, UserCheck, UserX, Key, Shield } from 'lucide-react';
import './DashboardUI.css';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New Officer Form State
  const [newOfficerForm, setNewOfficerForm] = useState({ name: '', email: '', number: '', password: '' });

  // Load from Local Storage on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    try {
      const data = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      // Ensure everyone has an isActive flag initialized if missing
      const formatted = data.map(u => ({ ...u, isActive: u.isActive !== false }));
      setUsers(formatted);
    } catch {
      setUsers([]);
    }
  };

  const saveUsers = (updatedUsers) => {
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const resetPassword = (userId) => {
    if(window.confirm("Are you sure you want to reset this user's password?")) {
      const updated = users.map(u => {
        if(u._id === userId) return { ...u, password: 'TempPassword123!' };
        return u;
      });
      saveUsers(updated);
      alert("Password successfully reset to: TempPassword123!");
    }
  };

  const toggleStatus = (userId) => {
    const updated = users.map(u => {
      if(u._id === userId) return { ...u, isActive: !u.isActive };
      return u;
    });
    saveUsers(updated);
  };

  const changeRole = (userId, newRole) => {
    const updated = users.map(u => {
      if(u._id === userId) return { ...u, role: newRole };
      return u;
    });
    saveUsers(updated);
  };

  const handleCreateOfficer = (e) => {
    e.preventDefault();
    if(!newOfficerForm.name || !newOfficerForm.password) return alert("Fill required fields");
    
    const isDuplicate = users.some(u => u.number === newOfficerForm.number || u.email === newOfficerForm.email);
    if(isDuplicate) return alert("Email or Phone number is already registered in the system.");

    const newOfficer = {
      _id: Date.now().toString(),
      name: newOfficerForm.name,
      email: newOfficerForm.email,
      number: newOfficerForm.number,
      password: newOfficerForm.password,
      role: 'department_officer',
      isActive: true
    };
    
    saveUsers([...users, newOfficer]);
    setNewOfficerForm({ name: '', email: '', number: '', password: '' });
    alert("New Officer Registered Successfully!");
  };

  const filteredUsers = users.filter(u => 
    (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (u.role && u.role.toLowerCase().includes(searchTerm.toLowerCase()))
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
        </div>
      </header>

      <main className="cl-main-content">
        <div className="cl-welcome-section">
          <h1 className="cl-welcome-title" style={{fontSize: '2rem'}}>People Manager</h1>
          <p className="cl-welcome-subtitle">Control system access, promote users, and securely reset credentials.</p>
        </div>

        <div className="charts-grid" style={{gridTemplateColumns: '300px 1fr', gap: '1.5rem', alignItems: 'start'}}>
          
          {/* Add Officer Form (Left Column) */}
          <div className="chart-card">
            <h3 className="chart-title" style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Add New Officer</h3>
            <form onSubmit={handleCreateOfficer} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div>
                <label className="form-label">Full Name</label>
                <input required type="text" className="cl-search-input" style={{width: '100%', background: '#f9fafb', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius:'6px'}} 
                  value={newOfficerForm.name} onChange={e => setNewOfficerForm({...newOfficerForm, name: e.target.value})} 
                />
              </div>
              <div>
                <label className="form-label">Email (Optional)</label>
                <input type="email" className="cl-search-input" style={{width: '100%', background: '#f9fafb', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius:'6px'}} 
                  value={newOfficerForm.email} onChange={e => setNewOfficerForm({...newOfficerForm, email: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input required type="tel" className="cl-search-input" style={{width: '100%', background: '#f9fafb', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius:'6px'}} 
                  value={newOfficerForm.number} onChange={e => setNewOfficerForm({...newOfficerForm, number: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Initial Password</label>
                <input required type="password" className="cl-search-input" style={{width: '100%', background: '#f9fafb', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius:'6px'}} 
                  value={newOfficerForm.password} onChange={e => setNewOfficerForm({...newOfficerForm, password: e.target.value})}
                />
              </div>
              <button type="submit" className="btn-solid green" style={{marginTop: '0.5rem'}}><Shield size={16} style={{display:'inline', marginBottom:'-3px', marginRight:'4px'}}/> Onboard Officer</button>
            </form>
          </div>

          {/* User Table (Right Column) */}
          <div className="cl-data-section" style={{marginBottom: 0}}>
            <div className="cl-table-container">
              <div style={{padding: '1rem', borderBottom: '1px solid #f3f4f6', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3 style={{margin: 0, fontWeight: 600}}>System Users</h3>
                <div className="cl-search-container" style={{width: '250px'}}>
                  <Search size={18} className="search-icon" />
                  <input type="text" placeholder="Search by name or role..." className="cl-search-input" 
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <table className="cl-table">
                <thead>
                  <tr>
                    <th>User / Contact</th>
                    <th>System Role</th>
                    <th>Status</th>
                    <th>Security Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr><td colSpan="4" style={{textAlign:'center', color: '#666', padding: '2rem'}}>No users found.</td></tr>
                  ) : null}
                  
                  {filteredUsers.map(user => (
                    <tr key={user._id} style={{ opacity: user.isActive ? 1 : 0.6 }}>
                      <td>
                        <strong style={{display: 'block'}}>{user.name}</strong>
                        <span style={{fontSize: '0.8rem', color: '#666'}}>{user.email || user.number}</span>
                      </td>
                      <td>
                        <select 
                          className="filter-select" 
                          value={user.role} 
                          onChange={(e) => changeRole(user._id, e.target.value)}
                          disabled={user.role === 'admin'}
                          style={{padding: '0.2rem', fontSize: '0.85rem'}}
                        >
                          <option value="citizen">Citizen</option>
                          <option value="department_officer">Officer</option>
                          {user.role === 'admin' && <option value="admin">Admin</option>}
                        </select>
                      </td>
                      <td>
                        <button 
                          onClick={() => toggleStatus(user._id)}
                          style={{
                               background: user.isActive ? '#dcfce3' : '#fee2e2', 
                               color: user.isActive ? '#15803d' : '#b91c1c',
                               border: `1px solid ${user.isActive ? '#86efac' : '#fca5a5'}`,
                               padding: '0.25rem 0.5rem',
                               borderRadius: '4px',
                               cursor: 'pointer',
                               display: 'flex',
                               alignItems: 'center',
                               gap: '0.3rem',
                               fontSize: '0.8rem',
                               fontWeight: 600
                          }}
                        >
                          {user.isActive ? <UserCheck size={14} /> : <UserX size={14} />}
                          {user.isActive ? 'Active' : 'Deactivated'}
                        </button>
                      </td>
                      <td>
                        <button 
                           onClick={() => resetPassword(user._id)}
                           className="icon-btn" 
                           style={{padding: '0.3rem 0.6rem', fontSize: '0.8rem'}}
                        >
                          <Key size={14} /> Reset Pass
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
