// components/DetectionPopup.jsx
import React from "react";
import "./DetectionPopup.css"; // Create CSS to style this popup
import { useDetectionAlert } from "../../pages/DetectionAlert/DetectionAlertContext"; // Adjust the import path as necessary

const DetectionPopup = ({ onConfirm, onReject }) => {
  const { detection, clearDetectionAlert } = useDetectionAlert();

  if (!detection) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>New Detection</h2>
        <p><strong>Item:</strong> {detection.item || "Unknown"}</p>
          <p><strong>Time:</strong> {new Date(detection.timestamp).toLocaleString()}</p>

          {detection.location && (
            <p>
              <strong>Location:</strong> {detection.location.lat.toFixed(4)}, {detection.location.lon.toFixed(4)}
            </p>
          )}
        <div className="popup-actions">
          <button
            className="real-btn"
            onClick={() => {
              onConfirm(detection);
              clearDetectionAlert();
            }}
          >
            Real
          </button>
          <button
            className="fake-btn"
            onClick={() => {
              onReject(detection);
              clearDetectionAlert();
            }}
          >
            Fake
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetectionPopup;
