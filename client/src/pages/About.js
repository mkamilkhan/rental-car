import React from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

const About = () => {
  const { t } = useLanguage();
  return (
    <div className="about-page">
      <HeroCarousel title={t('about.title')} subtitle={t('about.subtitle')} />

      <div className="about-content">
        <div className="container">
          <div className="about-intro">
            <div className="intro-text">
              <span className="section-label">{t('about.exploreUs')}</span>
              <h2>Offroad Rental Hub</h2>
              <p>
                <strong>Dubai's ultimate destination for off-road adrenaline and desert exploration.</strong>
              </p>
              <p>
                We specialize in UTVs, ATVs, Can-Am, Polaris buggies, Dirt Bikes, and Yamaha Raptors, offering thrill-seekers and adventure lovers an unforgettable ride across the UAE's iconic red-sand dunes.
              </p>
              <p>
                Whether you crave a solo sprint through the dunes or a group ride into the desert sunset, our top-of-the-line vehicles deliver unmatched power, safety, and performance. Each machine is meticulously maintained to ensure every adventure runs smoothly so you can ride beyond limits and experience the true spirit of off-road freedom.
              </p>
              <p>
                At Offroad Rental Hub, we don't just rent vehicles, we create memories. Our expert team provides safety briefings, guided tours, and customized experiences for all levels, from first-time riders to seasoned off-road enthusiasts.
              </p>
              <p>
                Join us to discover the wild beauty of Dubai's desert, the rush of the dunes, and the thrill of control behind the wheel of the world's most powerful off-road machines.
              </p>
              <p style={{fontSize: '18px', fontWeight: '700', color: '#ff6b35', marginTop: '20px'}}>
                Ride it. Feel it. Live it with Offroad Rental Hub.
              </p>
            </div>
            <div className="intro-images">
              <div className="image-card">
                <img src="/assets/vehicles/polaris-rzr1000.jpg" alt="Adventure" />
              </div>
              <div className="image-card">
                <img src="/assets/vehicles/canam-maverick-turbo.jpg" alt="Desert" />
              </div>
            </div>
          </div>

          <div className="newsletter-section">
            <h3>{t('about.newsletter')}</h3>
            <div className="newsletter-form">
              <input type="email" placeholder={t('about.enterEmail')} />
              <button className="btn btn-primary">{t('about.subscribe')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

