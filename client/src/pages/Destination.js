import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroCarousel from '../components/HeroCarousel';
import { useLanguage } from '../context/LanguageContext';
import './Destination.css';

const Destination = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/cars`);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      // Mock data for testing
      setCars([
        {
          _id: '1',
          name: 'Polaris RZR Pro R',
          brand: 'Polaris',
          model: 'RZR Pro R',
          year: '2024',
          image: 'https://images.unsplash.com/photo-1717169022464-1f50760d480e?w=800&h=600&fit=crop',
          available: true,
          seats: 2,
          transmission: 'Automatic',
          fuelType: 'Petrol',
          price60min: 500,
          pricePerDay: 2000,
          currency: 'AED',
          category: '2-seater',
          tier: 'TOP TIER',
          specs: {
            engine: '225 HP ProStar',
            suspension: 'MaxLink 29"',
            control: 'Dynamix DV',
            capacity: '2 Persons',
            power: '225 HP',
            travel: '29 Inches'
          }
        },
        {
          _id: '2',
          name: 'Can-Am Maverick X3',
          brand: 'Can-Am',
          model: 'Maverick X3',
          year: '2024',
          image: 'https://images.unsplash.com/photo-1766090648323-41d6b4de0958?w=800&h=600&fit=crop',
          available: true,
          seats: 4,
          transmission: 'Automatic',
          fuelType: 'Petrol',
          price60min: 600,
          pricePerDay: 2500,
          currency: 'AED',
          category: '4-seater',
          tier: 'FAMILY',
          specs: {
            engine: '200 HP Turbo',
            suspension: '22 Inches',
            control: 'Full Cage',
            capacity: '4 Persons',
            power: '200 HP Turbo',
            travel: '22 Inches',
            safety: 'Full Cage'
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = activeTab === 'all'
  ? cars
  : cars.filter(car => car.seats === Number(activeTab));

  return (
    <div className="fleet-page">


      {/* Hero Section */}
      <section className="fleet-hero">
        <video
          className="fleet-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769170577/rental-car/videos/IMG_1631.mov" type="video/mp4" />
          <source src="https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769170577/rental-car/videos/IMG_1631.mov" type="video/quicktime" />
        </video>

        <div className="fleet-hero-overlay"></div>

        <div className="fleet-hero-content">
          <div className="hero-badge">THE GARAGE</div>

          <h1 className="hero-title">
            OUR <span className="outline-text">FLEET</span>
          </h1>

          <p className="hero-subtitle">
            High-performance 5-seater buggies built for extreme desert adventure.
          </p>
        </div>
      </section>



      {/* Filter Tabs */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-tabs">
          <button
  className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
  onClick={() => setActiveTab('all')}
>
  All Models
</button>

<button
  className={`filter-tab ${activeTab === '2' ? 'active' : ''}`}
  onClick={() => setActiveTab('2')}
>
  2-Seaters
</button>

<button
  className={`filter-tab ${activeTab === '4' ? 'active' : ''}`}
  onClick={() => setActiveTab('4')}
>
  4-Seaters
</button>

          </div>
        </div>
      </section>

      {/* Vehicle Cards */}
      <section className="vehicles-section">
        <div className="container">
          {loading ? (
            <div className="loading-state">Loading fleet...</div>
          ) : (
            <div className={`vehicle-grid ${activeTab === 'all' ? 'two-col' : ''}`}>
              {filteredCars.map((car) => (
                <div key={car._id} className="vehicle-card">
                  <div className="vehicle-image-wrapper">
                    <img src={car.image} alt={car.name} />
                    {car.tier && (
                      <span className={`tier-badge ${car.tier.toLowerCase().replace(' ', '-')}`}>
                        {car.tier}
                      </span>
                    )}
                  </div>

                  <div className="vehicle-info">
                    <h3 className="vehicle-name">{car.name}</h3>
                    <p className="vehicle-subtitle">
                      {car.specs?.power || `${car.brand} ${car.model}`} / {car.seats} SEATER
                    </p>

                    <div className="vehicle-specs">
                      <div className="spec-row">
                        <div className="spec-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          <div>
                            <span className="spec-label">ENGINE</span>
                            <span className="spec-value">{car.specs?.engine || '225 HP ProStar'}</span>
                          </div>
                        </div>
                        <div className="spec-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                          <div>
                            <span className="spec-label">SUSPENSION</span>
                            <span className="spec-value">{car.specs?.suspension || 'MaxLink 29"'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="spec-row">
                        <div className="spec-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                          <div>
                            <span className="spec-label">{car.specs?.safety ? 'SAFETY' : 'CONTROL'}</span>
                            <span className="spec-value">{car.specs?.safety || car.specs?.control || 'Dynamix DV'}</span>
                          </div>
                        </div>
                        <div className="spec-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          <div>
                            <span className="spec-label">CAPACITY</span>
                            <span className="spec-value">{car.specs?.capacity || `${car.seats} Persons`}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="vehicle-footer">
                      <div className="price-section">
                        <span className="price-label">Starting from</span>
                        <span className="price-value">ASK PRICE</span>
                      </div>
                      <div className="action-buttons">
                        <button
                          className="btn-book"
                          onClick={() =>
                            window.open(
                              'https://wa.me/971564455568?text=Hi! I want to book a desert safari. Please share details.',
                              '_blank'
                            )
                          }
                        >
                          BOOK NOW
                        </button>

                        <Link to={`/car/${car._id}`} >
                          <button className="btn-details">DETAILS</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-section">
        <div className="container">
          <p className="section-label-gold">TECHNICAL SPECS</p>
          <h2 className="section-title-white">
            COMPARE THE <span className="highlight-text">BEASTS</span>
          </h2>
          <p className="section-subtitle-white">Find the right machine for your driving style.</p>

          <div className="comparison-table">
            <div className="comparison-header">
              <div className="feature-col">FEATURE</div>
              <div className="vehicle-col">RZR 2000CC</div>
              <div className="vehicle-col">RZR 1000CC</div>
              <div className="vehicle-col">MAVERICK X3</div>
            </div>

            <div className="comparison-row">
              <div className="feature-col">Horsepower</div>
              <div className="vehicle-col">
                <span className="stat-value gold">225 HP</span>
                <div className="progress-bar">
                  <div className="progress-fill gold" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="vehicle-col">
                <span className="stat-value">110 HP</span>
                <div className="progress-bar">
                  <div className="progress-fill gray" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div className="vehicle-col">
                <span className="stat-value">200 HP</span>
                <div className="progress-bar">
                  <div className="progress-fill gray" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            <div className="comparison-row">
              <div className="feature-col">Skill Level</div>
              <div className="vehicle-col">
                <span className="badge-level red">PRO/EXPERT</span>
              </div>
              <div className="vehicle-col">
                <span className="badge-level green">ALL LEVELS</span>
              </div>
              <div className="vehicle-col">
                <span className="badge-level red">ADVANCED</span>
              </div>
            </div>

            <div className="comparison-row">
              <div className="feature-col">Suspension Travel</div>
              <div className="vehicle-col gold">29" (Active)</div>
              <div className="vehicle-col">20" (Standard)</div>
              <div className="vehicle-col">22" (Fox Podium)</div>
            </div>

            <div className="comparison-row">
              <div className="feature-col">Top Speed (Sand)</div>
              <div className="vehicle-col">
                <span className="stat-value gold">~140 km/h</span>
                <div className="progress-bar">
                  <div className="progress-fill gold" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="vehicle-col">
                <span className="stat-value">~100 km/h</span>
                <div className="progress-bar">
                  <div className="progress-fill gray" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="vehicle-col">
                <span className="stat-value">~130 km/h</span>
                <div className="progress-bar">
                  <div className="progress-fill gray" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="guarantee-section">
        <div className="container">
          <div className="guarantee-box">
            <div className="guarantee-icon">🔧</div>
            <h2 className="guarantee-title">FACTORY FRESH GUARANTEE</h2>
            <p className="guarantee-text">
              Our buggies are inspected by certified mechanics after <strong>every single trip</strong>. We check tire pressure, belt condition, suspension integrity, and fluid levels to ensure you never face a breakdown in the deep desert.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="faq-title">
            FREQUENTLY ASKED <span className="highlight-text">QUESTIONS</span>
          </h2>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                DO I NEED A DRIVER'S LICENSE?
                <span className="faq-icon">▼</span>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                IS THERE A MINIMUM AGE?
                <span className="faq-icon">▼</span>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                WHAT SHOULD I WEAR?
                <span className="faq-icon">▼</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-fleet">
        <div className="container">
          <p className="cta-label">WANT TO RIDE SOLO?</p>
          <h2 className="cta-title">MASTER THE HANDLEBARS</h2>
          <p className="cta-text">
            Experience the agility of our Quad Bike fleet. Perfect for solo riders seeking total freedom.
          </p>
          <button className="btn-cta">EXPLORE ATV QUADS →</button>
        </div>
      </section>


    </div>
  );
};

export default Destination;
