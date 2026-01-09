import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/cars/${id}`
      );
      setCar(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!car) return <div className="container">Not Found</div>;

  return (
    <div className="vehicle-details-page">
      <div className="container">
        <Link to="/" className="back-link">← Back</Link>

        <div className="vehicle-details-grid">
          {/* IMAGE */}
          <div className="vehicle-image-box">
            <img
              src={car.image}
              alt={car.name}
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/800x500?text=Vehicle+Image';
              }}
            />
          </div>

          {/* INFO */}
          <div className="vehicle-info-box">
            <h1 className="vehicle-title">{car.name}</h1>

            <div className="vehicle-meta">
              <span>⚙ {car.transmission || 'Manual'}</span>
              <span>🛡 Safety Provided</span>
              <span>⏱ 30 / 60 / 90 / 120 MIN</span>
            </div>

            <p className="vehicle-description">
              {car.description ||
                'Designed for greater control and easy handling, this vehicle is ideal for desert adventure rides.'}
            </p>

            <div className="vehicle-price">
              Starts from / per vehicle
              <strong>
                {car.currency || 'AED'} {car.price30min || car.pricePerDay}
              </strong>
            </div>

            <button
              className="book-now-btn"
              onClick={() => navigate(`/booking/${id}`)}
              disabled={!car.available}
            >
              {car.available ? 'BOOK NOW' : 'NOT AVAILABLE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
