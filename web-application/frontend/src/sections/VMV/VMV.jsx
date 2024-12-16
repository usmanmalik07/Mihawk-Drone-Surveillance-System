import React from 'react';
import './VMV.css'; // Ensure to link your CSS file

const VMV = () => {
  return (
    <div className='vmv-container'>
      <div className='our-vision'>
        <h5 className='text-2xl font-bold' style={{ textShadow: '2px 4px 10px rgba(0, 0, 0, 0.6)' }}>Our Vision</h5>
        <p className='text-xl mt-4 font-light'>To be the foremost digital partner, leading the charge in revolutionizing the way brands interact, grow, and thrive in the digital world.</p>
        <p className='font-light mt-4'>We envision a world where digital transformation is accessible to all, where creativity and technology harmonize to create extraordinary experiences that leave a mark.</p>
      </div>
      <div className='our-value'>
        <h5 className='text-2xl font-bold' style={{ textShadow: "2px 4px 10px rgba(0, 0, 0, 0.6)" }}>Our <span style={{ color: "rgb(199, 47, 72)"}}>Value</span></h5>
        <p className='text-xl mt-4 font-light'>To be the foremost digital partner, leading the charge in revolutionizing the way brands interact, grow, and thrive in the digital world.</p>
        <p className='font-light mt-4'>We envision a world where digital transformation is accessible to all, where creativity and technology harmonize to create extraordinary experiences that leave a mark.</p>
      </div>
      <div className='our-mission'>
        <h5 className='text-2xl font-bold' style={{ color: "rgb(199, 47, 72)", textShadow: '2px 4px 10px rgba(0, 0, 0, 0.6)' }}>Our Mission</h5>
        <p className='text-xl mt-4 font-light'>To be the foremost digital partner, leading the charge in revolutionizing the way brands interact, grow, and thrive in the digital world.</p>
        <p className='font-light mt-4'>We envision a world where digital transformation is accessible to all, where creativity and technology harmonize to create extraordinary experiences that leave a mark.</p>
      </div>
    </div>
  );
}

export default VMV;
