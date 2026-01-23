import React from "react";
import "./Service.css";

import aboutHero from "../assets/About-hero.jpg";
import CanAmMaverickXRS from "../assets/CanAm-maverick XRS-Two-Seater.jpeg";
import desertCar from "../assets/desertCar.jpeg";
import desertQuads from "../assets/desertQuads.jpeg";
import PolarisPro from "../assets/Polaris-rzr-Pro.jpeg";
import Polaris4Seater from "../assets/Polaris-rzr1000-four-seate.jpeg";
import Polaris1Seater from "../assets/Polaris-rzr1000-single-seater.jpeg";

const galleryData = [
  {
    type: "video",
    src: "https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769170577/rental-car/videos/IMG_1631.mov",
    title: "The Maverick Crew",
    subtitle: "POLARIS 2000CC • UK",
    count: "1/3",
  },
  {
    type: "image",
    src: CanAmMaverickXRS,
    title: "Extreme Ride",
    subtitle: "CAN-AM • UAE",
    count: "1/4",
  },
  {
    type: "image",
    src: aboutHero,
    title: "Sunset Safari",
    subtitle: "PRIVATE TOUR",
    count: "1/5",
  },
  {
    type: "image",
    src: desertQuads,
    title: "Quad Adventure",
    subtitle: "ATV EXPERIENCE",
    count: "1/3",
  },
  {
    type: "image",
    src: PolarisPro,
    title: "Polaris Pro",
    subtitle: "OFF-ROAD BEAST",
    count: "1/4",
  },
  {
    type: "image",
    src: Polaris4Seater,
    title: "Family Ride",
    subtitle: "4 SEATER",
    count: "1/6",
  },
  {
    type: "image",
    src: Polaris1Seater,
    title: "Solo Drive",
    subtitle: "SINGLE SEATER",
    count: "1/2",
  },
  {
    type: "image",
    src: desertCar,
    title: "Desert Drive",
    subtitle: "4X4 EXPERIENCE",
    count: "1/3",
  },
];

const Service = () => {
  return (
    <div className="service-page">
      {/* HERO */}
      <section className="service-fleet-hero">
        <video className="service-fleet-hero-video" autoPlay muted loop playsInline preload="auto">
          <source src="https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769173190/rental-car/videos/IMG_28415.mov" type="video/mp4" />
          <source src="https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769173190/rental-car/videos/IMG_28415.mov" type="video/quicktime" />
        </video>
        <div className="service-fleet-hero-overlay" />
        <div className="service-fleet-hero-content">
          <div className="service-hero-badge">THE GARAGE</div>
          <h1 className="service-hero-title">
            OUR <span>GALLERY</span>
          </h1>
          <p className="service-gallery-subtitle">
          "See the adventure through the eyes of our riders. Unfiltered, raw, and unforgettable."
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <div className="service-content">
        <div className="captured-moments">
          <p className="captured-moments-title">The Gallery</p>
         <p className="captured-moments-des">CAPTURED MOMENTS</p>
        </div>
        <div className="story-grid">
          {galleryData.map((item, index) => (
            <div className="story-card" key={index}>
              <div className="story-header">
                <div className="avatar" />
                <div>
                  <h4>{item.title}</h4>
                  <span>{item.subtitle}</span>
                </div>
              </div>

              <div className="story-media">
                {item.type === "video" ? (
                  <video autoPlay muted loop playsInline preload="auto">
                    <source src={item.src} type="video/quicktime" />
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img src={item.src} alt={item.title} />
                )}
                <div className="media-count">{item.count}</div>
              </div>

              <p className="story-text">
                “Unforgettable desert experience. Highly recommended.”
              </p>

              <button className="story-btn">BOOK THIS RIDE</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
