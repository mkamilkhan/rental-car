import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';

const HeroCarousel = ({ title, subtitle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroVideos = [
    '/assets/vehicles/IMG_1631.MOV',
    '/assets/vehicles/IMG_1631.MOV', // Add more videos if available
    '/assets/vehicles/IMG_1631.MOV',
    '/assets/vehicles/IMG_1631.MOV',
    '/assets/vehicles/IMG_1631.MOV',
    '/assets/vehicles/IMG_1631.MOV'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroVideos.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [heroVideos.length]);

  return (
    <div className="hero-carousel">
      {heroVideos.map((video, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
            style={{ opacity: 0.85 }}
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      ))}
      <div className="hero-overlay">
        <div className="container">
          <div className="hero-content">
            {subtitle && <span className="hero-label">{subtitle}</span>}
            <h1>{title}</h1>
          </div>
        </div>
      </div>
      <div className="hero-indicators">
        {heroVideos.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;



