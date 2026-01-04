import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';
import CategoriesSlider from "../components/CategoriesSlider";

// import CanAmTwo from "../assets/CanAm-maverick XRS-Two-Seater.jpeg";
import CanAmTurbo from "../assets/CanAm-Maverick-Turbo-RS.jpeg";
import CanAmSport from "../assets/CanAm-maverick-XRS-Turbo-sports.jpeg";
import DirtBike from "../assets/Dirt-bike.jpeg";
import Polaris1000 from "../assets/Polaris-rzr-1000.jpg";
import PolarisPro from "../assets/Polaris-rzr-Pro.jpeg";
// import Polaris2Seater from "../assets/Polaris-rzr1000-2-seater.jpeg";
// import Polaris4Seater from "../assets/Polaris-rzr1000-four-seater.jpeg";
// import Polaris1Seater from "../assets/Polaris-rzr1000-single-seater.jpeg";
import QuadBike from "../assets/QuadBike.jpeg";
import YamahaRaptor from "../assets/Yamaha-raptor.jpeg";


const Home = () => {
  const { t, isRTL } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
// 

// const categories = [
//   { name: "CanAm Maverick R", image: "/assets/vehicles/quad-bike-single.jpg" },
//   { name: "CanAm Maverick RS", image: "/assets/vehicles/polaris-rzr1000.jpg" },
//   { name: "Polaris RZR 1000", image: "/assets/vehicles/dirt-bike.jpg" },
//   { name: "Dirt Bikes", image: "/assets/vehicles/polaris-rzr1000-4seater.jpg" },
// ];


  // Hero background videos
  const heroVideos = [
    '/assets/vehicles/IMG_1631.MOV',
    '/assets/vehicles/IMG_1631.MOV', // Add more videos if available
    '/assets/vehicles/IMG_1631.MOV',
    '/assets/vehicles/IMG_1631.MOV',
    '/assets/vehicles/IMG_1631.MOV',
    '/assets/vehicles/IMG_1631.MOV'
  ];

  useEffect(() => {
    fetchCars();
  }, []);

  // Auto-change hero background every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroVideos.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [heroVideos.length]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cars');
      setCars(response.data.slice(0, 6)); // Show only 6 for home page
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    
    // { name: 'ATV Rides', image: '/assets/vehicles/quad-bike-single.jpg' },
    // { name: 'UTV Tours', image: '/assets/vehicles/polaris-rzr1000.jpg' },
    // { name: 'Dirt Bikes', image: '/assets/vehicles/dirt-bike.jpg' },
    // { name: 'Family Tours', image: '/assets/vehicles/polaris-rzr1000-4seater.jpg' },
    // { name: 'Premium Rides', image: '/assets/vehicles/canam-maverick-xrs.jpg' }
    { name: 'CanAm Maverick R', image: CanAmTurbo },
    { name: 'CanAm Maverick RS', image: CanAmSport},
    { name: 'Polaris rzr 1000', image: Polaris1000 },
    { name: 'Dirt Bikes', image: DirtBike },
    { name: 'Yamaha Raptors ', image: YamahaRaptor },
    { name: 'Polaris Rzr Pro', image: PolarisPro },
    { name: 'Single Quad bikes (Open desert) ', image: QuadBike },
    { name: 'Double Quad Bikes (Open Desert)', image: QuadBike }
  ];
  
  return (
    <div className="home">

      <div className="hero-section">
        {heroVideos.map((video, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hero-video"
              style={{ opacity: 0.85 }}
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        ))}
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <span className="hero-label">Welcome to Offroad Rental Hub</span>
              <h1>Your Ultimate Desert Adventure Awaits!</h1>
              <p style={{fontSize: '20px', marginBottom: '30px', maxWidth: '800px', margin: '0 auto 30px', lineHeight: '1.6'}}>
                Ride beyond limits with Dubai's most thrilling offroad experiences. Whether you crave the power of a Polaris RZR, the luxury of a Can-Am Maverick R, or the wild spirit of a Yamaha Raptor, we've got the perfect machine for your adrenaline rush.
              </p>
              <p style={{fontSize: '18px', marginBottom: '30px', maxWidth: '800px', margin: '0 auto 30px', lineHeight: '1.6'}}>
                Explore Dubai's legendary red-sand dunes, feel the wind of the open desert, and create unforgettable memories with our expert-guided tours. From sunrise rides to sunset escapes every moment is pure adventure.
              </p>
              <p style={{fontSize: '22px', fontWeight: '700', color: '#ff6b35', marginTop: '20px'}}>
                Ride. Explore. Conquer the Desert.
              </p>
              <Link to="/destination" className="btn btn-hero" style={{marginTop: '30px'}}>
                {t('home.enterGallery')}
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-indicators">
          {heroVideos.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div id="choose-adventure" className="tour-categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('home.tourCategories')}</span>
            <h2>{t('home.chooseAdventure')}</h2>
            <p>{t('home.categoriesDesc')}</p>
          </div>
          {/* <CategoriesSlider/> */}
          <CategoriesSlider categories={categories} />

          {/* <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <h3>{category.name}</h3>
                  <Link to="/destination" className="category-link">{t('home.seeMore')}</Link>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      <div className="featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('home.featured')}</span>
            <h2>{t('home.featuredTitle')}</h2>
            <p>{t('home.featuredDesc')}</p>
          </div>
          {loading ? (
            <div className="loading">{t('home.loading')}</div>
          ) : (
            <div className="featured-grid">
              {cars.map((car) => (
                <div key={car._id} className="featured-card">
                  <img src={car.image} alt={car.name} />

                  <div className="featured-content">
                    <h3>{car.name}</h3>
                    <p>{car.brand} {car.model}</p>
                    <div className="featured-price">
                      {car.price60min ? (
                        <>
                          <span>{car.price60min} {car.currency || 'AED'}</span>
                          <span>{t('destination.per60min')}</span>
                        </>
                      ) : (
                        <>
                          <span>{car.pricePerDay} {car.currency || 'AED'}</span>
                          <span>{t('destination.perDay')}</span>
                        </>
                      )}
                    </div>
                    <Link to={`/car/${car._id}`} className="btn btn-primary">
                      {t('home.bookNow')} {isRTL ? '←' : '→'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="view-all">
            <Link to="/destination" className="btn btn-secondary">
              {t('home.viewAll')}
            </Link>
          </div>
        </div>
      </div>

      <div className="gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('home.gallery')}</span>
            <h2>{t('home.galleryTitle')}</h2>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img src="/assets/vehicles/canam-maverick-turbo.jpg" alt="Canam Maverick Turbo" />
            </div>
            <div className="gallery-item">
              <img src="/assets/vehicles/polaris-rzr1000.jpg" alt="Polaris RZR1000" />
            </div>
            <div className="gallery-item">
              <img src="/assets/vehicles/dirt-bike.jpg" alt="Dirt Bike" />
            </div>
            <div className="gallery-item large">
              <img src="/assets/vehicles/polaris-rzr1000-4seater.jpg" alt="Polaris RZR 4 Seater" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

