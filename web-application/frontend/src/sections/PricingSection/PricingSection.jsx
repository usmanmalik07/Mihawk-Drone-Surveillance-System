import React, { useState } from 'react';
import { FaCode, FaMobileAlt, FaBrain, FaCogs, FaVideo, FaPaintBrush } from 'react-icons/fa'; // Importing icons
import "./PricingSection.css";
import { Link } from 'react-router-dom';

export const servicesPricingData = [
  {
    title: "Full Stack Development",
    description: "Building robust web applications with both front-end and back-end technologies.",
    price: 199,
    icon: <FaCode />, // Add the icon here
    details: [
      "Responsive design",
      "8 hours/day",
      "Deployment",
      "Customize",
      "API integration",
      "Database setup",
      "Security & Authentication",
      "Performance optimization"
    ]
  },
  {
    title: "Mobile App Development",
    description: "Creating user-friendly mobile applications for iOS and Android platforms.",
    price: 299,
    icon: <FaMobileAlt />, // Add the icon here
    details: [
      "Cross-platform",
      "Full app deployment",
      "API integration",
      "Push notifications",
      "App store submission",
      "Offline functionality",
      "User authentication",
      "In-app purchases"
    ]
  },
  {
    title: "Machine Learning",
    description: "Leveraging algorithms and data to build predictive models and intelligent systems.",
    price: 399,
    icon: <FaBrain />, // Add the icon here
    details: [
      "Model training",
      "Data preprocessing",
      "AI integrations",
      "Custom ML solutions",
      "Predictive analytics",
      "Deep learning models",
      "Data visualization",
      "Cloud-based deployment"
    ]
  },
  {
    title: "GHL Automation",
    description: "Automating processes and workflows using Go High Level for streamlined operations.",
    price: 149,
    icon: <FaCogs />, // Add the icon here
    details: [
      "Automated workflows",
      "Custom pipelines",
      "CRM integration",
      "Reports & analytics",
      "Email marketing automation",
      "SMS campaigns",
      "Appointment scheduling",
      "Funnel management"
    ]
  },
  {
    title: "Video Editing",
    description: "Producing engaging video content with professional editing techniques and tools.",
    price: 99,
    icon: <FaVideo />, // Add the icon here
    details: [
      "Professional editing",
      "Transitions & effects",
      "4K resolution",
      "Color grading",
      "Audio synchronization",
      "Motion graphics",
      "Storyboarding",
      "Video optimization for platforms"
    ]
  },
  {
    title: "Graphic Designing",
    description: "Crafting visually appealing designs for branding, marketing, and more.",
    price: 89,
    icon: <FaPaintBrush />, // Add the icon here
    details: [
      "Logo design",
      "Custom illustrations",
      "Branding",
      "Marketing materials",
      "Social media assets",
      "UI/UX design",
      "Packaging design",
      "Typography"
    ]
  }
];

const PricingSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="my-8 mx-0" style={{ color: "white"}}>
      <h3 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold mb-3" style={ {color:'#fff'}}>
        Services <span style={{ color: "rgb(199,47,72)" }}>Pricing</span>
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
                  <><span className='text-2xl font-semibold'>{service.price}</span>$</>
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
