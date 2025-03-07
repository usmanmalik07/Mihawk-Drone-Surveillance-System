import React from "react";
import { Link } from "react-router-dom"; // SPA navigation ke liye
import "./Sidebar.css"; // Styling import

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Dashboard</h3>
      <ul className="sidebar-menu">
        <li><Link to="/admin-dashboard" className="sidebar-link">
            Overview
          </Link></li>
        <li>
          <Link to="/report" className="sidebar-link">
            Reports
          </Link>
        </li>
        <li><Link to="/result" className="sidebar-link">
            Analytics
          </Link></li>
        <li>Settings</li>
        <li>
          <Link to="/user-info" className="sidebar-link">
            Manage Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
