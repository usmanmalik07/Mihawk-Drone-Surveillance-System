import React from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>My Dashboard</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
        </nav>
      </header>

      {/* Sidebar Section */}
      <aside className="dashboard-sidebar">
        <ul>
          <li><a href="/">Overview</a></li>
          <li><a href="/analytics">Analytics</a></li>
          <li><a href="/reports">Reports</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </aside>

      {/* Main Content Section */}
      <main className="dashboard-content">
        <section>
          <h2>Surveillance</h2>
          <p>Model Applied video</p>
          <div className="video-container">
            <video controls autoPlay muted width="100%" height="auto">
              <source src="http://localhost/video_feed" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
        <section className="dashboard-stats">
          <div className="stat-card">
            <h3>Users</h3>
            <p>1,245</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p>$12,500</p>
          </div>
          <div className="stat-card">
            <h3>Sales</h3>
            <p>523</p>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="dashboard-footer">
        <p>© 2024 My Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
