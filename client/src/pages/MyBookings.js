import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import './MyBookings.css';

const MyBookings = () => {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/my-bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm(t('myBookings.cancelConfirm'))) {
      return;
    }

    try {
      await axios.put(`/api/bookings/${bookingId}/cancel`);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || t('myBookings.cancelError'));
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { class: 'status-pending', text: t('myBookings.statusPending') },
      confirmed: { class: 'status-confirmed', text: t('myBookings.statusConfirmed') },
      cancelled: { class: 'status-cancelled', text: t('myBookings.statusCancelled') },
      completed: { class: 'status-completed', text: t('myBookings.statusCompleted') }
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  if (loading) {
    return <div className="loading">{t('myBookings.loading')}</div>;
  }

  return (
    <div className="my-bookings">
      <div className="container">
        <div className="bookings-header">
          <h1>{t('myBookings.title')}</h1>
          <p className="bookings-subtitle">{t('myBookings.subtitle')}</p>
        </div>
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <div className="no-bookings-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>{t('myBookings.noBookingsTitle')}</h3>
            <p>{t('myBookings.noBookingsDesc')}</p>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-car-section">
                  <div className="car-image-wrapper">
                    <img src={booking.car.image} alt={booking.car.name} />
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="car-info">
                    <h3>{booking.car.name}</h3>
                    <p className="car-subtitle">{booking.car.brand} {booking.car.model} ({booking.car.year})</p>
                    <div className="car-specs">
                      {booking.car.seats && <span className="spec-badge">👥 {booking.car.seats} Seats</span>}
                      {booking.car.transmission && <span className="spec-badge">⚙️ {booking.car.transmission}</span>}
                      {booking.car.fuelType && <span className="spec-badge">⛽ {booking.car.fuelType}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="booking-details-section">
                  <h4 className="section-title">{t('myBookings.bookingDetails')}</h4>
                  <div className="booking-details-grid">
                    <div className="detail-item">
                      <div className="detail-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">{t('myBookings.startDate')}</span>
                        <span className="detail-value">{new Date(booking.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <div className="detail-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">{t('myBookings.endDate')}</span>
                        <span className="detail-value">{new Date(booking.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <div className="detail-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">{t('myBookings.duration')}</span>
                        <span className="detail-value">{booking.totalDays} {booking.totalDays === 1 ? t('myBookings.day') : t('myBookings.days')}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <div className="detail-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM13 9H11V7H13V9Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">{t('myBookings.totalPrice')}</span>
                        <span className="detail-value price-highlight">{booking.totalPrice} {booking.car.currency || 'AED'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {booking.pickupLocation && (
                    <div className="pickup-location">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{booking.pickupLocation}</span>
                    </div>
                  )}
                  
                  {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <div className="booking-actions">
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="btn-cancel"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('myBookings.cancelBooking')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

