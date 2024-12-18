import React from 'react';
import './About.css';
import myGif from '../../assets/myGif2.gif';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div
      className='about-container w-full flex items-center md:justify-between justify-center md:my-28 my-14 flex-col md:flex-row 2xl:gap-x-48 lg:gap-x-20 sm:gap-x-10 gap-x-0 gap-y-10'
      style={{
        padding: '0 5vw',
        backgroundColor: '#171820',
        color: 'white',
        position: 'relative',
      }}
    >
      <div className='border1' style={{ maxWidth: '600px', marginBottom: '20px' }}>
        <h3
          className='text-title'
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
            borderRadius: '8px',
            padding: '10px 20px',
          }}
        >
          At <span style={{ color: '#c72f48' }}>MIHAWK,</span>
        </h3>
        <p
          className='lg:text-lg text-sm font-light'
          style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
            background: 'rgba(23, 24, 32, 0.8)',
            padding: '15px 20px',
            borderRadius: '8px',
            color: '#ffffff',
          }}
        >
          We blend innovation with precision to deliver state-of-the-art drone surveillance solutions. Our technology is designed to empower safety, ensuring rapid detection and response to potential threats. By merging intelligence and efficiency, we transform modern surveillance into a proactive force, safeguarding communities and redefining security standards.
        </p>
        <div className='read-more-button'>
          <Link to="https://www.linkedin.com/in/usman-malik-827147245/" className="text-decoration-none text-inherit">
            <span>Discover More</span>
          </Link>
        </div>
      </div>
      <div style={{ position: 'relative', display: 'inline-block', borderRadius: '20em' }}>
        <img
          src={myGif}
          style={{
            borderRadius: '20%', // Retain this
            width: '550px', // Set a fixed width
            height: 'auto', // Maintain aspect ratio
            objectFit: 'cover',
            zIndex: '1',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          }}
          alt='Mihawk'
        />
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(23, 24, 32, 0.8), rgba(23, 24, 32, 0) 30%, rgba(23, 24, 32, 0) 70%, rgba(23, 24, 32, 0.8))',
            borderRadius: '10px', // Match the borderRadius of the image
            zIndex: '2',
          }}
        ></div>
      </div>
    </div>
  );
};

export default About;
