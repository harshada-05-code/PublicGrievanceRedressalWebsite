import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; // Import the new page
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Default route to redirect to login */}
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}

const logout = () => {
  localStorage.removeItem('userInfo');
  window.location.href = '/login';
};

export default App;