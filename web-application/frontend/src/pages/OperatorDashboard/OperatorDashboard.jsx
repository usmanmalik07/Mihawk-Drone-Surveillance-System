import React, { useState } from "react";
import "./OperatorDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import NoStreamImage from "../../assets/nostream.jpg"; 

const OperatorDashboardPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedModel, setSelectedModel] = useState("v8n");
  const [videoError, setVideoError] = useState(false);

  // Profile Picture URL (Fixed)
  const pfp = "https://via.placeholder.com/50";

  // Function to toggle play/stop
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setVideoError(false); // Reset error when toggling
  };

  // Function to handle model change
  const handleModelChange = (event) => {
    const model = event.target.value;
    setSelectedModel(model);
    setVideoError(false); // Reset error when changing model
    console.log(`Switching to ${model}`);
  };

  // Dynamically set the video feed URL based on selected model
  const getVideoFeedSrc = () => {
    if (!isPlaying || videoError) {
      return NoStreamImage; // Show "No Video" image
    }

    switch (selectedModel) {
      case "v8n":
        return "http://192.168.56.1:8001/video_feed?model=yolov8n";
      case "v11":
        return "http://192.168.56.1:8001/video_feed?model=yolov8s";
      case "cv":
        return "http://192.168.56.1:8001/video_feed?model=yolov5";
      default:
        return NoStreamImage;
    }
  };

  return (
    <div>
      <div className="main">
        <div className="Side">
          <Sidebar />
        </div>
        <div className="dashboard-container">
          {/* Main Content */}
          <div className="main-content">
            {/* User Details */}
            <div className="user-details">
              <img
                src={pfp} // ✅ Fixed Profile Picture
                alt="User"
                className="user-image"
              />
              <div className="user-info">
                <h4>
                  Name: <span>Operator</span>
                </h4>
                <h4>
                  Email: <span>Operator@gmail.com</span>
                </h4>
                <h4>
                  Role: <span>Operator</span>
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
              <div className="video-wrapper">
                <img
                  src={getVideoFeedSrc()}
                  className="stream"
                  alt={isPlaying ? "Live Video Stream" : "No Video Available"}
                  onError={() => setVideoError(true)} // Handle broken video stream
                />
                {videoError && <p className="error-message">Error loading stream</p>}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
    </div>
  );
};

export default OperatorDashboardPage;
