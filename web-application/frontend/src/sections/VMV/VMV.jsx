import React from 'react';
import './VMV.css'; // Ensure to link your CSS file

const VMV = () => {
  return (
    <div className='vmv-container'>
      <div className='our-vision'>
        <h5 className='text-2xl font-bold' style={{ textShadow: '2px 4px 10px rgba(0, 0, 0, 0.6)' }}>Our Vision</h5>
        <p className='text-xl mt-4 font-light'>To redefine surveillance with Mihawk’s cutting-edge drones, providing real-time monitoring and instant alerts for enhanced security.</p>
        <p className='font-light mt-4'>We aim to create a future where drones proactively detect and respond to threats, ensuring safety with precision and speed.</p>
      </div>
      <div className='our-value'>
        <h5 className='text-2xl font-bold' style={{ textShadow: "2px 4px 10px rgba(0, 0, 0, 0.6)" }}>Our <span style={{ color: "rgb(199, 47, 72)"}}>Value</span></h5>
        <p className='text-xl mt-4 font-light'>To lead with a commitment to excellence, continuously innovating our drone surveillance technology for maximum impact in real-time security management.</p>
        <p className='font-light mt-4'>We believe in a world where precision, reliability, and safety intersect, creating smarter, safer environments that can act instantly to threats and protect what matters most.</p>
      </div>
      <div className='our-mission'>
        <h5 className='text-2xl font-bold' style={{ color: "rgb(199, 47, 72)", textShadow: '2px 4px 10px rgba(0, 0, 0, 0.6)' }}>Our Mission</h5>
        <p className='text-xl mt-4 font-light'>To lead the way in drone surveillance technology, transforming security operations with real-time, automated threat detection and rapid response systems.</p>
        <p className='font-light mt-4'>We envision a world where drones provide not just monitoring, but immediate action, creating a safer, more responsive environment for businesses and communities..</p>
      </div>
    </div>
  );
}

export default VMV;
