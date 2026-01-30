import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import "./CamelTrekking.css";

const CAMEL_WHATSAPP_NUMBER = "971564455568";
const CAMEL_WHATSAPP_DISPLAY = "+971 56 445 5568";
const CAMEL_WHATSAPP_MESSAGE = "Hi, I want to book Camel Trekking";

export default function CamelTrekking() {
  const whatsappUrl = `https://wa.me/${CAMEL_WHATSAPP_NUMBER}?text=${encodeURIComponent(CAMEL_WHATSAPP_MESSAGE)}`;

  return (
    <section className="camel-section">
      <div className="camel-wrapper">

        {/* LEFT IMAGE */}
        <div className="camel-image">
          <img
            src="https://www.desertelitesafaris.com/wp-content/uploads/2025/10/Camel-ride-in-Dubai-desert-during-golden-sunset.jpg"
            alt="Camel Ride"
          />
          <div className="image-overlay" />
          <div className="time-tags">
            <span>CAMEL TREKKING</span>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="camel-content">
          <p className="subtitle">TRADITIONAL EXPERIENCE</p>

          <h1>
            CAMEL <span>TREKKING</span>
          </h1>

          <p className="description">
            Slow down the pace and see the desert through the eyes of the
            Bedouins. A rhythmic journey across the dunes offering silence,
            heritage, and a unique vantage point.
          </p>

          <h3>EXPERIENCE INCLUDES</h3>
          <ul>
            <li>Welcome Treats (Arabic Coffee & Dates)</li>
            <li>Soft Drinks & Mineral Water</li>
            <li>Guided Camel Ride</li>
          </ul>

          <div className="transport">
            <div className="transport-row">
              <span>Option 1: Own Transportation</span>
              <span className="free">FREE</span>
            </div>
            <div className="transport-row">
              <span>Option 2: Private Pickup Available</span>
              <span className="extra">EXTRA CHARGE</span>
            </div>
          </div>

          <div className="camel-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="camel-whatsapp-link"
            >
              <FaWhatsapp className="camel-whatsapp-icon" />
              <span>{CAMEL_WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}