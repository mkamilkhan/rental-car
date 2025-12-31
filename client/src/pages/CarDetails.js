import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`/api/cars/${id}`);
      setCar(response.data);
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    // Users can book without login - directly navigate to booking form
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return <div className="loading">Loading car details...</div>;
  }

  if (!car) {
    return <div className="container">Car not found</div>;
  }
console.log(car,'imag')
  return (
    <div className="car-details">
      <div className="container">
        <Link to="/" className="back-link">← Back to Home</Link>
        <div className="car-details-content">
          <div className="car-image-section">
            <div className="car-image-wrapper">
            <img
  src={`http://localhost:3000/${car.image}`}
  alt={car.name}
/>

              {car.available ? (
                <span className="availability-badge-large available">✓ Available Now</span>
              ) : (
                <span className="availability-badge-large unavailable">✗ Currently Not Available</span>
              )}
            </div>
          </div>
          <div className="car-info-section">
            <div className="car-title-section">
              <h1>{car.name}</h1>
              {car.available ? (
                <span className="availability-status available">Available</span>
              ) : (
                <span className="availability-status unavailable">Not Available</span>
              )}
            </div>
            <p className="car-subtitle">{car.brand} {car.model} • {car.year}</p>
            <div className="car-specs">
              <div className="spec-item">
                <span className="spec-label">Seats</span>
                <span className="spec-value">{car.seats}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Transmission</span>
                <span className="spec-value">{car.transmission}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Fuel Type</span>
                <span className="spec-value">{car.fuelType}</span>
              </div>
            </div>
            {car.description && (
              <div className="car-description">
                <h3>Description</h3>
                <p>{car.description}</p>
              </div>
            )}
            <div className="pricing-section">
              <h3>Rental Pricing</h3>
              {car.price60min && (
                <div className="price-option">
                  <span className="price-duration">60 min</span>
                  <span className="price-amount">{car.price60min} {car.currency || 'AED'}</span>
                </div>
              )}
              {car.price30min && (
                <div className="price-option">
                  <span className="price-duration">30 min</span>
                  <span className="price-amount">{car.price30min} {car.currency || 'AED'}</span>
                </div>
              )}
              {!car.price30min && !car.price60min && (
                <div className="price-option">
                  <span className="price-duration">Per Day</span>
                  <span className="price-amount">{car.pricePerDay} {car.currency || 'AED'}</span>
                </div>
              )}
            </div>
            <div className="booking-section">
              <button
                onClick={handleBookNow}
                className={`btn btn-primary btn-large ${!car.available ? 'btn-disabled' : ''}`}
                disabled={!car.available}
              >
                {car.available ? 'Book Now' : 'Not Available for Booking'}
              </button>
              {!car.available && (
                <p className="unavailable-message">
                  This vehicle is currently not available. Please check back later or contact us for availability.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;