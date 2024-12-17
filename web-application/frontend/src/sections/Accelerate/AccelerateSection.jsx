import React from 'react';
import './AccelerateSection.css';
import i1 from '../../assets/1d.jpg';
import i2 from '../../assets/2d.jpg';
import i3 from '../../assets/3d.jpg';

const AccelerateSection = () => {
  return (
    <div className="accelerate-section">
      <div className="accelerate-content">
        <h2 className="accelerate-title">Ready to elevate your security operations?</h2>
        <p className="accelerate-description">
        Take the first step toward smarter surveillance with advanced drones, real-time analytics, and expert support for unmatched protection.
        </p>
        <a href="/book-an-appointment" className="accelerate-button">
          Schedule Free 30 minute Strategy Call
        </a>
      </div>
      
      <div className="accelerate-images">
        <img src={i1} alt="Team working" className="image-tilt" />
        <img src={i2} alt="Meeting" className="image-tilt" />
        <img src={i3} alt="Software discussion" className="image-tilt" />
      </div>
    </div>
  );
};

export default AccelerateSection;
