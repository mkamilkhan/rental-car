import React from 'react';


const HeroCarouselForAbout = ({ title, subtitle }) => {
  return (
    <div className="hero-carousel">
      <div className="hero-overlay"></div>
      <div className="hero-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroCarouselForAbout;
