import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Sidebar.css"; // Styling import

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    
  };

  const handleLogout = () => {
    // Perform any logout-related actions (e.g., clearing auth tokens)
    navigate("/"); // Redirect to the landing screen
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* Close Button */}
        <button className="close-btn" onClick={toggleSidebar}>
          &times; {/* Close icon (X) */}
        </button>

        {/* Sidebar Content */}
        <h3 className="sidebar-title">Dashboard</h3>
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin-dashboard" className="sidebar-link">
              Overview
            </Link>
          </li>
          <li>
            <Link to="/weather" className="sidebar-link">
              Weather
            </Link>
          </li>
          <li>
            <Link to="/report" className="sidebar-link">
              Reports
            </Link>
          </li>
          <li>
            <Link to="/results" className="sidebar-link">
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/settings" className="sidebar-link">
              Settings
            </Link>
          </li>
          
          <li>
            <Link to="/user-info" className="sidebar-link">
              Manage Users
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
