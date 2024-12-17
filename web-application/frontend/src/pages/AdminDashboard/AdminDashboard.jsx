import React from "react";
import "./AdminDashboard.css";

const AdminDashboardPage = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3 className="sidebar-title">Dashboard</h3>
        <ul className="sidebar-menu">
          <li>Overview</li>
          <li>Reports</li>
          <li>Results</li>
          <li>Analytics</li>
          <li>Settings</li>
          <li >
            <a href="/user-info" className="sidebar-link">Manage Users</a>
          </li>
        </ul>
      </div>

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
            <h4>Name: <span>John Doe</span></h4>
            <h4>Email: <span>johndoe@example.com</span></h4>
            <h4>Role: <span>Admin</span></h4>
          </div>
        </div>

        {/* Video Section */}
        <div className="video-section">
          <h3 className="video-title">Live Video Feed</h3>
          <div className="video-player">
          <img src="http://192.168.100.14:8000/video_feed" className="stream" alt="Live Video Stream" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
