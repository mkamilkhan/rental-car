import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { AuthContext } from '../context/AuthContext';
import './Home.css';
import CategoriesSlider from "../components/CategoriesSlider";
import { ImageWithFallback } from '../components/ui/ImageWithFallback.tsx';
import { Users, Clock, X } from 'lucide-react';
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
  const { currency, getCurrencySymbol, formatPrice, convertPrice } = useCurrency();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('30min');
  const [paymentLoading, setPaymentLoading] = useState(false);
  
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
    'https://res.cloudinary.com/dkjjrna9o/video/upload/f_mp4/v1769170577/rental-car/videos/IMG_.mov', // Using IMG_1631 as fallback until others upload
  ];

  useEffect(() => {
    fetchCars();
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements that should animate
    const elementsToAnimate = document.querySelectorAll(
      '.buggy-card-horizontal, .monster-card, .featured-section, .tour-categories-section, .buggy-container'
    );

    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => {
      elementsToAnimate.forEach((el) => observer.unobserve(el));
    };
  }, [cars]); // Re-run when cars load

  // Close payment dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (Object.keys(showPaymentOptions).length > 0) {
        const isClickInside = event.target.closest('.whatsapp-payment-wrapper');
        if (!isClickInside) {
          setShowPaymentOptions({});
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPaymentOptions]);

  // Google Translate Widget
  useEffect(() => {
    // Check if script already exists
    let existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (existingScript) {
      return; // Script already loaded, don't reload
    }

    // Add Google Translate script
    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    addScript.setAttribute('type', 'text/javascript');
    document.body.appendChild(addScript);

    // Initialize Google Translate only if not already initialized
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          try {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,ar,ur,hi,fr,es,de,it,pt,ru,zh-CN,ja,ko',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              },
              'google_translate_element'
            );
          } catch (error) {
            console.error('Error initializing Google Translate:', error);
          }
        }
      };
    }

    return () => {
      // Cleanup - only remove script if component unmounts
      // Don't try to delete window.googleTranslateElementInit as it may be non-configurable
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script && !document.getElementById('google_translate_element')) {
        try {
          script.remove();
        } catch (error) {
          console.error('Error removing Google Translate script:', error);
        }
      }
    };
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

  // Calculate price based on duration
  const getCarPrice = (car, duration) => {
    switch (duration) {
      case '30min': return Number(car.price30min) || 0;
      case '60min': return Number(car.price60min) || 0;
      case '90min': return Number(car.price90min) || 0;
      case '120min': return Number(car.price120min) || 0;
      default: return Number(car.price60min) || Number(car.price30min) || 0;
    }
  };

  // Handle payment modal open
  const handleOpenPayment = (car) => {
    if (!user && !token) {
      alert('Please login to continue with payment');
      return;
    }
    setSelectedCar(car);
    setShowPaymentModal(true);
    setShowPaymentOptions({});
  };

  // Handle Stripe payment
  const handleStripePayment = async () => {
    if (!selectedCar) return;

    const totalAmount = getCarPrice(selectedCar, selectedDuration);
    if (!totalAmount || totalAmount <= 0) {
      alert('Invalid amount');
      return;
    }

    if (!user?.email) {
      alert('Please login to continue');
      return;
    }

    try {
      setPaymentLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const response = await axios.post(
        `${apiUrl}/api/payment/create-checkout-session`,
        {
          amount: totalAmount,
          carId: selectedCar._id,
          carName: selectedCar.name,
          customerName: user.name || 'Customer',
          customerEmail: user.email,
          contactNumber: user.phone || '',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          totalDays: 1,
          pickupLocation: 'standard',
          duration: selectedDuration,
          adults: 1,
          currency: 'AED',
          returnUrl: `${window.location.origin}${window.location.pathname}?payment=success&car=${selectedCar._id}&session_id={CHECKOUT_SESSION_ID}`
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined
          }
        }
      );

      if (response.data.url) {
        // Redirect to Stripe checkout
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.response?.data?.error || 'Failed to create payment session');
      setPaymentLoading(false);
    }
  };

  // Check for payment success and send WhatsApp message
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment');
    const carId = urlParams.get('car');
    const sessionId = urlParams.get('session_id');

    if (paymentSuccess === 'success' && carId && sessionId) {
      // Verify payment and get booking details
      const verifyPayment = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
          const response = await axios.get(
            `${apiUrl}/api/payment/verify-session?session_id=${sessionId}`
          );

          if (response.data.success && response.data.booking) {
            const booking = response.data.booking;
            
            // Create WhatsApp message with ticket details
            const ticketMessage = `🎫 *Payment Confirmed - Booking Ticket*\n\n` +
              `*Vehicle:* ${booking.car?.name || selectedCar?.name}\n` +
              `*Duration:* ${booking.duration || selectedDuration}\n` +
              `*Total Amount:* ${booking.totalPrice} ${booking.currency || 'AED'}\n` +
              `*Booking ID:* ${booking._id}\n` +
              `*Customer:* ${booking.customerName}\n` +
              `*Email:* ${booking.customerEmail}\n` +
              `*Payment Method:* Card\n\n` +
              `Thank you for your booking! 🚗✨`;

            // Open WhatsApp with ticket message
            const whatsappUrl = `https://wa.me/971564455568?text=${encodeURIComponent(ticketMessage)}`;
            window.open(whatsappUrl, '_blank');

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Close modal if open
            setShowPaymentModal(false);
            setSelectedCar(null);
          }
        } catch (error) {
          console.error('Payment verification error:', error);
        }
      };

      verifyPayment();
    }
  }, [location.search, token, selectedCar]);

  const categories = [
    { name: 'CanAm Maverick R', image: CanAmTurbo, cc: '1000' },
    { name: 'CanAm Maverick RS', image: CanAmSport, cc: '1000' },
    { name: 'Polaris RZR 1000', image: Polaris1000, cc: '1000' },
    { name: 'Dirt Bikes', image: DirtBike, cc: '450' },
    { name: 'Yamaha Raptors', image: YamahaRaptor, cc: '700' },
    { name: 'Polaris RZR Pro', image: PolarisPro, cc: '2000' },
    { name: 'Single Quad Bikes', image: QuadBike, cc: '450' },
    { name: 'Double Quad Bikes', image: QuadBike, cc: '700' }
  ];
  
  return (
    <div className="home">
      {/* Google Translate Widget */}
      <div 
        id="google_translate_element" 
        className="google-translate-wrapper"
      ></div>

<section className="home-hero-section">
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
    <div className="container hero-layout">

      <div className="hero-content animate-hero">
      <span className="hero-label">OFFROAD RENTAL HUB</span>

<h1>
  CONQUER <span className="gold-text">THE DESERT</span>
</h1>

<p className="home-hero-tagline">
  Dubai’s ultimate offroad rental experience.
  Power, control and adrenaline — delivered.
</p>


       

        <div className="btn-hero-parent">
          <Link to="/destination" className="btn-explore">
            🚀 EXPLORE OUR FLEET
          </Link>

          <div className="btn-hero-child">
            <a href="tel:+971564455568" className="btn-Call">
              <FaPhone /> CALL NOW
            </a>

            <a
              href="https://wa.me/971564455568"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-Chat"
            >
              <FaWhatsapp /> CHAT NOW
            </a>
          </div>
        </div>

        <div className="hero-reviews">
          <div className="reviews-row">
            <div className="review-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="review-icon-google">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#FDB43C"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#FDB43C"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FDB43C"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#FDB43C"/>
              </svg>
              <strong>GOOGLE</strong>
              <span>★★★★★ 4.9</span>
            </div>

            <div className="review-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="review-icon-facebook">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#FDB43C"/>
              </svg>
              <strong>FACEBOOK</strong>
              <span>★★★★★ 5.0</span>
            </div>
          </div>

          <div className="reviews-row">
            <div className="review-item muted">EST. 2017</div>
            <div className="review-item muted">60+ VEHICLES</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

       
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
                                <p className="price">{formatPrice(car.price30min)}</p>
                              </div>
                            )}
                            {car.price60min && (
                              <div className="duration">
                                <p>60 Min</p>
                                <p className="price">{formatPrice(car.price60min)}</p>
                              </div>
                            )}
                            {car.price90min != null && car.price90min !== '' && (
                              <div className="duration">
                                <p>90 Min</p>
                                <p className="price">{formatPrice(car.price90min)}</p>
                              </div>
                            )}
                            {car.price120min != null && car.price120min !== '' && (
                              <div className="duration">
                                <p>120 Min</p>
                                <p className="price">{formatPrice(car.price120min)}</p>
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
                        <div className="whatsapp-payment-wrapper">
                          <button 
                            className="btn-whatsapp"
                            onClick={() => setShowPaymentOptions(prev => ({ ...prev, [car._id]: !prev[car._id] }))}
                          >
                            <FaWhatsapp className="whatsapp-icon" />
                            WHATSAPP
                          </button>
                          {showPaymentOptions[car._id] && (
                            <div className="payment-options-dropdown">
                              <a 
                                href={`https://wa.me/971564455568?text=Hello%20I%20want%20to%20book%20${encodeURIComponent(car.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="payment-option-item"
                                onClick={() => setShowPaymentOptions(prev => ({ ...prev, [car._id]: false }))}
                              >
                                <FaWhatsapp className="option-icon" />
                                <span>Chat on WhatsApp</span>
                              </a>
                              <button
                                className="payment-option-item"
                                onClick={() => {
                                  setShowPaymentOptions(prev => ({ ...prev, [car._id]: false }));
                                  handleOpenPayment(car);
                                }}
                              >
                                <svg className="option-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                                  <line x1="1" y1="10" x2="23" y2="10"/>
                                </svg>
                                <span>Pay with Card</span>
                              </button>
                            </div>
                          )}
                        </div>
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
      {/* Payment Modal */}
      {showPaymentModal && selectedCar && (
        <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="payment-modal-close" onClick={() => setShowPaymentModal(false)}>
              <X size={24} />
            </button>
            
            <div className="payment-modal-header">
              <h2>Pay with Card</h2>
              <p>{selectedCar.name}</p>
            </div>

            <div className="payment-modal-body">
              <div className="payment-duration-selector">
                <label>Select Duration:</label>
                <div className="duration-buttons">
                  {selectedCar.price30min && (
                    <button
                      className={selectedDuration === '30min' ? 'active' : ''}
                      onClick={() => setSelectedDuration('30min')}
                    >
                      30 Min - {formatPrice(selectedCar.price30min)}
                    </button>
                  )}
                  {selectedCar.price60min && (
                    <button
                      className={selectedDuration === '60min' ? 'active' : ''}
                      onClick={() => setSelectedDuration('60min')}
                    >
                      60 Min - {formatPrice(selectedCar.price60min)}
                    </button>
                  )}
                  {selectedCar.price90min && (
                    <button
                      className={selectedDuration === '90min' ? 'active' : ''}
                      onClick={() => setSelectedDuration('90min')}
                    >
                      90 Min - {formatPrice(selectedCar.price90min)}
                    </button>
                  )}
                  {selectedCar.price120min && (
                    <button
                      className={selectedDuration === '120min' ? 'active' : ''}
                      onClick={() => setSelectedDuration('120min')}
                    >
                      120 Min - {selectedCar.price120min} AED
                    </button>
                  )}
                </div>
              </div>

              <div className="payment-total">
                <p>Total Amount: <strong>{getCarPrice(selectedCar, selectedDuration)} AED</strong></p>
              </div>

              <button
                className="payment-proceed-btn"
                onClick={handleStripePayment}
                disabled={paymentLoading}
              >
                {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

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

