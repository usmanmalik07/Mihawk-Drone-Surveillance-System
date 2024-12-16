import React from 'react';
import './AccelerateSection.css';
import i1 from '../../assets/1.jpg';
import i2 from '../../assets/4.jpg';
import i3 from '../../assets/3.png';

const AccelerateSection = () => {
  return (
    <div className="accelerate-section">
      <div className="accelerate-content">
        <h2 className="accelerate-title">Ready to accelerate your software development?</h2>
        <p className="accelerate-description">
          Take the first step towards a brighter future and supercharge your business with cutting-edge technologies, expert guidance, and unparalleled support.
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
