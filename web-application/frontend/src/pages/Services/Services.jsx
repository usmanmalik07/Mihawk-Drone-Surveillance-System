import React, { useEffect } from "react";
import "./Services.css";
import PricingCard from "../../sections/PricingSection/PricingSection";
import Footer from '../../components/Footer/Footer';
import ProcessSection from "../../sections/Process/ProcessSection";
import AccelerateSection from "../../sections/Accelerate/AccelerateSection";
const Services = () => {

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array to ensure this runs only once when the component mounts

  return (<>
  
    <div className="services-container">
        <PricingCard/>
    </div>
    <ProcessSection/>
    <AccelerateSection/>
      
    <Footer/>
  </>
  );
};

export default Services;
