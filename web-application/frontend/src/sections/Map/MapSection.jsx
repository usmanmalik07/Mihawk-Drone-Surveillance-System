import React from 'react';
import './MapSection.css';

const MapSection = () => {
  return (
    <div className="map-section">
      <h2 className="map-title">Find Us On Map</h2>
      <div className="map-container">
        {/* Single Larger Map */}
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7115.377376973221!2d73.05905462686898!3d33.531585451077525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1729183152626!5m2!1sen!2s"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          className="map-frame"
        ></iframe>
      </div>
    </div>
  );
};

export default MapSection;
