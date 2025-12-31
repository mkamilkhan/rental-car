import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ProfessionalLogo from './ProfessionalLogo';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <ProfessionalLogo />
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
            </div>

            <div className="navbar-actions">
              {/* Language Toggle */}
              <button
                className="language-toggle"
                onClick={() => {
                  toggleLanguage();
                  closeMenu();
                }}
                title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
              >
                <span className="flag-icon">{language === 'en' ? '🇦🇪' : '🇬🇧'}</span>
                <span className="language-text">{language === 'en' ? 'AR' : 'EN'}</span>
              </button>

              {/* Admin Login Button */}
              {!user && (
                <Link to="/login" className="btn-admin-login" onClick={closeMenu}>
                  <span className="btn-icon">👤</span>
                  <span>{t('nav.adminLogin') || 'Admin Login'}</span>
                </Link>
              )}

              {/* Admin Dashboard and Logout */}
              {user && user.role === 'admin' && (
                <>
                  <Link to="/admin" className="btn-dashboard" onClick={closeMenu}>
                    <span className="btn-icon">⚙️</span>
                    <span>{t('nav.admin') || 'Dashboard'}</span>
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
    </nav>
  );
};

export default Navbar;