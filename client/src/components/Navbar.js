import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FaGlobe } from 'react-icons/fa';
import CustomLogo from './CustomLogo';
import LanguageCurrencyModal from './LanguageCurrencyModal';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangCurrencyModal, setShowLangCurrencyModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
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
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <CustomLogo size="medium" />
          </Link>

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
                {t('nav.blog')}
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

              {/* User Login/Logout - Removed for public website */}
              {/* Login only available in admin dashboard at separate URL */}
              
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
    </nav>
  );
};

export default Navbar;