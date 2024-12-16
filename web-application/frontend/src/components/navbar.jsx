import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import giftIcon from "../assets/eyes.gif"; // Import the GIF

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        Mihawk
        <img
          src={giftIcon} // Use the imported GIF
          alt="gift icon"
          className="navbar-gif"
        />
      </div>
      <div className="navbar-links">
        <a href="#features" className="nav-link">Features</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>
      <button className="navbar-button" onClick={() => navigate("/login")}>
        Login
      </button>
    </nav>
  );
};

export default Navbar;
