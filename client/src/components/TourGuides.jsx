import React, { useState } from 'react';
import { MessageCircle, Facebook, Instagram } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './TourGuides.css';

// Import your background video
// import desertBackgroundVideo from '../assets/IMG_21481.MOV';
// import desertBackgroundVideo from '../../public/assets/vehicles/MG_21481.MOV';

const heroVideos = 'https://res.cloudinary.com/dkjjrna9o/video/upload/v1769170577/rental-car/videos/IMG_1631.mov' // Cloudinary URL
;

const guides = [
  {
    id: 1,
    name: 'Osama Yousafzai',
    img: 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop',
    whatsapp: 'https://wa.me/923001234567',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 2,
    name: 'Manan Satti',
    img: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&auto=format&fit=crop',
    whatsapp: 'https://wa.me/923001234568',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 3,
    name: 'Aqib Ahmad',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop',
    highlighted: true,
    whatsapp: 'https://wa.me/923001234569',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 4,
    name: 'Shahid Khan',
    img: 'https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1740&auto=format&fit=crop',
    whatsapp: 'https://wa.me/923001234570',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
];

export default function TourGuides() {
  const [clickedCards, setClickedCards] = useState([]);

  const handleCardClick = (id) => {
    setClickedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  return (
    <section className="tour-guides-section">
      {/* Background Video */}
      <div className="tour-guides-background">
        <div
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
            preload="auto"
          >
            <source src={heroVideos} type="video/quicktime" />
            <source src={heroVideos} type="video/mp4" />
          </video>
        </div>



        <div className="tour-guides-overlay"></div>
      </div>

      <div className="tour-guides-container">
        <div className="tour-guides-header">
          <h3 className="tour-guides-subtitle">Meet with Guides</h3>
          <h2 className="tour-guides-title">Tour Guides</h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="tour-guides-swiper"
        >
          {guides.map((guide) => (
            <SwiperSlide key={guide.id}>
              <div
                className={`guide-card ${
                  guide.highlighted ? 'guide-card-highlighted' : ''
                } ${clickedCards.includes(guide.id) ? 'guide-card-clicked' : ''}`}
                onClick={() => handleCardClick(guide.id)}
              >
                <div className="guide-video-wrapper">
                  <img src={guide.img} className="guide-video" alt={guide.name} />
                </div>

                <div className="guide-content">
                  <h4 className="guide-name">{guide.name}</h4>
                  <p className="guide-role">Tourist Guide</p>

                  <div className="guide-social">
                    <a
                      href={guide.whatsapp}
                      className="social-icon social-icon-whatsapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle size={18} />
                    </a>
                    <a
                      href={guide.facebook}
                      className="social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href={guide.instagram}
                      className="social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/923001234567"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </section>
  );
}
