// src/components/ReviewCarousel/ReviewCarousel.js
import React from 'react';
import Slider from 'react-slick';
import './ReviewCarousel.css';
import JohnDoeImage from '../../assets/cameron.jpeg';
import karl from '../../assets/karl.jpeg';
import richard from '../../assets/richard.jpg';
import jon from '../../assets/jonatthon.jpeg';

const reviews = [
    {
      name: "Cameron Upton",
      review: "GHL has transformed the way we manage our leads and automate our marketing processes. The all-in-one platform makes it so easy to integrate CRM, email marketing, and SMS campaigns under one roof. The level of customization is unmatched, and their customer support is always ready to help. Highly recommend it for any business looking to streamline their sales funnel!",
      image: JohnDoeImage,
    },
    {
      name: "SF Traders Company",
      review: "The website they developed for us is fantastic! It's visually appealing, fast, and user-friendly, which has drastically improved our online presence. The development team listened carefully to our requirements and executed them perfectly, incorporating great design elements and modern functionality. Our customers love the new look, and we've seen a significant increase in traffic and conversions.",
      image: "../../assets/buzzsols-logo-white.png",  
    },
    {
      name: "Karl Krummenacher",
      review: "This mobile app has changed the game for us. The interface is intuitive and the performance is incredibly smooth. From user onboarding to daily tasks, everything is seamless, making it a favorite among our users. The development team did a fantastic job incorporating feedback, and the end result is a high-quality app that exceeded our expectations!",
      image: karl,  
    },
    {
      name: "Richard Regaldo",
      review: "Their marketing expertise has significantly boosted our brand's visibility. The campaigns are creative, targeted, and have consistently delivered outstanding results. Their understanding of the latest digital marketing trends helped us tap into new markets and grow our customer base. Truly a great partner for scaling any business!",
      image: richard,  
    },
    {
        name: "Jonathan Patton",
        review: "Their ML solutions have been a game-changer for us. They helped us implement predictive analytics that not only improved our decision-making but also optimized key business processes. The algorithms they developed are accurate and have provided insights that were previously inaccessible. A fantastic team with deep expertise in machine learning and data science",
        image: jon, 
    },

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
      arrows: false,
    };
  
    return (
      <div className="my-8" style={{ color: "white" }}>
        <h3 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold mb-3" style={{ color: '#fff', marginRight: "4.7px" }}>
          Our <span style={{ color: "rgb(199,47,72)" }}>Reviews</span>
        </h3>
        <div className="review-carousel">
          <h2 className="text-center text-white heading geo">Customer Reviews</h2>
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="review-slide">
                <div className="review-content">
                  <img src={review.image} alt={review.name} className="review-image" />
                  <div className="review-text-container">
                    <p className="review-text">{review.review}</p>
                    <h4 className="review-author">- {review.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };
  
  export default ReviewCarousel;