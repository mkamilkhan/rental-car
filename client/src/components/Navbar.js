import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { FaGlobe, FaLanguage } from 'react-icons/fa';
import { LogIn, Calendar, LogOut } from 'react-feather';
import logo99 from '../assets/logo100.png'
import CustomLogo from './CustomLogo';
import LanguageCurrencyModal from './LanguageCurrencyModal';
import LoginModal from './LoginModal';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const { currency, setCurrency, getCurrencySymbol } = useCurrency();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangCurrencyModal, setShowLangCurrencyModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

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
    // Smart URL detection for mobile and desktop
    const getApiUrl = () => {
      // Priority 1: Use environment variable if set (build-time)
      if (process.env.REACT_APP_API_URL) {
        console.log('Navbar: Using REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
        return process.env.REACT_APP_API_URL;
      }
      
      // Priority 2: If on localhost (development), use localhost
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        console.log('Navbar: Using localhost for development');
        return 'http://localhost:5000';
      }
      
      // Priority 3: If on Render client domain, construct server URL
      // Render client: offroad-rental-client.onrender.com
      // Render server: offroad-rental-server.onrender.com
      if (hostname.includes('onrender.com')) {
        // Extract subdomain and construct server URL
        const serverUrl = 'https://offroad-rental-server.onrender.com';
        console.log('Navbar: Detected Render domain, using server URL:', serverUrl);
        return serverUrl;
      }
      
      // Priority 4: Fallback to known Render server URL
      const fallbackUrl = 'https://offroad-rental-server.onrender.com';
      console.log('Navbar: Using fallback server URL:', fallbackUrl);
      return fallbackUrl;
    };
    
    const apiUrl = getApiUrl();
    console.log('Navbar: Final API URL:', apiUrl);
    console.log('Navbar: Redirecting to Google OAuth:', `${apiUrl}/api/auth/google`);
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close language and currency dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLanguageDropdown && !event.target.closest('.language-selector-wrapper')) {
        setShowLanguageDropdown(false);
      }
      if (showCurrencyDropdown && !event.target.closest('.currency-selector-wrapper')) {
        setShowCurrencyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageDropdown, showCurrencyDropdown]);

  // Google Translate Widget
  useEffect(() => {
    const initTranslate = () => {
      const translateElement = document.getElementById('google_translate_element_navbar');
      if (!translateElement) {
        console.log('Navbar: Google Translate element not found, retrying...');
        setTimeout(initTranslate, 200);
        return;
      }

      console.log('Navbar: Google Translate element found, initializing...');

      // Check if script already exists
      let existingScript = document.querySelector('script[src*="translate.google.com"]');
      
      // Define callback function
      window.googleTranslateElementInitNavbar = () => {
        console.log('Navbar: Google Translate callback called');
        const element = document.getElementById('google_translate_element_navbar');
        if (window.google && window.google.translate && element) {
          try {
            console.log('Navbar: Creating TranslateElement...');
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,ar,ur,hi,fr,es,de,it,pt,ru,zh-CN,ja,ko',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              },
              'google_translate_element_navbar'
            );
            console.log('Navbar: Google Translate initialized successfully');
            
            // Wait a bit and check if combo box is created
            setTimeout(() => {
              const combo = document.querySelector('.goog-te-combo');
              if (combo) {
                console.log('Navbar: Google Translate combo box found!', combo);
              } else {
                console.log('Navbar: Google Translate combo box not found yet, checking all selects...');
                const allSelects = document.querySelectorAll('select');
                console.log('Navbar: Found selects:', allSelects.length);
                allSelects.forEach((sel, idx) => {
                  console.log(`Navbar: Select ${idx}:`, sel.className, sel.id);
                });
              }
            }, 1500);
            
            // Wait a bit and check if combo box is created
            setTimeout(() => {
              const combo = document.querySelector('.goog-te-combo');
              if (combo) {
                console.log('Navbar: Google Translate combo box found!');
              } else {
                console.log('Navbar: Google Translate combo box not found yet');
              }
            }, 1000);
          } catch (error) {
            console.error('Navbar: Error initializing Google Translate:', error);
          }
        } else {
          console.log('Navbar: Google Translate API not ready yet');
        }
      };

      if (!existingScript) {
        console.log('Navbar: Loading Google Translate script...');
        const addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInitNavbar');
        addScript.setAttribute('type', 'text/javascript');
        addScript.async = true;
        addScript.defer = true;
        document.body.appendChild(addScript);
      } else {
        console.log('Navbar: Google Translate script already exists');
        // If script already loaded, try to initialize
        if (window.google && window.google.translate) {
          try {
            console.log('Navbar: Initializing with existing script...');
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,ar,ur,hi,fr,es,de,it,pt,ru,zh-CN,ja,ko',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              },
              'google_translate_element_navbar'
            );
            console.log('Navbar: Google Translate initialized with existing script');
            
            // Wait and check for combo box
            setTimeout(() => {
              const combo = document.querySelector('.goog-te-combo');
              if (combo) {
                console.log('Navbar: Google Translate combo box found!');
              } else {
                console.log('Navbar: Google Translate combo box not found, retrying...');
                setTimeout(() => {
                  const combo2 = document.querySelector('.goog-te-combo');
                  if (combo2) {
                    console.log('Navbar: Google Translate combo box found on retry!');
                  }
                }, 2000);
              }
            }, 1000);
          } catch (error) {
            console.error('Navbar: Error initializing with existing script:', error);
          }
        } else {
          console.log('Navbar: Waiting for Google Translate API to load...');
          // Wait for API to load
          const checkAPI = setInterval(() => {
            if (window.google && window.google.translate) {
              clearInterval(checkAPI);
              try {
                new window.google.translate.TranslateElement(
                  {
                    pageLanguage: 'en',
                    includedLanguages: 'en,ar,ur,hi,fr,es,de,it,pt,ru,zh-CN,ja,ko',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                  },
                  'google_translate_element_navbar'
                );
                console.log('Navbar: Google Translate initialized after API load');
              } catch (error) {
                console.error('Navbar: Error initializing after API load:', error);
              }
            }
          }, 500);
          
          // Stop checking after 10 seconds
          setTimeout(() => clearInterval(checkAPI), 10000);
        }
      }
    };

    // Initialize after DOM is ready
    const timer = setTimeout(initTranslate, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
              
              <Link to="/gallery" onClick={closeMenu} className="nav-link">
                GALLERY
              </Link>
              <Link to="/blog" onClick={closeMenu} className="nav-link">
                BLOGS
              </Link>
              <Link to="/contact" onClick={closeMenu} className="nav-link">
                {t('nav.contact')}
              </Link>
            </div>

            <div className="navbar-actions">
              {/* Language Selector Dropdown */}
              <div className="language-selector-wrapper">
                <button 
                  className="language-selector-btn"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  title="Select Language"
                >
                  <FaLanguage className="language-icon" />
                  <span>{currentLanguage}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 4.5L6 7.5L9 4.5"/>
                  </svg>
                </button>
                
                {showLanguageDropdown && (
                  <div className="language-dropdown">
                    <button
                      className={`language-option ${currentLanguage === 'English' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentLanguage('English');
                        setShowLanguageDropdown(false);
                        // Trigger Google Translate to English
                        const triggerTranslate = () => {
                          // Try multiple selectors
                          let langSelect = document.querySelector('.goog-te-combo') || 
                                          document.querySelector('#google_translate_element_navbar select') ||
                                          document.querySelector('select.goog-te-combo') ||
                                          document.querySelector('body select');
                          if (langSelect && langSelect.className && langSelect.className.includes('goog-te-combo')) {
                            console.log('Navbar: Found language selector, changing to English');
                            langSelect.value = 'en';
                            langSelect.dispatchEvent(new Event('change', { bubbles: true }));
                            if (langSelect.onchange) langSelect.onchange();
                          } else {
                            console.log('Navbar: Language selector not found, retrying...');
                            setTimeout(triggerTranslate, 500);
                          }
                        };
                        setTimeout(triggerTranslate, 300);
                      }}
                    >
                      <span>🇬🇧</span> English
                    </button>
                    <button
                      className={`language-option ${currentLanguage === 'Arabic' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentLanguage('Arabic');
                        setShowLanguageDropdown(false);
                        const triggerTranslate = () => {
                          let langSelect = document.querySelector('.goog-te-combo') || 
                                          document.querySelector('#google_translate_element_navbar select') ||
                                          document.querySelector('select.goog-te-combo') ||
                                          document.querySelector('body select[class*="goog"]');
                          if (langSelect) {
                            console.log('Navbar: Changing language to Arabic');
                            langSelect.value = 'ar';
                            langSelect.dispatchEvent(new Event('change', { bubbles: true }));
                            if (langSelect.onchange) langSelect.onchange();
                            if (window.google && window.google.translate && window.google.translate.TranslateService) {
                              window.google.translate.TranslateService.getInstance().translatePage('en', 'ar');
                            }
                          } else {
                            // Use cookie method to trigger translation
                            document.cookie = 'googtrans=/en/ar; path=/; domain=' + window.location.hostname;
                            window.location.reload();
                          }
                        };
                        setTimeout(triggerTranslate, 300);
                      }}
                    >
                      <span>🇸🇦</span> العربية (Arabic)
                    </button>
                    <button
                      className={`language-option ${currentLanguage === 'Urdu' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentLanguage('Urdu');
                        setShowLanguageDropdown(false);
                        const triggerTranslate = () => {
                          let langSelect = document.querySelector('.goog-te-combo') || 
                                          document.querySelector('#google_translate_element_navbar select') ||
                                          document.querySelector('select.goog-te-combo') ||
                                          document.querySelector('body select[class*="goog"]');
                          if (langSelect) {
                            console.log('Navbar: Changing language to Urdu');
                            langSelect.value = 'ur';
                            langSelect.dispatchEvent(new Event('change', { bubbles: true }));
                            if (langSelect.onchange) langSelect.onchange();
                            if (window.google && window.google.translate && window.google.translate.TranslateService) {
                              window.google.translate.TranslateService.getInstance().translatePage('en', 'ur');
                            }
                          } else {
                            document.cookie = 'googtrans=/en/ur; path=/; domain=' + window.location.hostname;
                            window.location.reload();
                          }
                        };
                        setTimeout(triggerTranslate, 300);
                      }}
                    >
                      <span>🇵🇰</span> اردو (Urdu)
                    </button>
                    <button
                      className={`language-option ${currentLanguage === 'Hindi' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentLanguage('Hindi');
                        setShowLanguageDropdown(false);
                        const triggerTranslate = () => {
                          let langSelect = document.querySelector('.goog-te-combo') || 
                                          document.querySelector('#google_translate_element_navbar select') ||
                                          document.querySelector('select.goog-te-combo') ||
                                          document.querySelector('body select[class*="goog"]');
                          if (langSelect) {
                            console.log('Navbar: Changing language to Hindi');
                            langSelect.value = 'hi';
                            langSelect.dispatchEvent(new Event('change', { bubbles: true }));
                            if (langSelect.onchange) langSelect.onchange();
                            if (window.google && window.google.translate && window.google.translate.TranslateService) {
                              window.google.translate.TranslateService.getInstance().translatePage('en', 'hi');
                            }
                          } else {
                            document.cookie = 'googtrans=/en/hi; path=/; domain=' + window.location.hostname;
                            window.location.reload();
                          }
                        };
                        setTimeout(triggerTranslate, 300);
                      }}
                    >
                      <span>🇮🇳</span> हिन्दी (Hindi)
                    </button>
                    <button
                      className={`language-option ${currentLanguage === 'French' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentLanguage('French');
                        setShowLanguageDropdown(false);
                        const triggerTranslate = () => {
                          let langSelect = document.querySelector('.goog-te-combo') || 
                                          document.querySelector('#google_translate_element_navbar select') ||
                                          document.querySelector('select.goog-te-combo') ||
                                          document.querySelector('body select[class*="goog"]');
                          if (langSelect) {
                            console.log('Navbar: Changing language to French');
                            langSelect.value = 'fr';
                            langSelect.dispatchEvent(new Event('change', { bubbles: true }));
                            if (langSelect.onchange) langSelect.onchange();
                            if (window.google && window.google.translate && window.google.translate.TranslateService) {
                              window.google.translate.TranslateService.getInstance().translatePage('en', 'fr');
                            }
                          } else {
                            document.cookie = 'googtrans=/en/fr; path=/; domain=' + window.location.hostname;
                            window.location.reload();
                          }
                        };
                        setTimeout(triggerTranslate, 300);
                      }}
                    >
                      <span>🇫🇷</span> Français (French)
                    </button>
                    <button
                      className={`language-option ${currentLanguage === 'Spanish' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentLanguage('Spanish');
                        setShowLanguageDropdown(false);
                        const triggerTranslate = () => {
                          let langSelect = document.querySelector('.goog-te-combo') || 
                                          document.querySelector('#google_translate_element_navbar select') ||
                                          document.querySelector('select.goog-te-combo') ||
                                          document.querySelector('body select[class*="goog"]');
                          if (langSelect) {
                            console.log('Navbar: Changing language to Spanish');
                            langSelect.value = 'es';
                            langSelect.dispatchEvent(new Event('change', { bubbles: true }));
                            if (langSelect.onchange) langSelect.onchange();
                            if (window.google && window.google.translate && window.google.translate.TranslateService) {
                              window.google.translate.TranslateService.getInstance().translatePage('en', 'es');
                            }
                          } else {
                            document.cookie = 'googtrans=/en/es; path=/; domain=' + window.location.hostname;
                            window.location.reload();
                          }
                        };
                        setTimeout(triggerTranslate, 300);
                      }}
                    >
                      <span>🇪🇸</span> Español (Spanish)
                    </button>
                    <button
                      className={`language-option ${currentLanguage === 'United Arab Emirates' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentLanguage('United Arab Emirates');
                        setShowLanguageDropdown(false);
                        const triggerTranslate = () => {
                          let langSelect = document.querySelector('.goog-te-combo') || 
                                          document.querySelector('#google_translate_element_navbar select') ||
                                          document.querySelector('select.goog-te-combo') ||
                                          document.querySelector('body select[class*="goog"]');
                          if (langSelect) {
                            console.log('Navbar: Changing language to Arabic (UAE)');
                            langSelect.value = 'ar';
                            langSelect.dispatchEvent(new Event('change', { bubbles: true }));
                            if (langSelect.onchange) langSelect.onchange();
                            if (window.google && window.google.translate && window.google.translate.TranslateService) {
                              window.google.translate.TranslateService.getInstance().translatePage('en', 'ar');
                            }
                          } else {
                            document.cookie = 'googtrans=/en/ar; path=/; domain=' + window.location.hostname;
                            window.location.reload();
                          }
                        };
                        setTimeout(triggerTranslate, 300);
                      }}
                    >
                      <span>🇦🇪</span> United Arab Emirates (العربية)
                    </button>
                  </div>
                )}
              </div>

              {/* Currency Selector Dropdown */}
              <div className="currency-selector-wrapper">
                <button 
                  className="currency-selector-btn"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  title="Select Currency"
                >
                  <span className="currency-symbol">{getCurrencySymbol(currency)}</span>
                  <span>{currency}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 4.5L6 7.5L9 4.5"/>
                  </svg>
                </button>
                
                {showCurrencyDropdown && (
                  <div className="currency-dropdown">
                    <button
                      className={`currency-option ${currency === 'AED' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrency('AED');
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      <span>🇦🇪</span> AED (د.إ)
                    </button>
                    <button
                      className={`currency-option ${currency === 'USD' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrency('USD');
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      <span>🇺🇸</span> USD ($)
                    </button>
                    <button
                      className={`currency-option ${currency === 'EUR' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrency('EUR');
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      <span>🇪🇺</span> EUR (€)
                    </button>
                    <button
                      className={`currency-option ${currency === 'GBP' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrency('GBP');
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      <span>🇬🇧</span> GBP (£)
                    </button>
                    <button
                      className={`currency-option ${currency === 'INR' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrency('INR');
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      <span>🇮🇳</span> INR (₹)
                    </button>
                    <button
                      className={`currency-option ${currency === 'SAR' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrency('SAR');
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      <span>🇸🇦</span> SAR (﷼)
                    </button>
                    <button
                      className={`currency-option ${currency === 'PKR' ? 'active' : ''}`}
                      onClick={() => {
                        setCurrency('PKR');
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      <span>🇵🇰</span> PKR (₨)
                    </button>
                  </div>
                )}
              </div>
              
              {/* Google Translate Widget (Hidden but functional) */}
              <div 
                id="google_translate_element_navbar" 
                style={{ 
                  position: 'absolute', 
                  left: '-9999px', 
                  opacity: 0, 
                  pointerEvents: 'none', 
                  width: '200px', 
                  height: '50px', 
                  overflow: 'visible',
                  visibility: 'visible'
                }}
              ></div>
              
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
                  <LogIn size={18} className="btn-icon-feather" />
                  <span>Login</span>
                </button>
              )}

              {/* User Dashboard/Logout - Show when user is logged in */}
              {user && user.role !== 'admin' && (
                <>
                  <Link to="/my-bookings" className="btn-dashboard" onClick={closeMenu}>
                    <Calendar size={18} className="btn-icon-feather" />
                    <span>{t('nav.myBookings') || 'My Bookings'}</span>
                  </Link>
                  <button onClick={handleLogout} className="btn-logout">
                    <LogOut size={18} className="btn-icon-feather" />
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