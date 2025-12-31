import React from 'react';
import './ProfessionalLogo.css';

const ProfessionalLogo = ({ variant = 'full' }) => {
  if (variant === 'icon') {
    return (
      <div className="logo-icon-only">
        <svg viewBox="0 0 100 100" className="logo-svg-icon">
          <circle cx="50" cy="50" r="45" fill="#f97316" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#1e293b" strokeWidth="4" />
          <path d="M 30 50 L 45 30 L 60 50 L 75 35 L 85 50" 
                fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="35" cy="65" r="8" fill="#1e293b" />
          <circle cx="65" cy="65" r="8" fill="#1e293b" />
          <circle cx="35" cy="65" r="4" fill="#ffffff" />
          <circle cx="65" cy="65" r="4" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  return (
    <div className="professional-logo">
      <div className="logo-icon">
        <svg viewBox="0 0 100 100" className="logo-svg">
          <circle cx="50" cy="50" r="45" fill="#f97316" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#1e293b" strokeWidth="4" />
          <path d="M 30 50 L 45 30 L 60 50 L 75 35 L 85 50" 
                fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="35" cy="65" r="8" fill="#1e293b" />
          <circle cx="65" cy="65" r="8" fill="#1e293b" />
          <circle cx="35" cy="65" r="4" fill="#ffffff" />
          <circle cx="65" cy="65" r="4" fill="#ffffff" />
        </svg>
      </div>
      <div className="logo-text">
        <span className="logo-main">OFFROAD</span>
        <span className="logo-sub">RENTALHUB</span>
      </div>
    </div>
  );
};

export default ProfessionalLogo;