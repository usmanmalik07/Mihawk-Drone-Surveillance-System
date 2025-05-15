import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreatCard from '../../components/ThreatCard/ThreatCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import './AllThreatsView.css';

const AllThreatsView = () => {
  const navigate = useNavigate();
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalThreats, setTotalThreats] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const limit = 12;

  useEffect(() => {
  const fetchThreats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `http://localhost:8003/get_all_threats?limit=${limit}&skip=${(page-1)*limit}`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || 
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      
      if (!Array.isArray(data?.threats)) {
        throw new Error("Invalid data format received from server");
      }

      setThreats(data.threats);
      setTotalThreats(data.total || 0);

    } catch (err) {
      console.error('Failed to load threats:', err);
      setError(err.message);
      
      // For debugging - remove in production
      const debugResponse = await fetch('http://localhost:8003/get_all_threats');
      console.log('Debug response:', await debugResponse.json());
      
    } finally {
      setLoading(false);
    }
  };

  fetchThreats();
}, [page]);
  const totalPages = Math.ceil(totalThreats / limit) || 1;

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="threats-view">
        <h2 className="dashboard-heading">Security Threat Reports</h2>
        
        <div className="threats-header">
          <div className="stats-card">
            <h3>Total Verified Threats</h3>
            <p className="stat-value">{totalThreats}</p>
          </div>
          
          <div className="pagination-controls">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading || totalThreats === 0}
            >
              Next
            </button>
          </div>
        </div>

        {error ? (
          <div className="error-message">
            Error loading reports: {error}
          </div>
        ) : loading ? (
          <div className="loading-spinner">
            Loading threat reports...
          </div>
        ) : threats.length === 0 ? (
          <div className="no-threats">
            No verified threats found. Detected threats will appear here after verification.
          </div>
        ) : (
          <div className="threats-grid">
            {threats.map(threat => (
              <ThreatCard 
                key={threat._id} 
                threat={threat}
                onClick={() => navigate(`/threats/${threat._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllThreatsView;