import React, { useEffect, useState } from "react";
import "./ReportPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import DetectionPopup from "../../components/DetectionPopup/DetectionPopup";
import { useDetectionAlert } from "../DetectionAlert/DetectionAlertContext";

function ReportPage() {
  const [detections, setDetections] = useState({
    verified: [],
    unverified: []
  });
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const { showDetectionAlert } = useDetectionAlert();

  const fetchDetections = async () => {
    try {
      const response = await fetch("http://localhost:8003/get_detections");
      if (!response.ok) {
        throw new Error('Failed to fetch detections');
      }
      const data = await response.json();
      setDetections({
        verified: data.verified.map(d => ({
          ...d,
          timestamp: new Date(d.timestamp)
        })),
        unverified: data.unverified.map(d => ({
          ...d,
          timestamp: new Date(d.timestamp)
        }))
      });
    } catch (error) {
      console.error("Error fetching detections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetections();
    const interval = setInterval(fetchDetections, 2000);

    const ws = new WebSocket("ws://localhost:8003/ws/detections");

    ws.onmessage = (event) => {
      const detection = JSON.parse(event.data);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          showDetectionAlert({
            ...detection,
            location: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.warn("Location access denied:", error);
          showDetectionAlert(detection);
        }
      );
    };

    return () => {
      clearInterval(interval);
      ws.close();
    };
  }, [showDetectionAlert]);

  const handleVerify = async (detectionId, isReal) => {
    setVerifying(true);
    try {
      const response = await fetch(
        `http://localhost:8003/verify_threat/${detectionId}`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_real: isReal }),
        }
      );
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.detail || "Verification failed");
      }
      
      await fetchDetections(); // Refresh the list
    } catch (err) {
      console.error("Error verifying detection:", err);
      alert(`Verification failed: ${err.message}`);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) return <div className="loading">Loading detections...</div>;

  return (
    <div className="report-page-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="report-content">
        <h1 className="report-title">Detection Report</h1>
        
        <div className="detections-section">
          <h2>Verified Threats</h2>
          {detections.verified.length > 0 ? (
            <div className="detections-container">
              <table className="detections-table">
                <thead>
                  <tr>
                    <th>Object</th>
                    <th>Image</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {detections.verified.map((detection) => (
                    <tr key={`verified-${detection._id}`}>
                      <td>{detection.item}</td>
                      <td>
                        <img 
                          src={`data:image/jpeg;base64,${detection.frame}`}
                          alt="Detected threat"
                          className="detection-thumbnail"
                        />
                      </td>
                      <td>{detection.timestamp.toLocaleString()}</td>
                      <td className="verified-badge">Verified</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-detections">No verified threats found.</p>
          )}
        </div>

        <div className="detections-section">
          <h2>Pending Verification</h2>
          {detections.unverified.length > 0 ? (
            <div className="detections-container">
              <table className="detections-table">
                <thead>
                  <tr>
                    <th>Object</th>
                    <th>Image</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {detections.unverified.map((detection) => (
                    <tr key={`unverified-${detection._id}`}>
                      <td>{detection.item}</td>
                      <td>
                        <img 
                          src={`data:image/jpeg;base64,${detection.frame}`}
                          alt="Detected threat"
                          className="detection-thumbnail"
                        />
                      </td>
                      <td>{detection.timestamp.toLocaleString()}</td>
                      <td className="actions-cell">
                        <button 
                          onClick={() => handleVerify(detection._id, true)}
                          className="verify-btn real"
                          disabled={verifying}
                        >
                          {verifying ? "Processing..." : "Confirm"}
                        </button>
                        <button 
                          onClick={() => handleVerify(detection._id, false)}
                          className="verify-btn fake"
                          disabled={verifying}
                        >
                          {verifying ? "Processing..." : "False Alarm"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-detections">No threats pending verification.</p>
          )}
        </div>
      </div>
      <DetectionPopup 
        onConfirm={(detection) => handleVerify(detection._id, true)}
        onReject={(detection) => handleVerify(detection._id, false)}
        verifying={verifying}
      />
    </div>
  );
}

export default ReportPage;