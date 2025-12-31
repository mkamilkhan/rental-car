import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!loading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-container">
          <div className="logo-main">
            <div className="logo-icon-wrapper-large">
              <svg className="professional-logo-large" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Off-road Vehicle */}
                <g transform="translate(10, 25)">
                  {/* Vehicle Body */}
                  <rect x="5" y="15" width="50" height="20" rx="3" fill="#1e3c72" stroke="#0e234a" strokeWidth="1.5"/>
                  {/* Front Grille */}
                  <rect x="5" y="18" width="8" height="14" rx="1" fill="#0e234a"/>
                  <line x1="7" y1="20" x2="7" y2="30" stroke="#ff6b35" strokeWidth="0.8"/>
                  <line x1="9" y1="20" x2="9" y2="30" stroke="#ff6b35" strokeWidth="0.8"/>
                  <line x1="11" y1="20" x2="11" y2="30" stroke="#ff6b35" strokeWidth="0.8"/>
                  {/* Headlights */}
                  <circle cx="15" cy="22" r="2.5" fill="#ffd700" stroke="#ff6b35" strokeWidth="0.5"/>
                  <circle cx="15" cy="28" r="2.5" fill="#ffd700" stroke="#ff6b35" strokeWidth="0.5"/>
                  {/* Roof Lights */}
                  <rect x="20" y="10" width="8" height="4" rx="1" fill="#ff6b35"/>
                  <rect x="30" y="10" width="8" height="4" rx="1" fill="#ff6b35"/>
                  <rect x="40" y="10" width="8" height="4" rx="1" fill="#ff6b35"/>
                  {/* Wheels */}
                  <circle cx="12" cy="38" r="5" fill="#0e234a" stroke="#ff6b35" strokeWidth="1"/>
                  <circle cx="12" cy="38" r="3" fill="#1e3c72"/>
                  <circle cx="48" cy="38" r="5" fill="#0e234a" stroke="#ff6b35" strokeWidth="1"/>
                  <circle cx="48" cy="38" r="3" fill="#1e3c72"/>
                  {/* Rock/Terrain */}
                  <path d="M8 38 L12 42 L16 38" fill="#2a2a2a" opacity="0.6"/>
                </g>
                {/* Sun Circle */}
                <circle cx="70" cy="20" r="18" fill="#ff6b35" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.7;0.9" dur="3s" repeatCount="indefinite"/>
                </circle>
                <line x1="70" y1="2" x2="70" y2="8" stroke="#ff8533" strokeWidth="1.5"/>
                <line x1="70" y1="32" x2="70" y2="38" stroke="#ff8533" strokeWidth="1.5"/>
                <line x1="52" y1="20" x2="58" y2="20" stroke="#ff8533" strokeWidth="1.5"/>
                <line x1="82" y1="20" x2="88" y2="20" stroke="#ff8533" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-text">OFFROAD</span>
              <span className="logo-subtext">RENTALHUB</span>
            </div>
          </div>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p className="loading-text">Loading your adventure...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

