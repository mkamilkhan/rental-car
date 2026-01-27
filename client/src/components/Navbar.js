import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FaGlobe } from 'react-icons/fa';
import logo99 from '../assets/logo100.png'
import CustomLogo from './CustomLogo';
import LanguageCurrencyModal from './LanguageCurrencyModal';
import LoginModal from './LoginModal';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangCurrencyModal, setShowLangCurrencyModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleGoogleLogin = () => {
    // Save current path if not already saved (for redirect after login)
    // BUT if there's already a saved path (like from BookingForm), keep it!
    const savedPath = localStorage.getItem('from');
    console.log('Navbar: handleGoogleLogin - Current saved path:', savedPath);
    
    if (!savedPath) {
      const currentPath = window.location.pathname + window.location.search;
      console.log('Navbar: No saved path, using current path:', currentPath);
      
      if (!currentPath.includes('/login') && !currentPath.includes('/auth/callback')) {
        localStorage.setItem('from', currentPath);
        console.log('Navbar: Saved current path to localStorage');
      } else {
        // If on login or callback page, default to home
        localStorage.setItem('from', '/');
        console.log('Navbar: On login/callback page, defaulting to home');
      }
    } else {
      console.log('Navbar: Keeping existing saved path:', savedPath);
    }
    
    // Verify path is saved
    const verifyPath = localStorage.getItem('from');
    console.log('Navbar: Final saved path before redirect:', verifyPath);
    
    // Close modal and menu
    setShowLoginModal(false);
    setIsMenuOpen(false);
    
    // Redirect to Google OAuth
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    console.log('Navbar: Redirecting to Google OAuth:', `${apiUrl}/api/auth/google`);
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-wrapper">
          {/* Logo */}
          {/* <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <CustomLogo size="medium" />
          </Link> */}
          <img src={logo99} className='navbar-logo99 '></img>

          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Links */}
          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <div className="navbar-links">
              <Link to="/" onClick={closeMenu} className="nav-link">
                {t('nav.home')}
              </Link>
              <Link to="/about" onClick={closeMenu} className="nav-link">
                {t('nav.about')}
              </Link>
              <Link to="/destination" onClick={closeMenu} className="nav-link">
                {t('nav.destination')}
              </Link>
              <Link to="/service" onClick={closeMenu} className="nav-link">
                {t('nav.service')}
              </Link>
              <Link to="/contact" onClick={closeMenu} className="nav-link">
                {t('nav.contact')}
              </Link>
              <Link to="/blog" onClick={closeMenu} className="nav-link">
                {t('nav.gallery')}
              </Link>
            </div>

            <div className="navbar-actions">
              {/* Language & Currency Selector */}
              {/* <button
                className="language-currency-btn"
                onClick={() => {
                  setShowLangCurrencyModal(true);
                  closeMenu();
                }}
                title="Language & Currency"
              >
                <FaGlobe className="globe-icon" />
              </button> */}

              {/* Login Button - Show when user is not logged in */}
              {!user && (
                <button 
                  onClick={() => {
                    setShowLoginModal(true);
                    closeMenu();
                  }}
                  className="btn-google-login-nav"
                  title="Login"
                >
                  <span>Login</span>
                </button>
              )}

              {/* User Dashboard/Logout - Show when user is logged in */}
              {user && user.role !== 'admin' && (
                <>
                  <Link to="/my-bookings" className="btn-dashboard" onClick={closeMenu}>
                    <span className="btn-icon">📋</span>
                    <span>{t('nav.myBookings') || 'My Bookings'}</span>
                  </Link>
                  <button onClick={handleLogout} className="btn-logout">
                    <span className="btn-icon">🚪</span>
                    <span>{t('nav.logout')}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <LanguageCurrencyModal
        isOpen={showLangCurrencyModal}
        onClose={() => setShowLangCurrencyModal(false)}
      /> */}
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onGoogleLogin={handleGoogleLogin}
      />
    </nav>
  );
};

export default Navbar;