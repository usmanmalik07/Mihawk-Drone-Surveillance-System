import React, { useState } from "react";
import { Link } from "react-router-dom"; // SPA navigation ke liye
import "./Sidebar.css"; // Styling import

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
            <Link to="/report" className="sidebar-link">
              Reports
            </Link>
          </li>
          <li>
            <Link to="/results" className="sidebar-link">
              Analytics
            </Link>
          </li>
          <li><Link to="/" className="sidebar-link">
              Settings
            </Link></li>
          <li>
            <Link to="/user-info" className="sidebar-link">
              Manage Users
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content
      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        <h1>Main Content</h1>
        <p>This is the main content area.</p>
      </div> */}
    </>
  );
};

export default Sidebar;