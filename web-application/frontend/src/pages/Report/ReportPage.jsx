import React, { useState, useEffect } from "react";
import "./ReportPage.css"; // You can style the Report page here

function ReportPage() {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    // Fetch detection data from FastAPI
    const fetchDetections = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_detections");
        const data = await response.json(); // Assuming FastAPI returns JSON
        setDetections(data.detections); // Store detections
      } catch (error) {
        console.error("Error fetching detections:", error);
      }
    };

    fetchDetections();
  }, []);

  return (
    <div className="report-page">
      <h1 className="report-title">Detection Report</h1>

      {/* Scrollable container for detections */}
      <div className="detections-container">
        {detections.length > 0 ? (
          detections.map((detection, index) => (
            <div key={index} className="detection-item">
              <span className="detection-name">{detection.item}</span>
              <span className="detection-time">{detection.timestamp}</span>
            </div>
          ))
        ) : (
          <p>No detections available.</p>
        )}
      </div>
    </div>
  );
}

export default ReportPage;
