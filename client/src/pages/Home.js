import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';
import CategoriesSlider from "../components/CategoriesSlider";
import { ImageWithFallback } from '../components/ui/ImageWithFallback.tsx';
import { Users, Clock } from 'lucide-react';
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
              <p style={{fontSize: '22px', fontWeight: '700', color: '#f59e0b', marginTop: '20px'}}>
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
            <div key={car._id} className="monster-card">
              <div className="monster-card-inner">
                {/* LEFT SIDE - YELLOW BOX WITH IMAGE */}
                <div className="monster-card-image-wrapper">
                  <div className="monster-card-image">
                    {/* BIG TITLE ON YELLOW BACKGROUND */}
                    <div className="image-title-sticker">
                      <h2>{car.brand.toUpperCase()}</h2>
                    </div>
                    
                    {/* CAR IMAGE */}
                    <img src={car.image} alt={car.name} />
                    
                    {/* PRICE AT BOTTOM */}
                    <div className="image-price-badge">
                      <span>FROM {car.price60min || car.pricePerDay}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE - DARK BOX WITH CONTENT */}
                <div className="monster-card-content">
                  <h3 className="monster-card-title">{car.name}</h3>
                  
                  <div className="monster-features">
                    <div className="feature-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                      <span>Full safety set provided</span>
                    </div>
                    <div className="feature-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M12.5 7V12.25L17 14.92L16.25 16.15L11 13V7H12.5Z"/>
                      </svg>
                      <span>30min • 60min • 90min • 120min</span>
                    </div>
                  </div>

                  <div className="monster-description">
                    <p>
                      {car.description || 
                        `Experience the thrill with ${car.name}. Premium ${car.brand} ${car.model} rental for ultimate adventure in Dubai's desert dunes.`}
                    </p>
                  </div>

                  <Link to={`/car/${car._id}`} className="monster-btn">
                    <span>{t('home.bookNow') || 'BOOK NOW'}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
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
      <div className="main-container">
      {/* Gallery Section */}
      <div className="gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Gallery</span>
            <h2 className="section-title">Our Adventure Activities</h2>
          </div>
          
          {/* 3 Cards in One Row */}
          <div className="gallery-grid">
            {/* Card 1 - SAFARI CAR */}
            <div className="gallery-card">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1565081189202-698316515a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBzYWZhcmklMjBjYXIlMjBkdWJhaXxlbnwxfHx8fDE3Njc5NDg0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Safari Car"
              />
              <div className="card-overlay">
                <h3 className="card-title">SAFARI CAR</h3>
                <div className="card-info">
                  <span className="info-item">
                    <Users /> 1-7 passengers
                  </span>
                  <span className="info-item">
                    <Clock /> 3hr • 6hr
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 - DIRT BIKE */}
            <div className="gallery-card">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1612599538284-282be443e91c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXJ0JTIwYmlrZSUyMGRlc2VydCUyMHNhbmR8ZW58MXx8fHwxNzY3OTQ4NDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dirt Bike"
              />
              <div className="card-overlay">
                <h3 className="card-title">DIRT BIKE</h3>
                <div className="card-info">
                  <span className="info-item">
                    <Users /> 1-2 riders
                  </span>
                  <span className="info-item">
                    <Clock /> 30min • 60min
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 - DUNE BUGGY */}
            <div className="gallery-card">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1674027653361-fc48a7ecc98d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW5lJTIwYnVnZ3klMjByYWNpbmd8ZW58MXx8fHwxNzY3OTQ4NDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dune Buggy"
              />
              <div className="card-overlay">
                <h3 className="card-title">DUNE BUGGY</h3>
                <div className="card-info">
                  <span className="info-item">
                    <Users /> 1-4 passengers
                  </span>
                  <span className="info-item">
                    <Clock /> 45min • 90min
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - QUAD BIKE */}
          <div className="gallery-grid">
            <div className="gallery-card">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1624664929003-3da28050c0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFkJTIwYmlrZSUyMGRlc2VydHxlbnwxfHx8fDE3Njc5NDg0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Quad Bike"
              />
              <div className="card-overlay">
                <h3 className="card-title">QUAD BIKE</h3>
                <div className="card-info">
                  <span className="info-item">
                    <Users /> 1 rider
                  </span>
                  <span className="info-item">
                    <Clock /> 20min • 60min
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section with Background Image */}
          <div className="contact-banner">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1680214180724-e3f051420d7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjB2ZWhpY2xlcyUyMGxpbmV1cCUyMHNhbmR8ZW58MXx8fHwxNzY3OTQ4NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Desert Vehicles"
            />
            <div className="contact-overlay">
              <div className="contact-content">
                <h3 className="contact-title">
                  NOT SURE WHICH<br />
                  ADVENTURE TO CHOOSE?<br />
                  <span className="white-text">OR NEED A TAILOR<br />MADE OFFER?</span>
                </h3>
                <div className="contact-divider"></div>
                <div className="contact-infos">
                  <div>
                    <p className="contact-label">CALL OR<br />WRITE TO US</p>
                  </div>
                  <div className="contact-divider-vertical"></div>
                  <div className="contact-numbers">
                    <p className="contact-number">+971 50 990 8035</p>
                    <p className="contact-number">+971 56 285 8526</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Content Section */}
      <div className="content-section">
        <div className="content-container">
          <h2 className="content-title">
            UNCOVER THE INCREDIBLE DESERT ADVENTURE WITH MONSTER EXPERIENCE - DESERT ADVENTURE GROUP DUBAI
          </h2>
          
          <div className="content-text">
            <p>
              <strong>Monster Experience</strong>, your gateway to extraordinary adventures that will leave you in awe. Brace yourself for a journey where excitement knows no bounds and unforgettable memories are waiting to be made!
            </p>
            
            <p>
              Picture this: you, behind the wheel of our powerful <strong>Dune Buggy</strong>, conquering the desert terrain with precision. Feel the rush of adrenaline as you navigate through the sandy dunes! For those seeking an extra dose of action, <strong>Dirt Biking</strong> and <strong>Quad Biking</strong> experiences are guaranteed to ignite your engines! Feel the power beneath you as you zoom across the rugged desert, every twist and turn with skill and determination. The desert is your playground, and adventure awaits at every corner! Or, join us for our <strong>Morning Desert Safari</strong>, the perfect escapade from urban rush. If you need a break from evening city lights, hop on our 4X4 for <strong>Evening Desert Safari</strong> and set off to gorgeous Dubai sand dunes that are challenging yet mesmerizing! BBQ Dinner, Bedouin style camp, Tanura show and much more - taking you back to a bygone era. Capture picture perfect moments that will leave you in awe. And for those craving a magical evening under the stars, our <strong>Overnight Desert Safari</strong> promises an incomparable experience of peaceful escapade to solitude under the starry skies in the heart of desert.
            </p>
            
            <p>
              At Monster Experience, our mission is to provide authentic desert experience to our clients that are safe, sustainable, and unforgettable. Let us redefine your perception of adventure as we create memories that will echo in your soul.
            </p>
          </div>
        </div>
      </div>
    </div>
      {/* <div className="gallery-section">
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
      </div> */}
    </div>
  );
};

export default Home;

