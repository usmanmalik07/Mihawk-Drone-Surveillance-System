import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThreatMap from '../../components/Map/ThreatMap';
import './ThreatDetail.css';

const ThreatDetail = () => {
  const { threatId } = useParams();
  const navigate = useNavigate();
  const [threat, setThreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreat = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:8003/get_threat/${threatId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data) {
          throw new Error('No threat data received');
        }
        
        setThreat(data);
      } catch (error) {
        console.error('Error fetching threat details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchThreat();
  }, [threatId]);

  if (loading) return <div className="loading">Loading threat details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!threat) return <div className="not-found">Threat not found</div>;

  return (
    <div className="threat-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Threats
      </button>
      
      <div className="threat-content">
        <div className="threat-image-container">
          {threat.frame ? (
            <img 
              src={`data:image/jpeg;base64,${threat.frame}`} 
              alt={`Detected ${threat.item}`}
              className="threat-image"
            />
          ) : (
            <div className="no-image">No image available</div>
          )}
        </div>
        
        <div className="threat-info">
          <h2>{threat.item?.toUpperCase() || 'UNKNOWN ITEM'}</h2>
          
          <div className="info-section">
            <h3>Detection Details</h3>
            <p><strong>Time:</strong> {threat.timestamp ? new Date(threat.timestamp).toLocaleString() : 'Unknown'}</p>
            {threat.verified_by && (
              <p><strong>Verified by:</strong> {threat.verified_by}</p>
            )}
            {threat.verified_at && (
              <p><strong>Verified at:</strong> {new Date(threat.verified_at).toLocaleString()}</p>
            )}
          </div>
          
          {threat.location && (
            <div className="map-section">
              <h3>Location</h3>
              <p>Coordinates: {threat.location.lat?.toFixed(6)}, {threat.location.lon?.toFixed(6)}</p>
              <div className="map-container">
                <ThreatMap location={threat.location} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreatDetail;