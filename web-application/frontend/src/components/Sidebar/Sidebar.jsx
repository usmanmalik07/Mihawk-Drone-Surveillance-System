import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import axios from "axios";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardRoute, setDashboardRoute] = useState("/admin-dashboard"); // Default route
  const [userRole, setUserRole] = useState(""); // Store user role
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");

    setUserRole(role); // Store the role for conditional rendering

    // Set dashboard route based on role
    if (role === "operator") {
      setDashboardRoute("/operator-dashboard");
    } else if (role === "observer") {
      setDashboardRoute("/observer-dashboard");
    } else {
      setDashboardRoute("/admin-dashboard"); // Default for admin
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
        await axios.get("http://localhost:5000/api/users/logout", {
            withCredentials: true, // ✅ Ensure cookies are included
        });

        // ✅ Clear authentication data
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");

        // ✅ Redirect to login page
        navigate("/login", { replace: true });

        console.log("User logged out successfully.");
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>&times;</button>

        <h3 className="sidebar-title">Dashboard</h3>
        <ul className="sidebar-menu">
          {/* Dashboard - Available for all roles */}
          <li>
            <Link to={dashboardRoute} className="sidebar-link">Dashboard</Link>
          </li>

          {/* Weather - Available for all roles */}
          <li>
            <Link to="/weather" className="sidebar-link">Weather</Link>
          </li>

          {/* Reports & Analytics - Only for Admin and Operator */}
          {(userRole === "admin" || userRole === "operator") && (
            <>
              <li>
                <Link to="/report" className="sidebar-link">Reports</Link>
              </li>
              <li>
                <Link to="/results" className="sidebar-link">Analytics</Link>
              </li>
            </>
          )}

          {/* Settings - Only for Admin */}
          {userRole === "admin" && (
            <li>
              <Link to="/settings" className="sidebar-link">Settings</Link>
            </li>
          )}

          {/* Manage Users - Only for Admin (Disabled for Operator & Observer) */}
          {userRole === "admin" && (
            <li>
              <Link to="/user-info" className="sidebar-link">Manage Users</Link>
            </li>
          )}
        </ul>

        {/* Logout Button - Available for all roles */}
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
