import React, { useState } from 'react';
import { FaVideo, FaBullhorn, FaRobot, FaCloud, FaBrain, FaBell, FaLock, FaPlug } from 'react-icons/fa';
import "./PricingSection.css";
import { Link } from 'react-router-dom';

export const servicesPricingData = [
  {
    title: "Video Streaming",
    description: "Delivering high-quality video with minimal latency for smooth, uninterrupted surveillance.",
    icon: <FaVideo />, // Add the icon here
    details: [
      "Real-time streaming",
      "Low-latency video feed",
      "Resolution support",
      "Cross-device compatibility",
      "Adaptive streaming based on bandwidth"
    ]
  },
  {
    title: "Real-Time Monitoring",
    description: "Providing 24/7 surveillance with continuous video feed and real-time event detection.",
    icon: <FaBullhorn />, // Add the icon here
    details: [
      "24/7 surveillance",
      "Multi-camera monitoring",
      "Real-time movement detection",
      "Live video display",
      "Recording for later review"
    ]
  },
  {
    title: "Suspicious Activity Detection",
    description: "Detecting abnormal behaviors in real-time using AI and machine learning for enhanced accuracy.",
    icon: <FaRobot />, // Add the icon here
    details: [
      "Real-time abnormal behavior detection",
      "AI-powered analysis",
      "Instant alerts to authorities",
      "Reduced false positives",
      "Customizable detection algorithms"
    ]
  },
  {
    title: "Cloud Infrastructure",
    description: "Scalable cloud solutions for storing large amounts of surveillance data securely.",
    icon: <FaCloud />, // Add the icon here
    details: [
      "Scalable cloud storage",
      "Remote access to footage",
      "High availability & reliability",
      "Data encryption",
      "Seamless integration with IT systems"
    ]
  },
  {
    title: "AI-Powered Analytics",
    description: "Using AI to analyze video feeds in real-time and generate actionable insights.",
    icon: <FaBrain />, // Add the icon here
    details: [
      "Real-time video analysis",
      "Pattern recognition (movement, behavior)",
      "Actionable insights for decision-making",
      "Continuous improvement through machine learning",
      "Reduced manual intervention"
    ]
  },
  {
    title: "Automated Alerts",
    description: "Generating real-time alerts for security teams and authorities upon detecting threats.",
    icon: <FaBell />, // Add the icon here
    details: [
      "Instant notifications",
      "Customizable alert thresholds",
      "Multiple alert methods (SMS, email, app)",
      "Real-time response management",
      "Emergency alerts for critical incidents"
    ]
  }
];


const PricingSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="my-8 mx-0" style={{ color: "white"}}>
      <h3 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold mb-3" style={ {color:'#fff'}}>
        Services <span style={{ color: "rgb(199,47,72)" }}>Detail</span>
      </h3>
      <div className="pricing-card-container">
        {servicesPricingData.map((service, index) => (
          <div key={index} className="pricing-card py-4 sm:text-xl text-lg flex flex-col justify-center items-center">
            <div className="icon mb-4 text-4xl">
              {service.icon} {/* Display the icon here */}
            </div>
            <h5 className='px-4 font-medium'>{service.title}</h5>
            <p className="my-2 mt-3 px-4 text-center font-light sm:text-[16px] text-sm">{service.description}</p>
            <div className='flex items-start w-full px-14'>
              <ul className='text-[14px] py-3 list-disc'>
                {service.details.map((detail, i) => (
                  <li key={i} className=''>{detail}</li>
                ))}
              </ul>
            </div>
            <Link 
              to={{
                pathname: "/book-an-appointment",
                state: { serviceTitle: service.title, servicePrice: service.price }
              }}
              style={{ 
                textDecoration: 'none', 
                color: 'inherit', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%' 
              }}
            >
              <div 
                className='price-button w-2/3 rounded-full py-1 my-2 text-center mt-auto'
                onMouseOver={() => setHoveredIndex(index) }
                onMouseOut={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index ? (
                  <span className='text-2xl font-semibold'>Book Now</span>
                ) : (
                  <><span className='text-2xl font-semibold'>{"Learn More"}</span></>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
