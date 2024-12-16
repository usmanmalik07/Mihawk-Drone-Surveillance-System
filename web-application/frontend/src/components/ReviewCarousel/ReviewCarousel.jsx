// src/components/ReviewCarousel/ReviewCarousel.js
import React from 'react';
import Slider from 'react-slick';
import './ReviewCarousel.css';

// Local video files
import video1 from '../../assets/video1.mp4';
import video2 from '../../assets/video2.mp4';
import video3 from '../../assets/video3.mp4';
import video4 from '../../assets/video4.mp4';

const videos = [
  { video: video1 },
  { video: video2 },
  { video: video3 },
  { video: video4 },
];

const ReviewCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,  // Enable next/prev arrows
  };

  return (
    <div className="my-8" style={{ color: "white" }}>
      <h3 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold mb-3" style={{ color: '#fff', marginRight: "4.7px" }}>
        Our <span style={{ color: "rgb(199,47,72)" }}>Gallery</span>
      </h3>
      <div className="video-carousel">
        <Slider {...settings}>
          {videos.map((video, index) => (
            <div key={index} className="video-slide">
              <video
                width="100%"
                autoPlay
                muted
                loop
                className="carousel-video"
              >
                <source src={video.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewCarousel;
