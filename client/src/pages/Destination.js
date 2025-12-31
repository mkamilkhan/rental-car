import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroCarousel from '../components/HeroCarousel';
import { useLanguage } from '../context/LanguageContext';
import './Destination.css';

const Destination = () => {
  const { t } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="destination-page">
      <HeroCarousel title={t('destination.title')} subtitle={t('destination.subtitle')} />

      <div className="destination-content">
        <div className="container">
          <div className="destination-intro">
            <span className="section-label">Destination</span>
            <h2>Dubai Red Dunes – Al Badayer</h2>
            <p>
              The heart of Dubai's desert adventure! Conquer massive dunes, enjoy panoramic views, and capture incredible photos at one of the UAE's most famous offroad spots.
            </p>
          </div>
          <div className="destination-main">
            <div className="destination-list">
              {loading ? (
                <div className="loading">{t('destination.loading')}</div>
              ) : (
                <div className="destination-cards">
                  {cars.map((car) => (
                    <div key={car._id} className="destination-card">
                      <div className="card-image-wrapper">
                        <img src={car.image} alt={car.name} />
                        {car.available ? (
                          <span className="availability-badge available">✓ Available</span>
                        ) : (
                          <span className="availability-badge unavailable">✗ Not Available</span>
                        )}
                      </div>
                      <div className="card-content">
                        <h3>{car.name}</h3>
                        <p>{car.brand} {car.model} ({car.year})</p>
                        <div className="card-details">
                          <span className="detail-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8518 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"/>
                            </svg>
                            {car.seats} {t('destination.seats')}
                          </span>
                          <span className="detail-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 19.07L16.24 16.24M19.07 4.93L16.24 7.76M4.93 19.07L7.76 16.24M4.93 4.93L7.76 7.76M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z"/>
                            </svg>
                            {car.transmission}
                          </span>
                          <span className="detail-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 3H21L19 12H5L3 3Z" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M5 12L4 21H20L19 12" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9 21V17H15V21" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {car.fuelType}
                          </span>
                        </div>
                        <div className="card-price">
                          {car.price60min ? (
                            <>
                              <span className="price">{car.price60min} {car.currency || 'AED'}</span>
                              <span className="price-label">{t('destination.per60min')}</span>
                            </>
                          ) : (
                            <>
                              <span className="price">{car.pricePerDay} {car.currency || 'AED'}</span>
                              <span className="price-label">{t('destination.perDay')}</span>
                            </>
                          )}
                        </div>
                        <Link 
                          to={`/car/${car._id}`} 
                          className={`btn btn-primary ${!car.available ? 'btn-disabled' : ''}`}
                          style={!car.available ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                        >
                          {car.available ? `${t('destination.bookNow')} →` : 'Not Available'}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="destination-sidebar">
              <div className="sidebar-section">
                <h3>{t('destination.basicInfo')}</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">{t('destination.destinationLabel')}</span>
                    <span className="info-value">{t('destination.variousLocations')}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">{t('destination.visaRequirements')}</span>
                    <span className="info-value">{t('destination.notRequired')}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">{t('destination.language')}</span>
                    <span className="info-value">English</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">{t('destination.currencyUsed')}</span>
                    <span className="info-value">AED</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">{t('destination.totalVehicles')}</span>
                    <span className="info-value">{cars.length} {t('destination.available')}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">{t('destination.perHour')}</span>
                    <span className="info-value">{t('destination.from')} 100 AED</span>
                  </div>
                </div>
              </div>

              <div className="sidebar-section">
                <h3>{t('destination.recentPosts')}</h3>
                <div className="recent-posts">
                  <div className="post-item">
                    <span className="post-date">22/8/2025</span>
                    <p>Harmony With Nature Of Belgium Tour And Travel</p>
                  </div>
                  <div className="post-item">
                    <span className="post-date">23/6/2025</span>
                    <p>Exploring The Green Spaces Of Realar Residence</p>
                  </div>
                </div>
              </div>

              <div className="sidebar-section">
                <h3>{t('destination.popularTags')}</h3>
                <div className="tags">
                  <span className="tag">Tour</span>
                  <span className="tag">Adventure</span>
                  <span className="tag">Travel</span>
                  <span className="tag">Hotel</span>
                  <span className="tag">Luxury</span>
                  <span className="tag">Explore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
