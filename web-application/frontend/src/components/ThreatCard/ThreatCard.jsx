import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThreatCard.css';

const ThreatCard = ({ threat, onClick }) => {
  const navigate = useNavigate();
  
  // Default to verified if the field doesn't exist
  const isVerified = threat.verified !== false;

  const handleClick = () => {
  onClick ? onClick() : navigate(`/threats/${threat._id}`);
};

  return (
    <div 
      className={`threat-card ${isVerified ? 'verified' : 'unverified'}`}
      onClick={handleClick}
    >
      <div className="threat-image-container">
        {threat.frame && (
          <img 
            src={`data:image/jpeg;base64,${threat.frame}`} 
            alt="Detected threat" 
            className="threat-image"
          />
        )}
        <div className="threat-status">
          {isVerified ? 'Verified' : 'Unverified'}
        </div>
      </div>
      <div className="threat-info">
        <h3 className="threat-item">{threat.item}</h3>
        <p className="threat-time">
          {new Date(threat.timestamp).toLocaleString()}
        </p>
        {isVerified && threat.verified_by && (
          <p className="verified-by">
            Verified by: {threat.verified_by}
          </p>
        )}
      </div>
    </div>
  );
};

export default ThreatCard;