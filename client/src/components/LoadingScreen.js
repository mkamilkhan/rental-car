import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Auto complete after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!loading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-background">
        {/* Animated desert dunes */}
        <div className="dune dune-1"></div>
        <div className="dune dune-2"></div>
        <div className="dune dune-3"></div>
      </div>

      <div className="loading-content">
        {/* Professional Logo */}
        <div className="logo-container-loading">
          <div className="logo-glow"></div>
          
          <svg className="loading-logo-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Circle with Gradient */}
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ff6b35', stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            {/* Background Circle */}
            <circle cx="100" cy="100" r="95" fill="url(#logoGradient)" opacity="0.1"/>
            <circle cx="100" cy="100" r="90" stroke="url(#logoGradient)" strokeWidth="3" fill="none" opacity="0.3"/>

            {/* Sun in Background */}
            <circle cx="100" cy="60" r="25" fill="url(#sunGradient)" opacity="0.8">
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite"/>
            </circle>
            {/* Sun Rays */}
            <g stroke="#ff6b35" strokeWidth="2" opacity="0.7">
              <line x1="100" y1="30" x2="100" y2="20"/>
              <line x1="100" y1="90" x2="100" y2="100"/>
              <line x1="70" y1="60" x2="60" y2="60"/>
              <line x1="130" y1="60" x2="140" y2="60"/>
              <line x1="78" y1="38" x2="71" y2="31"/>
              <line x1="122" y1="38" x2="129" y2="31"/>
              <line x1="78" y1="82" x2="71" y2="89"/>
              <line x1="122" y1="82" x2="129" y2="89"/>
            </g>

            {/* Desert Dune Shape */}
            <path d="M 30 140 Q 50 125, 70 130 T 110 135 T 150 130 T 170 140" 
                  fill="#f59e0b" opacity="0.3" stroke="#ff6b35" strokeWidth="1.5"/>
            <path d="M 40 150 Q 60 138, 80 142 T 120 145 T 160 142 T 180 150" 
                  fill="#ff6b35" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5"/>

            {/* Off-Road Vehicle */}
            <g transform="translate(70, 90)">
              {/* Vehicle Body - Main */}
              <rect x="0" y="20" width="60" height="25" rx="4" fill="#1e3c72" stroke="#0e234a" strokeWidth="2"/>
              
              {/* Windshield */}
              <path d="M 10 20 L 15 12 L 35 12 L 40 20 Z" fill="#4a90e2" opacity="0.6" stroke="#0e234a" strokeWidth="1.5"/>
              
              {/* Front Grille */}
              <rect x="2" y="23" width="8" height="18" rx="1.5" fill="#0e234a"/>
              <line x1="4" y1="25" x2="4" y2="39" stroke="#f59e0b" strokeWidth="1"/>
              <line x1="6" y1="25" x2="6" y2="39" stroke="#f59e0b" strokeWidth="1"/>
              <line x1="8" y1="25" x2="8" y2="39" stroke="#f59e0b" strokeWidth="1"/>
              
              {/* Headlights */}
              <circle cx="12" cy="28" r="3" fill="#ffd700" stroke="#f59e0b" strokeWidth="1">
                <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="12" cy="37" r="3" fill="#ffd700" stroke="#f59e0b" strokeWidth="1">
                <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
              </circle>
              
              {/* Roof Lights Bar */}
              <rect x="18" y="8" width="24" height="4" rx="2" fill="#f59e0b" opacity="0.9"/>
              <circle cx="22" cy="10" r="1.5" fill="#ffd700">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="30" cy="10" r="1.5" fill="#ffd700">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="38" cy="10" r="1.5" fill="#ffd700">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              
              {/* Roll Cage */}
              <rect x="15" y="12" width="30" height="8" rx="1" fill="none" stroke="#0e234a" strokeWidth="1.5"/>
              
              {/* Side Details */}
              <rect x="20" y="28" width="15" height="8" rx="1" fill="#2a5298" opacity="0.7"/>
              <rect x="38" y="28" width="15" height="8" rx="1" fill="#2a5298" opacity="0.7"/>
              
              {/* Wheels - Front */}
              <circle cx="15" cy="48" r="7" fill="#0e234a" stroke="#f59e0b" strokeWidth="2"/>
              <circle cx="15" cy="48" r="4" fill="#1e3c72"/>
              <circle cx="15" cy="48" r="2" fill="#f59e0b"/>
              
              {/* Wheels - Back */}
              <circle cx="45" cy="48" r="7" fill="#0e234a" stroke="#f59e0b" strokeWidth="2"/>
              <circle cx="45" cy="48" r="4" fill="#1e3c72"/>
              <circle cx="45" cy="48" r="2" fill="#f59e0b"/>
              
              {/* Suspension/Shock Absorbers */}
              <line x1="15" y1="45" x2="15" y2="38" stroke="#333" strokeWidth="2"/>
              <line x1="45" y1="45" x2="45" y2="38" stroke="#333" strokeWidth="2"/>
              
              {/* Ground/Terrain Effect */}
              <ellipse cx="30" cy="50" rx="25" ry="3" fill="#000" opacity="0.2"/>
            </g>
          </svg>

          <div className="logo-text-container">
            <h1 className="logo-brand-name">OFFROAD</h1>
            <p className="logo-tagline">RENTAL HUB</p>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="loading-animation">
          <div className="spinner-container">
            <div className="spinner-ring"></div>
            <div className="spinner-ring-2"></div>
            <svg className="spinner-vehicle" viewBox="0 0 50 50">
              <g transform="translate(10, 20)">
                <rect x="0" y="5" width="30" height="12" rx="2" fill="#667eea"/>
                <circle cx="8" cy="19" r="4" fill="#ff6b35"/>
                <circle cx="22" cy="19" r="4" fill="#ff6b35"/>
              </g>
            </svg>
          </div>
          
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="progress-text">{progress}%</p>
          </div>
        </div>

        <div className="loading-text-container">
          <p className="loading-text">Loading Your Desert Adventure</p>
          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
