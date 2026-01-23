import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import './Activities.css';

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: 'Dune Bashing',
      image: '/assets/vehicles/polaris-rzr1000.jpg',
      description: 'Experience the thrill of driving through sand dunes'
    },
    {
      id: 2,
      title: 'ATV Riding',
      image: '/assets/vehicles/quad-bike-single.jpg',
      description: 'Ride through desert landscapes on powerful ATVs'
    },
    {
      id: 3,
      title: 'UTV Tours',
      image: '/assets/vehicles/canam-maverick-turbo.jpg',
      description: 'Explore desert in powerful UTVs'
    },
    {
      id: 4,
      title: 'Dirt Bike Rides',
      image: '/assets/vehicles/dirt-bike.jpg',
      description: 'Surf down sand dunes on a board'
    },
    {
      id: 5,
      title: 'Desert Safari',
      image: '/assets/vehicles/polaris-rzr1000-4seater.jpg',
      description: 'Full day desert adventure experience'
    },
    {
      id: 6,
      title: 'Premium Rides',
      image: '/assets/vehicles/canam-maverick-xrs.jpg',
      description: 'Watch the sunset from the highest dunes'
    }
  ];

  return (
    <div className="activities-page">
      <HeroCarousel title="Activities" subtitle="Home → Activities" />

      <div className="activities-content">
        <div className="container">
          <div className="activities-intro">
            <span className="section-label">Adventure Awaits</span>
            <h2>Exciting Activities For Everyone</h2>
            <p>
              Discover a wide range of thrilling activities designed to give you 
              an unforgettable adventure experience. From dune bashing to camel riding, 
              we have something for everyone.
            </p>
          </div>

          <div className="activities-grid">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-card">
                <div className="activity-image">
                  <img src={activity.image} alt={activity.title} />
                  <div className="activity-overlay">
                    <button className="btn btn-primary">Book Now</button>
                  </div>
                </div>
                <div className="activity-info">
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;

