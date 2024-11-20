import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "../styles/HomePage.css"; // Import the CSS file

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Mihawk Drone Surveillance</h1>
        <p className="hero-text">
          Leading the way in cutting-edge drone technology and advanced
          surveillance solutions.
        </p>
        <button className="hero-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="features-title">Why Choose Mihawk?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Advanced Technology</h3>
            <p>
              Equipped with state-of-the-art drones, our system delivers
              precision and accuracy for all your surveillance needs.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Real-Time Insights</h3>
            <p>
              Gain actionable insights with real-time data collection and
              analysis to stay ahead of potential threats.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Comprehensive Solutions</h3>
            <p>
              From urban monitoring to wildlife protection, Mihawk offers
              tailored solutions for diverse industries.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Mihawk Drone Surveillance. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
