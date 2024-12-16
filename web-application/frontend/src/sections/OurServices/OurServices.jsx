import React from 'react';
import { FaCode, FaMobileAlt, FaBrain, FaCogs, FaVideo, FaPaintBrush } from 'react-icons/fa'; // Importing icons
import "./OurServices.css";
import { Link } from 'react-router-dom';

const servicesData = [
  {
    title: "Full Stack Development",
    description: "Building robust web applications with both front-end and back-end technologies.",
    icon: <FaCode /> // Add the icon here
  },
  {
    title: "Mobile App Development",
    description: "Creating user-friendly mobile applications for iOS and Android platforms.",
    icon: <FaMobileAlt /> // Add the icon here
  },
  {
    title: "Machine Learning",
    description: "Leveraging algorithms and data to build predictive models and intelligent systems.",
    icon: <FaBrain /> // Add the icon here
  },
  {
    title: "GHL Automation",
    description: "Automating processes and workflows using Go High Level for streamlined operations.",
    icon: <FaCogs /> // Add the icon here
  },
  {
    title: "Video Editing",
    description: "Producing engaging video content with professional editing techniques and tools.",
    icon: <FaVideo /> // Add the icon here
  },
  {
    title: "Graphic Designing",
    description: "Crafting visually appealing designs for branding, marketing, and more.",
    icon: <FaPaintBrush /> // Add the icon here
  }
];

const OurServices = () => {
  return (
    <div className="our-services-container" style={{color: "white", backgroundColor: "#171820" }}>
      <div>
        <h3 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold mb-3 abcd" style={{ color: '#fff' }}> 
          Our <span style={{ color: "rgb(199,47,72)" }}>Services</span>
        </h3>
        <div className="our-services-card-container">
          {servicesData.map((service, index) => (
            <Link to="/book-an-appointment">
            <div key={index} className="our-services-card text-center sm:text-xl text-lg flex flex-col justify-center items-center">
              <div className="icon text-4xl mb-3">
                {service.icon} {/* Display the icon */}
              </div>
              <h5>{service.title}</h5>
              <p className="mt-2 text-center font-light sm:text-sm text-xs">{service.description}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
