import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation(); // Get the current route
  const [navbarBackground, setNavbarBackground] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [expanded, setExpanded] = useState(false); // Track whether navbar is expanded
  const lastScrollY = useRef(0); // Use useRef to store scroll position across renders

  // Effect to handle scroll changes on the home page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setNavbarBackground(true);
      } else {
        setNavbarBackground(false);
      }

      // Determine if we should show or hide the navbar
      if (window.scrollY > lastScrollY.current) {
        setShowNavbar(false); // User is scrolling down, hide the navbar
      } else {
        setShowNavbar(true); // User is scrolling up, show the navbar
      }
      lastScrollY.current = window.scrollY; // Update the lastScrollY ref
    };

    if (['/', '/services', '/book-an-appointment', '/contact-us'].includes(location.pathname)) {
      window.addEventListener('scroll', handleScroll);
      setNavbarBackground(window.scrollY > 500); // Set initial background on page load
    } else {
      setNavbarBackground(true); // Always apply background for non-home pages
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Function to handle link click and close the navbar on mobile
  const handleLinkClick = () => {
    setExpanded(false); // Collapse the navbar after clicking a link
  };

  // Handle clicking outside the navbar to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (expanded && !event.target.closest('.navbar')) {
        setExpanded(false); // Close navbar if clicking outside of it
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [expanded]);

  return (
    <Navbar
      expand="lg"
      className={`the-navbar ${
        navbarBackground || location.pathname !== '/' ? 'scrolled' : 'transparent'
      } ${showNavbar ? 'show' : 'hide'}`}
      expanded={expanded} // Control the expanded state
      onToggle={() => setExpanded(!expanded)} // Toggle the expanded state when clicking the toggle button
      style={{ padding: '20px 5vw', zIndex: '1000' }}
    >
      <div className="d-flex align-items-center w-100">
        <Navbar.Brand href="/">
          <img
            style={{ position: 'relative', bottom: '2px' }}
            src={require('../../assets/buzzsols-logo-white.png')}
            width="100"
            height="auto"
            alt="Buzz Solutions logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleLinkClick} // Close the navbar after clicking the link
              className={`px-3 ${location.pathname === '/' ? 'active' : ''}`}
            >
              <span>Home</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/services"
              onClick={handleLinkClick} // Close the navbar after clicking the link
              className={`px-3 ${location.pathname === '/services' ? 'active' : ''}`}
            >
              <span>Services</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/book-an-appointment"
              onClick={handleLinkClick} // Close the navbar after clicking the link
              className={`px-3 ${location.pathname === '/book-an-appointment' ? 'active' : ''}`}
            >
              <span>Appointment</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact-us"
              onClick={handleLinkClick} // Close the navbar after clicking the link
              className="px-3"
            >
              <button className="btn gradient-button">Contact</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
