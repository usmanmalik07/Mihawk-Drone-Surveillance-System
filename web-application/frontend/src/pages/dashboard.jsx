import React from "react";
import "../styles/dashboard.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Dashboard = () => {
  return (
    <div>
    <Navbar />
    <div className="dashboard">
      
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
        </nav>
      </header>

      
      <aside className="dashboard-sidebar">
        <ul>
          <li className="db-list"><a href="/">Overview</a></li>
          <li className="db-list"><a href="/analytics">Analytics</a></li>
          <li className="db-list"><a href="/reports">Reports</a></li>
          <li className="db-list"><a href="/settings">Settings</a></li>
        </ul>
      </aside>

      <div>
      <main className="dashboard-content">
        <section>
          <h2>Surveillance</h2>
          <p>Live Video Feed</p>
          <div className="video-container">
            <video controls autoPlay muted width="100%" height="auto">
              <source src="http://127.0.0.1:8000/video_feed" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
        <section className="dashboard-stats">
          <div className="stat-card">
            <h3>Detections</h3>
            <p>1</p>
          </div>
          <div className="stat-card">
            <h3>Alerts</h3>
            <p>3</p>
          </div>
          <div className="stat-card">
            <h3>Reports</h3>
            <a href="/reports">View</a>
          </div>
        </section>
      </main>
      </div>
      
      
      
    </div>
    
    </div>  
    
  );
};

export default Dashboard;
