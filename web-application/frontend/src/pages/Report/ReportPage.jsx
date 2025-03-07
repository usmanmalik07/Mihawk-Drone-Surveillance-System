import React, { useState, useEffect } from "react";
import "./ReportPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";

function ReportPage() {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    const fetchDetections = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_detections");
        const data = await response.json();
        setDetections(data.detections);
      } catch (error) {
        console.error("Error fetching detections:", error);
      }
    };
    fetchDetections();
  }, []);

  return (
    <div className="main">
    <div className="Side"><Sidebar /></div>
    <div className="report-page-container">
      

      {/* Main Report Content */}
      <div className="report-content">
        <h1 className="report-title">Detection Report</h1>
        <div className="detections-container">
          {detections.length > 0 ? (
            <table className="detections-table">
              <thead>
                <tr>
                  <th>Object Detected</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {detections.map((detection, index) => {
                  const dateTime = new Date(detection.timestamp);
                  return (
                    <tr key={index}>
                      <td>{detection.item || "Unknown"}</td>
                      <td>{dateTime.toLocaleTimeString()}</td>
                      <td>{dateTime.toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="no-detections">No detections available.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default ReportPage;
