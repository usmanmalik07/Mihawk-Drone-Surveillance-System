import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar/NavBar.jsx';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  
  return (
    <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard/admin" element={<Dashboard userType="admin" />} />
      <Route path="/dashboard/manager" element={<Dashboard userType="manager" />} />
      <Route path="/dashboard/viewer" element={<Dashboard userType="viewer" />} />
    </Routes>
  </Router>
  );
}

export default App