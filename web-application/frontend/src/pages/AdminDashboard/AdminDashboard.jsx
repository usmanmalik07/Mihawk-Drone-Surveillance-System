import React, { useState, useEffect, useRef } from "react";
import "./AdminDashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import Chatbot from "../../components/Chatbot/Chatbot";
import NoStreamImage from "../../assets/stream.png";
import { FaUser, FaVideo, FaCog, FaMoon, FaSun } from "react-icons/fa";
import WeatherComponent from "../WeatherPage/WeatherPage";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboardPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedModel, setSelectedModel] = useState("v8n");
  const [videoError, setVideoError] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(35); // Simulated data
  const [ramUsage, setRamUsage] = useState(58); // Simulated data
  const navigate = useNavigate();
  const chartRef = useRef(null); // Ref for the chart

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

  // Get Video Feed URL
  const getVideoFeedSrc = () => {
    if (!isPlaying || videoError) return NoStreamImage;
    switch (selectedModel) {
      case "v8n":
        return "http://192.168.56.1:8002/video_feed?model=yolov8n";
      case "v11":
        return "http://192.168.56.1:8002/video_feed?model=yolov8s";
      case "cv":
        return "http://192.168.56.1:8002/video_feed?model=yolov5";
      case "trained":
        return "http://192.168.56.1:8002/video_feed?model=trained";  
      default:
        return NoStreamImage;
    }
  };

  // Simulated CPU & RAM usage updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 50) + 30); // Random between 30-80%
      setRamUsage(Math.floor(Math.random() * 40) + 50); // Random between 50-90%
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Initialize or update the chart
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["CPU Usage", "RAM Usage"], // Labels for the bars
          datasets: [
            {
              label: "CPU (%)", // Label for CPU
              data: [cpuUsage, 0], // Only CPU data (RAM is 0 for this dataset)
              backgroundColor: "#e63946", // Red for CPU
              borderColor: "#b71c1c",
              borderWidth: 1,
            },
            {
              label: "RAM (%)", // Label for RAM
              data: [0, ramUsage], // Only RAM data (CPU is 0 for this dataset)
              backgroundColor: "#4caf50", // Green for RAM
              borderColor: "#388e3c",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
          plugins: {
            legend: {
              display: true, // Show legend for both CPU and RAM
              position: "top", // Place legend at the top
            },
          },
        },
      });
  
      // Cleanup chart on component unmount
      return () => chart.destroy();
    }
  }, [cpuUsage, ramUsage]);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <h2 className="heading">Admin Dashboard</h2>

      <div className="dashboard-container">
        {/* Top Section: Video Player and System Performance */}
        <div className="top-section">
          {/* Video Player (70% width) */}
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

          {/* System Performance Chart (30% width) */}
          <div className="system-performance">
            <h3>System Performance</h3>
            <div className="chart-container">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Horizontal Bar (Stats Section) */}
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

export default AdminDashboardPage;