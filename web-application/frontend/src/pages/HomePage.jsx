import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "../styles/HomePage.css";
import Navbar from "../components/navbar";
import ContactUs from "../components/contactUs";
import AboutUs from "../components/aboutUs"; // Import the CSS file

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "white" }}>
    <div className="bg-color" style= {{backgroundColor: "#3263e9"}}>
    <Navbar />
    

      {/* Hero Section */}
      <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Mihawk : Drone Surveillance System</h1>
        <p className="hero-text">
          Leading the way in cutting-edge drone technology and advanced
          surveillance solutions.
        </p>
        <button className="hero-button" onClick={handleLogin}>
          Get Started
        </button>
        </div>
      </div>
      

      {/* Features Section */}
      <AboutUs /> 
      
      <ContactUs />
      
      

      {/* Footer */}
      <footer className="footer">
      
        <p>&copy; {new Date().getFullYear()} Mihawk Drone Surveillance. All Rights Reserved.</p>
      </footer>
      </div>
      
    </div>
  );
};

export default HomePage;
