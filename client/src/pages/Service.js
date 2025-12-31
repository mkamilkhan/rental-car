import React from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import { useLanguage } from '../context/LanguageContext';
import './Service.css';

const Service = () => {
  const { t } = useLanguage();
  const services = [
    {
      id: 1,
      title: 'UTV & ATV Rentals',
      image: '/assets/vehicles/polaris-rzr1000.jpg',
      description: 'Polaris RZR 1000 (1-Seater, 2-Seater, 4-Seater), Can-Am Maverick R / X3 / Golden Edition, Yamaha Raptor & Dirt Bikes'
    },
    {
      id: 2,
      title: 'Guided Desert Tours',
      image: '/assets/vehicles/canam-maverick-turbo.jpg',
      description: 'Enjoy professionally guided adventures with safety gear, sand boarding, refreshments, and full support — available for beginners and pros.'
    },
    {
      id: 3,
      title: 'Private & Group Adventures',
      image: '/assets/vehicles/polaris-rzr1000-4seater.jpg',
      description: 'From solo adrenaline seekers to corporate groups, we organize tailor-made rides for every kind of explorer.'
    },
    {
      id: 4,
      title: 'Photography & Video',
      image: '/assets/vehicles/dirt-bike.jpg',
      description: 'Capture your thrilling ride with drone shots and HD recordings to make your experience truly unforgettable.'
    },
    {
      id: 5,
      title: 'Pick-up & Drop-off Services',
      image: '/assets/vehicles/canam-maverick-x3.jpg',
      description: 'Convenient transportation from your Dubai location to our desert camp and back.'
    }
  ];

  return (
    <div className="service-page">
      <HeroCarousel title={t('service.title')} subtitle={t('service.subtitle')} />

      <div className="service-content">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <Link to="/destination" className="btn btn-service">
                    {t('service.bookNow')} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

