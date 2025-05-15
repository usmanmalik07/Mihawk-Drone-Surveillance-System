import React, { useEffect } from 'react';
import './DetectionPopup.css';
import { useDetectionAlert } from "../../pages/DetectionAlert/DetectionAlertContext";

const DetectionPopup = ({ onConfirm, onReject, verifying }) => {
  const { detection, clearDetectionAlert } = useDetectionAlert();

  useEffect(() => {
    if (!detection) return;
    
    const timer = setTimeout(() => {
      clearDetectionAlert();
    }, 30000); // 30 seconds timeout

    return () => clearTimeout(timer);
  }, [detection, clearDetectionAlert]);

  if (!detection) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Threat Detected: {detection.item}</h3>
        {detection.frame && (
          <img 
            src={`data:image/jpeg;base64,${detection.frame}`} 
            alt="Detected threat" 
            className="popup-image"
          />
        )}
        <div className="detection-details">
          <p><strong>Time:</strong> {new Date(detection.timestamp).toLocaleString()}</p>
          {detection.location && (
            <p>
              <strong>Location:</strong> 
              {detection.location.lat.toFixed(4)}, {detection.location.lon.toFixed(4)}
            </p>
          )}
        </div>
        <div className="popup-actions">
          <button
            className="confirm-btn"
            onClick={() => {
              onConfirm();
              clearDetectionAlert();
            }}
            disabled={verifying}
          >
            {verifying ? "Verifying..." : "Confirm Threat"}
          </button>
          <button
            className="reject-btn"
            onClick={() => {
              onReject();
              clearDetectionAlert();
            }}
            disabled={verifying}
          >
            {verifying ? "Verifying..." : "False Alarm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetectionPopup;