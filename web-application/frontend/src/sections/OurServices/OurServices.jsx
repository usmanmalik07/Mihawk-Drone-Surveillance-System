import React from 'react';
import { FaVideo, FaUsers, FaBell, FaCloud, FaPlug, FaChartLine } from 'react-icons/fa';
import "./OurServices.css";
import { Link } from 'react-router-dom';

const servicesData = [
  {
    title: "Video Streaming",
    description: "Delivering high-quality video streaming with minimal latency for a flawless user experience.",
    icon: <FaVideo /> // Add the icon here
  },
  {
    title: "User Management",
    description: "Implementing secure, scalable systems for managing user access and protecting data.",
    icon: <FaUsers /> // Add the icon here
  },
  {
    title: "Activity Detection",
    description: "Detecting abnormal behavior in real-time and alerting authorities for immediate response.",
    icon: <FaBell /> // Add the icon here
  },
  {
    title: "Cloud Infrastructure",
    description: "Building cloud-based solutions that scale seamlessly with increasing demand.",
    icon: <FaCloud /> // Add the icon here
  },
  {
    title: "System Integration",
    description: "Designing a flexible system that easily adapts to new features and updates.",
    icon: <FaPlug /> // Add the icon here
  },
  {
    title: "Reporting | Dashboards",
    description: "Generating on-the-spot reports and dashboards for quick, actionable insights.",
    icon: <FaChartLine /> // Add the icon here
  }
];

const OurServices = () => {
  return (
    <div className="our-services-container" style={{color: "white", backgroundColor: "#171820" }}>
      <div>
        <h3 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold mb-3 abcd" style={{ color: '#fff' }}> 
          Our <span style={{ color: "rgb(199,47,72)" }}>Features</span>
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
