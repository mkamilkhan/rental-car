import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';
import './CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currency, getCurrencySymbol } = useCurrency();
  const pricingRef = useRef(null);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);



  
  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/cars/${id}`
      );
      setCar(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!car) return <div className="container">Not Found</div>;
console.log(car)
  return (
    <div className="car-details-page">

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section-detail">
        <div className="hero-background">
          <img
            src={car.image}
            alt={car.name}
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/800x500?text=Vehicle+Image';
            }}
          />
          <div className="hero-overlay-detail"></div>
        </div>

        <div className="hero-content-detail">
          <h1 className="hero-title-detail">{car.name}</h1>

          <p className="hero-tagline">
            {car.description}
          </p>

          <div className="hero-buttons">
            <button className="btn-view-pricing" onClick={scrollToPricing}>
              VIEW PRICING
            </button>

            <button className="btn-ask-question">
              ASK A QUESTION
            </button>
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE SECTION ================= */}
      <section className="experience-section">
        <div className="experience-container">

          <div className="experience-left">
            <h2 className="experience-title">The Experience</h2>

            <p className="experience-text">
              {car.description}
            </p>

            {/* WHAT'S INCLUDED */}
            <div className="whats-included">
              <h3 className="included-title">WHAT'S INCLUDED</h3>

              <div className="included-grid">

                <div className="included-item">
                  <div className="included-icon">⚙</div>
                  <div className="included-content">
                    <h4>Transmission</h4>
                    <p>{car.transmission || 'Manual'}</p>
                  </div>
                </div>

                <div className="included-item">
                  <div className="included-icon">🛡</div>
                  <div className="included-content">
                    <h4>Safety</h4>
                    <p>Safety equipment provided</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ================= QUICK STATS ================= */}
          <div className="quick-stats-sidebar">
            <h3 className="stats-title">Quick Stats</h3>

            <div className="stats-list">
              <div className="stat-row">
                <span className="stat-label">Vehicle Name</span>
                <span className="stat-value">{car.name}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Transmission</span>
                <span className="stat-value">
                  {car.transmission || 'Manual'}
                </span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Availability</span>
                <span className="stat-value">
                  {car.available ? 'Available' : 'Not Available'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= PRICING SECTION ================= */}
      <section className="pricing-section" ref={pricingRef}>
        <div className="pricing-header">
          <p className="pricing-subtitle">SELECT DURATION</p>
          <h2 className="pricing-title">
            PRICING <span className="title-outline-pricing">OPTIONS</span>
          </h2>
        </div>

        <div className="pricing-cards">

          {car.price30min && (
            <div className="pricing-card popular">
              <div className="popular-badge">MOST POPULAR</div>
              <h3 className="pricing-duration">30 MINUTES</h3>
              <div className="pricing-amount">
                {/* {getCurrencySymbol(currency)} */}
                 {car.price30min} AED
              </div>
              <p className="pricing-per">Per Vehicle</p>

              <button
                className="pricing-book-btn popular-btn"
                onClick={() => navigate(`/booking/${id}`)}
              >
                BOOK NOW
              </button>
            </div>
          )}

          {car.price60min && (
            <div className="pricing-card">
              <h3 className="pricing-duration">60 MINUTES</h3>
              <div className="pricing-amount">
                {/* {getCurrencySymbol(currency)}  */}
                {car.price60min} AED
              </div>
              <p className="pricing-per">Per Vehicle</p>

              <button
                className="pricing-book-btn"
                onClick={() => navigate(`/booking/${id}`)}
              >
                BOOK NOW
              </button>
            </div>
          )}

          {car.price90min != null && car.price90min !== '' && (
            <div className="pricing-card">
              <h3 className="pricing-duration">90 MINUTES</h3>
              <div className="pricing-amount">
                {/* {getCurrencySymbol(currency)} */}
                 {car.price90min} AED
              </div>
              <p className="pricing-per">Per Vehicle</p>

              <button
                className="pricing-book-btn"
                onClick={() => navigate(`/booking/${id}`)}
              >
                BOOK NOW
              </button>
            </div>
          )}

          {car.price120min != null && car.price120min !== '' && (
            <div className="pricing-card">
              <h3 className="pricing-duration">120 MINUTES</h3>
              <div className="pricing-amount">
                {/* {getCurrencySymbol(currency)} */}
                 {car.price120min} AED
              </div>
              <p className="pricing-per">Per Vehicle</p>

              <button
                className="pricing-book-btn"
                onClick={() => navigate(`/booking/${id}`)}
              >
                BOOK NOW
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ================= BACK ================= */}
      <div className="back-to-collection">
        <Link to="/" className="back-link-detail">
          ← BACK TO COLLECTION
        </Link>
      </div>

    </div>
  );
};

export default CarDetails;
