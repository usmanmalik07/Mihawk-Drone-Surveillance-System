import React, { useState, useEffect, useRef } from 'react';
import './AdminDashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Chatbot';
import NoStreamImage from '../../assets/stream.png';
import { FaUser, FaVideo, FaCog } from 'react-icons/fa';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import DetectionPopup from '../../components/DetectionPopup/DetectionPopup';
import { useDetectionAlert } from '../DetectionAlert/DetectionAlertContext';
import alertSound from '../../assets/alert.mp3';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedModel, setSelectedModel] = useState("trained");
  const [videoError, setVideoError] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(35);
  const [ramUsage, setRamUsage] = useState(58);
  const [verifying, setVerifying] = useState(false);
  const chartRef = useRef(null);
  const audioPlayer = useRef(null);
  const { detection, showDetectionAlert, clearDetectionAlert } = useDetectionAlert();

  // Initialize audio player
  useEffect(() => {
    audioPlayer.current = new Audio(alertSound);
    audioPlayer.current.volume = 0.3;
  }, []);

  // WebSocket connection with reconnect
  useEffect(() => {
    let ws;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const reconnectDelay = 3000;

    const connect = () => {
      ws = new WebSocket("ws://localhost:8003/ws/detections");

      ws.onopen = () => {
        console.log("WebSocket connected");
        reconnectAttempts = 0;
        // Start ping-pong
        const pingInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send("ping");
          }
        }, 20000);
      };

      ws.onmessage = (event) => {
        if (event.data === "pong") return;
        
        try {
          const detectionData = JSON.parse(event.data);
          console.log("Detection received:", detectionData);
          
          audioPlayer.current.play().catch(e => console.log("Audio play prevented:", e));
          
          navigator.geolocation.getCurrentPosition(
            (position) => {
              showDetectionAlert({
                ...detectionData,
                location: {
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
                },
              });
            },
            (error) => {
              console.warn("Location access denied:", error);
              showDetectionAlert(detectionData);
            }
          );
        } catch (error) {
          console.error("Error processing detection:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        if (reconnectAttempts < maxReconnectAttempts) {
          setTimeout(connect, reconnectDelay);
          reconnectAttempts++;
        }
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
    };
  }, [showDetectionAlert]);
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setVideoError(false);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    setVideoError(false);
  };

  const getVideoFeedSrc = () => {
    if (!isPlaying || videoError) return NoStreamImage;
    switch (selectedModel) {
      case "v8n": return "http://10.113.84.79:8003/video_feed?model=yolov8n";
      case "v11": return "http://10.113.84.79:8003/video_feed?model=yolov8s";
      case "cv": return "http://10.113.84.79:8003/video_feed?model=yolov5";
      case "trained": return "http://10.113.84.79:8003/video_feed?model=trained";
      default: return NoStreamImage;
    }
  };

  const handleVerify = async (isReal) => {
  setVerifying(true);
  try {
    // 1. Create FormData object
    const formData = new FormData();
    formData.append('user_email', 'admin@example.com'); // Replace with actual user email
    formData.append('is_real', isReal.toString()); // Convert boolean to string

    // 2. Make the request
    const response = await fetch(
      `http://localhost:8003/verify_threat/${detection._id}`,
      {
        method: "POST",
        body: formData
        // Don't set Content-Type header - browser will set it automatically
        // with the correct boundary for FormData
      }
    );

    // 3. Handle response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Verification failed");
    }

    // 4. Clear the alert on success
    clearDetectionAlert();
    
    // Optional: Refresh threats list
    // fetchThreats(); 

  } catch (err) {
    console.error("Verification error:", err.message);
    // Optional: Show error to user
    // setError(err.message); 
  } finally {
    setVerifying(false);
  }
};

  // System metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 50) + 30);
      setRamUsage(Math.floor(Math.random() * 40) + 50);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Chart initialization
  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current.getContext("2d"), {
        type: "bar",
        data: {
          labels: ["CPU Usage", "RAM Usage"],
          datasets: [
            {
              label: "CPU (%)",
              data: [cpuUsage, 0],
              backgroundColor: "#e63946",
              borderColor: "#b71c1c",
              borderWidth: 1,
            },
            {
              label: "RAM (%)",
              data: [0, ramUsage],
              backgroundColor: "#4caf50",
              borderColor: "#388e3c",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true, max: 100 } },
          plugins: { legend: { display: true, position: "top" } },
        },
      });
      return () => chart.destroy();
    }
  }, [cpuUsage, ramUsage]);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <h2 className="heading">Admin Dashboard</h2>

      <div className="dashboard-container">
        <div className="top-section">
          <div className="video-section">
            <h3>Live Video Feed</h3>
            <div className="video-controls">
              <button className={`play-stop-button ${isPlaying ? "stop" : "play"}`} onClick={togglePlay}>
                {isPlaying ? "Stop" : "Play"}
              </button>
              <select className="model-dropdown" value={selectedModel} onChange={handleModelChange}>
                <option value="trained">Trained Model</option>
                <option value="v8n">YOLOv8n</option>
                <option value="v11">YOLOv8s</option>
                <option value="cv">YOLOv5</option>
              </select>
            </div>
            <div className="video-player">
              <img src={getVideoFeedSrc()} alt={isPlaying ? "Live Stream" : "No Stream"} />
              {videoError && <p className="error-message">Error loading stream</p>}
            </div>
          </div>

          <div className="system-performance">
            <h3>System Performance</h3>
            <div className="chart-container">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Detection Popup positioned between top-section and stats */}
        <div className="popup-container">
          {detection && (
            <DetectionPopup 
              detection={detection}
              onConfirm={() => handleVerify(true)}
              onReject={() => handleVerify(false)}
              verifying={verifying}
            />
          )}
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <FaUser className="stat-icon" />
            <h3>Users</h3>
            <p>125 Active</p>
          </div>
          <div className="stat-card">
            <FaVideo className="stat-icon" />
            <h3>Active Streams</h3>
            <p>{isPlaying ? "1 Live" : "No Active Stream"}</p>
          </div>
          <div className="stat-card">
            <FaCog className="stat-icon" />
            <h3>Models</h3>
            <p>YOLOv8 & YOLOv5</p>
          </div>
        </div>
      </div>

      <Chatbot />
      <Footer />
    </div>
  );
};

export default AdminDashboard;