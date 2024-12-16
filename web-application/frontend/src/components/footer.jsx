// src/components/Footer.js
import React from "react";

const Footer = () => {
  // Inline styles for the footer
  const footerStyle = {
    backgroundColor: "#3263e9",
    color: "white",
    padding: "15px",
    textAlign: "center",
    width: "100%",
    
  };

  const footerLinksStyle = {
    listStyleType: "none",
    padding: "0",
  };

  const footerLinkStyle = {
    display: "inline",
    margin: "0 10px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  const linkHoverStyle = {
    textDecoration: "underline",
  };

  return (
    <footer style={footerStyle}>
      <p>© 2024 My Dashboard. All rights reserved.</p>
      <ul style={footerLinksStyle}>
        <li style={footerLinkStyle}>
          <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
        </li>
        <li style={footerLinkStyle}>
          <a href="/terms-of-service" style={linkStyle}>Terms of Service</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
