import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DetectionPopup from "../../components/DetectionPopup/DetectionPopup";
import { useDetectionAlert } from "../DetectionAlert/DetectionAlertContext";

function ReportPage() {
  const [detections, setDetections] = useState([]);
  const { showDetectionAlert } = useDetectionAlert();

  useEffect(() => {
    const fetchDetections = async () => {
      try {
        const response = await fetch("http://localhost:8002/get_detections");
        const data = await response.json();
        setDetections(data.detections);
      } catch (error) {
        console.error("Error fetching detections:", error);
      }
    };

    fetchDetections();

    const socket = new WebSocket("ws://localhost:8002/ws/detections");

    socket.onmessage = (event) => {
      const newDetection = JSON.parse(event.data);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationEnhancedDetection = {
            ...newDetection,
            location: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          };
          showDetectionAlert(locationEnhancedDetection);
        },
        (error) => {
          console.warn("Location access denied or failed:", error);
          showDetectionAlert(newDetection);
        }
      );
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [showDetectionAlert]);

  const handleConfirm = async (confirmedDetection) => {
    try {
      await fetch("http://localhost:8002/save_detection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(confirmedDetection),
      });
      setDetections((prev) => [confirmedDetection, ...prev]);
    } catch (err) {
      console.error("Error saving detection:", err);
    }
  };

  const handleReject = (rejectedDetection) => {
    console.log("Rejected detection:", rejectedDetection);
    // Do not add to state; nothing else required
  };

  return (
    <div className="main">
      <DetectionPopup onConfirm={handleConfirm} onReject={handleReject} />
      <div className="Side">
        <Sidebar />
      </div>
      <div className="report-page-container">
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
