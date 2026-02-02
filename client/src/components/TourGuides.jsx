import React, { useState } from 'react';
import { MessageCircle, Facebook, Instagram } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './TourGuides.css';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import aziz from '../assets/aziz.jpeg'
import Guma from '../assets/Guma.jpeg'
import Hafiz from '../assets/Hafiz.jpeg'
import imtiyaz from '../assets/imtiyaz.jpeg'
import manan from '../assets/manan.jpeg'
import nazeer from '../assets/nazeer.jpeg'
import nazimKtk from '../assets/nazimKtk.jpeg'
import roni from '../assets/roni.jpeg'
import shahid from '../assets/shahid.jpeg'

// Import your background video
// import desertBackgroundVideo from '../assets/IMG_21481.MOV';
// import desertBackgroundVideo from '../../public/assets/vehicles/MG_21481.MOV';

const heroVideos = 'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769170577/rental-car/videos/IMG_1631.mov' // Cloudinary URL with MP4 format
;

const guides = [
  {
    id: 1,
    name: 'Aziz',
    img: aziz,
    whatsapp: 'https://wa.me/923001234567',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 2,
    name: 'Guma',
    img: Guma,
    whatsapp: 'https://wa.me/923001234568',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 3,
    name: 'Hafiz',
    img: Hafiz,
    highlighted: true,
    whatsapp: 'https://wa.me/923001234569',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 4,
    name: 'imtiyaz',
    img: imtiyaz,
    whatsapp: 'https://wa.me/923001234570',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 5,
    name: 'manan',
    img: manan,
    whatsapp: 'https://wa.me/923001234570',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 6,
    name: 'Nazir',
    img: nazeer,
    whatsapp: 'https://wa.me/923001234570',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 7,
    name: 'Nazim Khattak',
    img: nazimKtk,
    whatsapp: 'https://wa.me/923001234570',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 8,
    name: 'Roni',
    img: roni,
    whatsapp: 'https://wa.me/923001234570',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  {
    id: 9,
    name: 'Shahid',
    img: shahid,
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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="tour-guides-video"
          preload="auto"
        >
          <source src={heroVideos} type="video/quicktime" />
          <source src={heroVideos} type="video/mp4" />
        </video>
        <div className="tour-guides-overlay"></div>
      </div>

      <div className="tour-guides-container">
        <div className="tour-guides-header">
          <div className="header-decoration">
            <span className="decoration-line"></span>
            <span className="decoration-dot"></span>
            <span className="decoration-line"></span>
          </div>
          <h3 className="tour-guides-subtitle">Meet with Guides</h3>
          <h2 className="tour-guides-title">Professional Tour Guides</h2>
          <p className="tour-guides-description">
            Expert guides ready to make your journey unforgettable
          </p>
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
                <div className="guide-image-wrapper">
                  <img 
                    src={guide.img} 
                    className="guide-image" 
                    alt={guide.name}
                    loading="lazy"
                  />
                  <div className="guide-image-border"></div>
                  <div className="guide-badge">
                    <span className="badge-icon">★</span>
                  </div>
                </div>

                <div className="guide-content">
                  <h4 className="guide-name">{guide.name}</h4>
                  <p className="guide-role">Tourist Guide</p>
                  <div className="guide-divider"></div>

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
                      className="social-icon social-icon-facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href={guide.instagram}
                      className="social-icon social-icon-instagram"
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
        <span className="whatsapp-pulse"></span>
      </a>
    </section>
  );
}
