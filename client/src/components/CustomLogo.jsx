import React from 'react';
import './CustomLogo.css';

const CustomLogo = ({ size = 'medium' }) => {
  return (
    <div className={`custom-logo custom-logo-${size}`}>
      <div className="logo-icon-wrapper">
        <svg viewBox="0 0 100 100" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
          {/* Background Circle */}
          <circle cx="50" cy="50" r="48" fill="#f97316" />
          <circle cx="50" cy="50" r="45" fill="#1e293b" />
          
          {/* Off-road Vehicle Icon */}
          <g transform="translate(50, 50)">
            {/* Vehicle Body */}
            <rect x="-20" y="-15" width="40" height="20" rx="3" fill="#f97316" />
            <rect x="-18" y="-12" width="36" height="14" rx="2" fill="#1e293b" />
            
            {/* Roll Cage */}
            <path d="M -15 -15 L -15 -25 L 15 -25 L 15 -15" 
                  fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
            
            {/* Wheels - Front */}
            <circle cx="-15" cy="8" r="8" fill="#1e293b" stroke="#f97316" strokeWidth="2" />
            <circle cx="-15" cy="8" r="5" fill="#f97316" />
            <circle cx="-15" cy="8" r="2" fill="#1e293b" />
            
            {/* Wheels - Back */}
            <circle cx="15" cy="8" r="8" fill="#1e293b" stroke="#f97316" strokeWidth="2" />
            <circle cx="15" cy="8" r="5" fill="#f97316" />
            <circle cx="15" cy="8" r="2" fill="#1e293b" />
            
            {/* Terrain Lines */}
            <ellipse cx="0" cy="18" rx="30" ry="4" fill="#f97316" opacity="0.3" />
          </g>
        </svg>
      </div>
      <div className="logo-text-wrapper">
        <span className="logo-main-text">OFFROAD</span>
        <span className="logo-sub-text">RENTALHUB</span>
      </div>
    </div>
  );
};

export default CustomLogo;
