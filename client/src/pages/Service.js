import React from "react";
import "./Service.css";

const galleryData = [
  {
    type: "video",
    src: "https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769170577/rental-car/videos/IMG_1631.mov",
    title: "Desert Quad Adventure",
    subtitle: "QUAD BIKE • DUBAI",
    count: "1/5",
    description: "Experience the thrill of quad biking through Dubai's golden dunes. Unforgettable adventure awaits!"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&q=80&fit=crop&auto=format",
    title: "Quad Bike Safari",
    subtitle: "ATV RENTAL • SHARJAH",
    count: "1/8",
    description: "Ride through the desert on our premium quad bikes. Perfect for adrenaline seekers!"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&q=80&fit=crop&auto=format",
    title: "Sunset Desert Tour",
    subtitle: "EVENING SAFARI • DUBAI",
    count: "1/6",
    description: "Witness the magical sunset over the desert dunes. A photographer's paradise!"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&q=80&fit=crop&auto=format",
    title: "Polaris RZR Experience",
    subtitle: "OFF-ROAD RENTAL • UAE",
    count: "1/4",
    description: "Powerful Polaris RZR for the ultimate desert adventure. Book your ride now!"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&q=80&fit=crop&auto=format",
    title: "Can-Am Maverick",
    subtitle: "LUXURY RIDE • DUBAI",
    count: "1/7",
    description: "Luxury meets adventure in our Can-Am Maverick. Premium comfort, extreme performance!"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&q=80&fit=crop&auto=format",
    title: "Dune Bashing",
    subtitle: "4X4 ADVENTURE • SHARJAH",
    count: "1/5",
    description: "Conquer the dunes with our professional 4x4 vehicles. Expert guides included!"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&q=80&fit=crop&auto=format",
    title: "Morning Quad Tour",
    subtitle: "EARLY BIRD • DUBAI",
    count: "1/3",
    description: "Start your day with an exhilarating quad bike tour. Cool morning breeze, hot adventure!"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&q=80&fit=crop&auto=format",
    title: "Family Desert Safari",
    subtitle: "GROUP TOUR • UAE",
    count: "1/6",
    description: "Perfect family adventure in the desert. Safe, fun, and memorable for all ages!"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&q=80&fit=crop&auto=format",
    title: "Night Desert Experience",
    subtitle: "STARGAZING • DUBAI",
    count: "1/4",
    description: "Experience the desert under the stars. Night quad biking with BBQ dinner included!"
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
            OUR <span>SERVICE</span>
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
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    preload="auto"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Video load error:', item.src);
                      e.target.style.display = 'none';
                    }}
                  >
                    <source src={item.src} type="video/quicktime" />
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={item.src} 
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div className="media-count">{item.count}</div>
              </div>

              <p className="story-text">
                {item.description || "Unforgettable desert experience. Highly recommended."}
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
