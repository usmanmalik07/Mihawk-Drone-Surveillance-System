import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // ✅ Use navigate for redirection
  const [navbarBackground, setNavbarBackground] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [expanded, setExpanded] = useState(false); // Track whether navbar is expanded
  const lastScrollY = useRef(0); // Store scroll position across renders

  // Define routes where the Login button should not be displayed
  const noLoginRoutes = [
    "/admin-dashboard",
    "/observer-dashboard",
    "/operator-dashboard",
    "/user-info",
  ];

  // Define routes where the navbar should not hide on scroll
  const noHideRoutes = [
    "/admin-dashboard",
    "/observer-dashboard",
    "/operator-dashboard",
    "/user-info",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setNavbarBackground(true);
      } else {
        setNavbarBackground(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (window.scrollY > lastScrollY.current) {
        setShowNavbar(false); // Hide navbar when scrolling down
      } else {
        setShowNavbar(true); // Show navbar when scrolling up
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    setNavbarBackground(window.scrollY > 500); // Set initial background on page load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]); // Update when route changes

  // Function to handle link click and close the navbar on mobile
  const handleLinkClick = () => {
    setExpanded(false); // Collapse the navbar after clicking a link
  };

  // Handle clicking outside the navbar to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (expanded && !event.target.closest(".navbar")) {
        setExpanded(false); // Close navbar if clicking outside of it
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [expanded]);

  // ✅ Function to handle Login button click
  const handleLoginRedirect = () => {
    const authToken = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");

    if (authToken && userRole) {
      // ✅ If logged in, redirect to respective dashboard
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else if (userRole === "operator") {
        navigate("/operator-dashboard");
      } else if (userRole === "observer") {
        navigate("/observer-dashboard");
      } else {
        navigate("/"); // Redirect to home if role is invalid
      }
    } else {
      // ✅ If no token, redirect to login page
      navigate("/login");
    }
  };

  return (
    <Navbar
      expand="lg"
      className={`the-navbar ${
        navbarBackground || location.pathname !== "/"
          ? "scrolled"
          : "transparent"
      } ${showNavbar ? "show" : "hide"}`}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      style={{ padding: "20px 5vw", zIndex: "1000" }}
    >
      <div className="d-flex align-items-center w-100">
        <Navbar.Brand
          href="/"
          className="navbar-brand-custom d-flex align-items-center"
        >
          <img
            src={require("../../assets/dro.gif")} // Your GIF file path
            alt="Mihawk Logo GIF"
            className="logo-gif"
          />
          <span className="mihawk-text">Mihawk</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleLinkClick}
              className={`px-3 ${location.pathname === "/" ? "active" : ""}`}
            >
              <span>Home</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/services"
              onClick={handleLinkClick}
              className={`px-3 ${location.pathname === "/services" ? "active" : ""}`}
            >
              <span>Services</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/book-an-appointment"
              onClick={handleLinkClick}
              className={`px-3 ${location.pathname === "/book-an-appointment" ? "active" : ""}`}
            >
              <span>Appointment</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact-us"
              onClick={handleLinkClick}
              className={`px-3 ${location.pathname === "/contact-us" ? "active" : ""}`}
            >
              <span>Contact Us</span>
            </Nav.Link>

            {/* ✅ Updated Login Button Logic */}
            {!noLoginRoutes.includes(location.pathname) && (
              <Nav.Link
                as="button"
                onClick={handleLoginRedirect} // ✅ Handle login redirection
                className="px-3"
              >
                <button className="btn gradient-button">Login</button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
