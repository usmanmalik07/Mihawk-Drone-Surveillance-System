import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import Chatbot from "../../components/Chatbot/Chatbot";
import NoStreamImage from "../../assets/stream.png";
import { FaUser, FaVideo, FaCog, FaBell, FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AdminDashboardPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedModel, setSelectedModel] = useState("v8n");
  const [videoError, setVideoError] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(35); // Simulated data
  const [ramUsage, setRamUsage] = useState(58); // Simulated data

  // Profile Picture URL (Fixed)
  const pfp = "https://via.placeholder.com/50";
  const navigate = useNavigate();
  // Toggle Play/Stop
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setVideoError(false);
  };

  // Change Model
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    setVideoError(false);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  // Simulated CPU & RAM usage updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 50) + 30); // Random between 30-80%
      setRamUsage(Math.floor(Math.random() * 40) + 50); // Random between 50-90%
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/users/logout", {
        withCredentials: true, // Ensure cookies are included
      });

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Get Video Feed URL
  const getVideoFeedSrc = () => {
    if (!isPlaying || videoError) return NoStreamImage;
    switch (selectedModel) {
      case "v8n": return "http://192.168.56.1:8001/video_feed?model=yolov8n";
      case "v11": return "http://192.168.56.1:8001/video_feed?model=yolov8s";
      case "cv": return "http://192.168.56.1:8001/video_feed?model=yolov5";
      default: return NoStreamImage;
    }
  };
  

  return (
    <div>
    <div >
      <Sidebar />
      <h2>Admin Dashboard</h2>

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          
          
        </div>

        

        {/* Video Section */}
        <div className="video-section">
          <h3>Live Video Feed</h3>
          <div className="video-controls">
            <button className={`play-stop-button ${isPlaying ? "stop" : "play"}`} onClick={togglePlay}>
              {isPlaying ? "Stop" : "Play"}
            </button>
            <select className="model-dropdown" value={selectedModel} onChange={handleModelChange}>
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
         {/* Stats Section */}
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

        {/* System Metrics */}
        <div className="system-metrics">
          <h3>System Performance</h3>
          <p>CPU Usage: {cpuUsage}%</p>
          <p>RAM Usage: {ramUsage}%</p>
        </div>
      </div>
     
      <Chatbot />
      <Footer />
      
    </div>
    </div>
  );
};

export default AdminDashboardPage;
