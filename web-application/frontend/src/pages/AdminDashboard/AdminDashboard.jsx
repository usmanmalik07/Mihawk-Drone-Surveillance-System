import React, { useState } from "react";
import "./AdminDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar"; // 💡 Sidebar ko import kiya
import Footer from "../../components/Footer/Footer";

const AdminDashboardPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedModel, setSelectedModel] = useState("v8n");

  // Function to toggle play/stop
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Function to handle model change
  const handleModelChange = (event) => {
    const model = event.target.value;
    setSelectedModel(model);
    console.log(`Switching to ${model}`);
  };

  // Dynamically set the video feed URL based on selected model
  const getVideoFeedSrc = () => {
    if (!isPlaying) {
      return "https://via.placeholder.com/800x450?text=Stream+Stopped";
    }

    switch (selectedModel) {
      case "v8n":
        return "http://192.168.56.1:8000/video_feed?model=yolov8n";
      case "v11":
        return "http://192.168.56.1:8000/video_feed?model=yolov8s";
      case "cv":
        return "http://192.168.56.1:8000/video_feed?model=yolov5";
      default:
        return "https://via.placeholder.com/800x450?text=No+Stream+Available";
    }
  };

  return (
    <>
    <div className="main">
    <div className="Side"><Sidebar /></div>
      <div className="dashboard-container">
        

        {/* Main Content */}
        <div className="main-content">
          {/* User Details */}
          <div className="user-details">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="user-image"
            />
            <div className="user-info">
              <h4>
                Name: <span>Admin 1</span>
              </h4>
              <h4>
                Email: <span>Admin@gmail.com</span>
              </h4>
              <h4>
                Role: <span>Admin</span>
              </h4>
            </div>
          </div>

          {/* Video Section */}
          <div className="video-section">
            <h3 className="video-title">Live Video Feed</h3>

            {/* Play/Stop Button and Dropdown */}
            <div className="video-controls">
              <button
                className={`play-stop-button ${isPlaying ? "stop" : "play"}`}
                onClick={togglePlay}
              >
                {isPlaying ? "Stop" : "Play"}
              </button>
              <select
                className="model-dropdown"
                value={selectedModel}
                onChange={handleModelChange}
              >
                <option value="v8n">yolov8n</option>
                <option value="v11">yolov8s</option>
                <option value="cv">yolov5</option>
              </select>
            </div>

            {/* Video Player */}
            <div className="video-player">
              <img
                src={getVideoFeedSrc()}
                className="stream"
                alt={isPlaying ? "Live Video Stream" : "Stream Stopped"}
              />
            </div>
          </div>
        </div>
      </div>
      
      </div>
      <Footer />
      
    </>
  );
};

export default AdminDashboardPage;
