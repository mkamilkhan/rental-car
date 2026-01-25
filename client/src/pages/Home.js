import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import './Home.css';
import CategoriesSlider from "../components/CategoriesSlider";
import { ImageWithFallback } from '../components/ui/ImageWithFallback.tsx';
import { Users, Clock } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
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
import TourGuides from '../components/TourGuides.jsx';
import { VideoCardSlider } from '../components/VideoCardSlider.jsx';
import CamelTrekking from '../components/CamelTrekking.jsx';


const Home = () => {
  const { t, isRTL } = useLanguage();
  const { currency, getCurrencySymbol } = useCurrency();
  const location = useLocation();
  const [cars, setCars] = useState([]);
  
  // Scroll to collection section
  const scrollToCollection = () => {
    const collectionSection = document.querySelector('.collection-header') || 
                              document.querySelector('.buggy-collection-page') ||
                              document.querySelector('.collection-title');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  // 
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (id) => {
    setSelectedCard(selectedCard === id ? null : id);
  };
  const activities = [
    {
      id: '1',
      name: 'KTM Bike',
      subtitle: '2 SEATER',
      image: 'https://images.unsplash.com/photo-1612599538284-282be443e91c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXJ0JTIwYmlrZSUyMGRlc2VydCUyMHNhbmR8ZW58MXx8fHwxNzY3OTQ4NDAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      name: 'Buggy 1000cc',
      subtitle: 'SPORT EDITION',
      image: 'https://images.unsplash.com/photo-1674027653361-fc48a7ecc98d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW5lJTIwYnVnZ3klMjByYWNpbmd8ZW58MXx8fHwxNzY3OTQ4NDAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      name: 'CAN AM',
      subtitle: 'TURBO BEAST',
      image: 'https://images.unsplash.com/photo-1565081189202-698316515a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBzYWZhcmklMjBjYXIlMjBkdWJhaXxlbnwxfHx8fDE3Njc5NDg0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '4',
      name: 'Quad Bikes',
      subtitle: 'ULTIMATE',
      image: 'https://images.unsplash.com/photo-1624664929003-3da28050c0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFkJTIwYmlrZSUyMGRlc2VydHxlbnwxfHx8fDE3Njc5NDg0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  // const categories = [
  //   { name: "CanAm Maverick R", image: "/assets/vehicles/quad-bike-single.jpg" },
  //   { name: "CanAm Maverick RS", image: "/assets/vehicles/polaris-rzr1000.jpg" },
  //   { name: "Polaris RZR 1000", image: "/assets/vehicles/dirt-bike.jpg" },
  //   { name: "Dirt Bikes", image: "/assets/vehicles/polaris-rzr1000-4seater.jpg" },
  // ];


  // Hero background videos - Now using Cloudinary URLs with MP4 transformation
  const heroVideos = [
    'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769170577/rental-car/videos/IMG_1631.mov',
    'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769173190/rental-car/videos/IMG_28415.mov',
    'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769170577/rental-car/videos/IMG_1631.mov', // Using IMG_1631 as fallback until others upload
  ];

  useEffect(() => {
    fetchCars();
  }, []);

  // Scroll to gallery section when route is /gallery
  useEffect(() => {
    if (location.pathname === '/gallery' || location.hash === '#/gallery') {
      setTimeout(() => {
        const galleryElement = document.querySelector('.gallery-page');
        if (galleryElement) {
          galleryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [location]);

  // Auto-change hero background every 10 seconds
  useEffect(() => {
    if (heroVideos.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroVideos.length);
      }, 10000); // 10 seconds

      return () => clearInterval(interval);
    }
  }, [heroVideos.length]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/cars`);
      setCars(response.data.slice(0, 6)); // Show only 6 for home page
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]); // Set empty array on error
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
    { name: 'CanAm Maverick RS', image: CanAmSport },
    { name: 'Polaris rzr 1000', image: Polaris1000 },
    { name: 'Dirt Bikes', image: DirtBike },
    { name: 'Yamaha Raptors ', image: YamahaRaptor },
    { name: 'Polaris Rzr Pro', image: PolarisPro },
    { name: 'Single Quad bikes', image: QuadBike },
    { name: 'Double Quad Bikes', image: QuadBike }
  ];

  return (
    <div className="home">

      <div className="hero-section">
        {heroVideos.map((video, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hero-video"
              preload="auto"
              webkit-playsinline="true"
              x5-playsinline="true"
              onError={(e) => {
                console.error('Hero video load error:', video);
                e.target.style.display = 'none';
              }}
              onLoadedData={(e) => {
                e.target.play().catch((err) => {
                  console.log('Hero video autoplay prevented:', err);
                });
              }}
              onCanPlay={(e) => {
                if (index === currentSlide) {
                  e.target.play().catch(() => {});
                }
              }}
            >
              <source src={video} type="video/mp4" />
              <source src={video} type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}

        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content animate-hero">
              <span className="hero-label">Welcome to Offroad Rental Hub</span>

              <h1>Your Ultimate Desert Adventure Awaits!</h1>

              <p className="hero-tagline">
                Ride beyond limits with Dubai's most thrilling offroad experiences.
                Whether you crave the power of a Polaris RZR, the luxury of a
                Can-Am Maverick R, or the wild spirit of a Yamaha Raptor, we've got
                the perfect machine for your adrenaline rush.
              </p>

            

              <p className="hero-highlight">
                Ride. Explore. Conquer the Desert.
              </p>

              <div className="btn-hero-parent">
<div className='btn-hero-explore'>

                <Link 
                  to="/destination"
                  className="btn-explore "
                >
                  <span className="btn-icon">🚀</span>
                  EXPLORE OUR FLEET
                </Link>
</div>

                <div className='btn-hero-child'>
                  <a 
                    href="tel:+971564455568" 
                    className="btn-Call"
                  >
                    <FaPhone className="btn-icon" />
                    CALL NOW
                  </a>
                  <a 
  href="https://wa.me/971564455568?text=Hello%20I%20want%20to%20book%20a%20car"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-Chat"
>
  <FaWhatsapp className="btn-icon" />
  CHAT NOW
</a>

                </div>
              </div>
            </div>
          </div>
        </div>


        {/* <div className="hero-indicators">
          {heroVideos.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div> */}
      </div>
      <div id="choose-adventure" className="tour-categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label-script">Wonderful Place For You</span>
            <h2 className="section-title-tour-categories">Tour Categories</h2>
          </div>
          
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
            <div className="collection-header">
                <h1 className="collection-title">
                  OFFROAD RENTAL HUB <span className="outline-text">COLLECTION</span>
                </h1>
              </div>
            <p>{t('home.featuredDesc')}</p>
          </div>
          {loading ? (
            <div className="loading">{t('home.loading')}</div>
          ) : (
            //     <div className="featured-grid">
            //   {cars.map((car) => (
            //     <div key={car._id} className="monster-card">
            //       <div className="monster-card-inner">
            //         {/* LEFT SIDE - YELLOW BOX WITH IMAGE */}
            //         <div className="monster-card-image-wrapper">
            //           <div className="monster-card-image">
            //             {/* BIG TITLE ON YELLOW BACKGROUND */}
            //             <div className="image-title-sticker">
            //               <h2>{car.brand.toUpperCase()}</h2>
            //             </div>

            //             {/* CAR IMAGE */}
            //             <img src={car.image} alt={car.name} />

            //             {/* PRICE AT BOTTOM */}
            //             <div className="image-price-badge">
            //               <span>FROM {car.price60min || car.pricePerDay}</span>
            //             </div>
            //           </div>
            //         </div>

            //         {/* RIGHT SIDE - DARK BOX WITH CONTENT */}
            //         <div className="monster-card-content">
            //           <h3 className="monster-card-title">{car.name}</h3>

            //           <div className="monster-features">
            //             <div className="feature-item">
            //               <svg viewBox="0 0 24 24" fill="currentColor">
            //                 <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            //               </svg>
            //               <span>Full safety set provided</span>
            //             </div>
            //             <div className="feature-item">
            //               <svg viewBox="0 0 24 24" fill="currentColor">
            //                 <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M12.5 7V12.25L17 14.92L16.25 16.15L11 13V7H12.5Z"/>
            //               </svg>
            //               <span>30min • 60min • 90min • 120min</span>
            //             </div>
            //           </div>

            //           <div className="monster-description">
            //             <p>
            //               {car.description || 
            //                 `Experience the thrill with ${car.name}. Premium ${car.brand} ${car.model} rental for ultimate adventure in Dubai's desert dunes.`}
            //             </p>
            //           </div>

            //           <Link to={`/car/${car._id}`} className="monster-btn">
            //             <span>{t('home.bookNow') || 'BOOK NOW'}</span>
            //             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            //               <path d="M5 12h14M12 5l7 7-7 7"/>
            //             </svg>
            //           </Link>
            //         </div>
            //       </div>
            //     </div>
            //   ))}
            // </div>
            <div className="buggy-collection-page">
              {/* Header Section */}
          

              {/* Vehicle Cards - Horizontal Layout */}
              <div className="buggy-container">
                {cars.map((car) => (
                  <div key={car._id} className="buggy-card-horizontal">
                    {/* LEFT SIDE - Image Section */}
                    <div className="buggy-image-section">
                      <div className="buggy-image-wrapper">
                        <ImageWithFallback src={car.image} alt={car.name} />
                      </div>
                    </div>

                    {/* RIGHT SIDE - Details Section */}
                    <div className="buggy-details-section">
                      <h2 className="buggy-name">{car.name}</h2>
                      <p className="buggy-price-label">ASK FOR PRICE</p>
                      <p className="buggy-subtitle">{car.model}</p>

                      <p className="buggy-tagline">The Beast /{car.seats} Seater</p>

                      <div className="buggy-pricing-options">
                        <div className='pricing-option-block'>
                          <div className="pricing-option">
                            {car.price30min && (
                              <div className="duration">
                                <p>30 Minutes</p>
                                <p className="price">{car.price30min} 
                                  {/* {getCurrencySymbol(currency)} */}
                                  </p>
                              </div>
                            )}
                            {car.price60min && (
                              <div className="duration">
                                <p>60 Min</p>
                                <p className="price">{car.price60min} AED
                                   {/* {getCurrencySymbol(currency)} */}
                                   </p>
                              </div>
                            )}
                            {car.price90min != null && car.price90min !== '' && (
                              <div className="duration">
                                <p>90 Min</p>
                                <p className="price">{car.price90min}
                                   {/* {getCurrencySymbol(currency)} */}
                                   </p>
                              </div>
                            )}
                            {car.price120min != null && car.price120min !== '' && (
                              <div className="duration">
                                <p>120 Min</p>
                                <p className="price">{car.price120min}
                                   {/* {getCurrencySymbol(currency)} */}
                                   </p>
                              </div>
                            )}
                          </div>


                        </div>

                        <p>
                          {car.description ||
                            `Experience the thrill with ${car.name}. Premium ${car.brand} ${car.model} rental for ultimate adventure in Dubai's desert dunes.`}
                        </p>
                      </div>

                      <div className="buggy-actions">
                        <a 
                          href="https://wa.me/971564455568" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-whatsapp-link"
                        >
                          <button className="btn-whatsapp">
                            <FaWhatsapp className="whatsapp-icon" />
                            WHATSAPP
                          </button>
                        </a>
                        <Link to={`/car/${car._id}`} >
                          <button className="btn-availability">SHOW DETAILS</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
        <div id="gallery" className="gallery-page">
          {/* Header Section */}
          <div className="gallery-header">
            <h1 className="gallery-title">
              DESERT <span className="outline-text">ADVENTURES</span>
            </h1>
          </div>

          {/* Vertical Cards Gallery */}
          <div className="vertical-gallery-container">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`vertical-card ${selectedCard === activity.id ? 'expanded' : ''}`}
                onClick={() => handleCardClick(activity.id)}
              >
                <div className="vertical-card-image">
                  <ImageWithFallback src={activity.image} alt={activity.name} />
                </div>
                <div className="vertical-card-overlay">
                  <div className="card-content-text">
                    <h3 className="vertical-card-title">{activity.name}</h3>
                    <p className="vertical-card-subtitle">{activity.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
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
      <CamelTrekking />
      <VideoCardSlider />
      {/* Text Content Section */}
      <div className="content-section">
        <div className="content-container">
          <h2 className="content-title">
            UNCOVER THE INCREDIBLE DESERT ADVENTURE WITH MONSTER EXPERIENCE - DESERT ADVENTURE GROUP DUBAI
          </h2>

          <div className="content-text">
            <p>
              <span>Monster Experience</span>, your gateway to extraordinary adventures that will leave you in awe. Brace yourself for a journey where excitement knows no bounds and unforgettable memories are waiting to be made!
            </p>

            <p>
              Picture this: you, behind the wheel of our powerful <span>Offroad Vehicle</span>, conquering the desert terrain with precision. Feel the rush of adrenaline as you navigate through the sandy dunes! For those seeking an extra dose of action, <span>Dirt Biking</span> and <span>Quad Biking</span> experiences are guaranteed to ignite your engines! Feel the power beneath you as you zoom across the rugged desert, every twist and turn with skill and determination. The desert is your playground, and adventure awaits at every corner! Or, join us for our <span>Morning Desert Safari</span>, the perfect escapade from urban rush. If you need a break from evening city lights, hop on our 4X4 for <span>Evening Desert Safari</span> and set off to gorgeous Dubai sand dunes that are challenging yet mesmerizing! BBQ Dinner, Bedouin style camp, Tanura show and much more - taking you back to a bygone era. Capture picture perfect moments that will leave you in awe. And for those craving a magical evening under the stars, our <span>Overnight Desert Safari</span> promises an incomparable experience of peaceful escapade to solitude under the starry skies in the heart of desert.
            </p>

            <p>
              At Monster Experience, our mission is to provide authentic desert experience to our clients that are safe, sustainable, and unforgettable. Let us redefine your perception of adventure as we create memories that will echo in your soul.
            </p>
          </div>
        </div>
        <TourGuides />
      </div>

    </div>
  );
};

export default Home;

