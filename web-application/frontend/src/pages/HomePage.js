import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: "url('https://www.istockphoto.com/photos/drone-camera')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "black",
          textAlign: "center",
          padding: "80px 20px",
          zIndex: "1",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Welcome to Mihawk Drone Surveillance
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          Leading the way in cutting-edge drone technology and advanced
          surveillance solutions.
        </p>
        <button
          onClick={handleGetStarted} // Attach the click handler
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            padding: "15px 30px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
          Why Choose Mihawk?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              Advanced Technology
            </h3>
            <p>
              Equipped with state-of-the-art drones, our system delivers
              precision and accuracy for all your surveillance needs.
            </p>
          </div>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              Real-Time Insights
            </h3>
            <p>
              Gain actionable insights with real-time data collection and
              analysis to stay ahead of potential threats.
            </p>
          </div>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              Comprehensive Solutions
            </h3>
            <p>
              From urban monitoring to wildlife protection, Mihawk offers
              tailored solutions for diverse industries.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#333",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Mihawk Drone Surveillance. All
          Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
