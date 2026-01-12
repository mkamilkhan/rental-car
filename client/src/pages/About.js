import React from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import './About.css';
import DesertCar from "../../src/assets/desertCar.jpeg";
import DesertQuads from "../../src/assets/desertQuads.jpeg";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="about-page">
      <HeroCarousel 
        title="About" 
        subtitle="Dubai's Premier Desert Adventure Tourism Company Since 2017" 
      />

      <div className="about-content">
        {/* History Section */}
        <section className="about-section history-section">
          <div className="container">
            <div className="section-label">Our Story</div>
            <h2 className="section-title">Our History</h2>
            <div className="history-content">
              <div className="history-text">
                <p className="lead-text">
                  <strong> Experience</strong> was founded in 2017, beginning as a small camp in the heart of the desert, inspired by a passion for the Bedouin lifestyle. Over the years, Desert Adventure Tourism Company –  Experience – has become synonymous with unforgettable desert adventures.
                </p>
                <p>
                  In <strong>2021</strong>,  Experience achieved another milestone by becoming <strong>Can-Am partner – the only Can-Am Certificate Centre in the UAE</strong>. This achievement is a testament to our commitment to providing the safest and most innovative experiences to our customers.
                </p>
              </div>
              <div className="history-image">
               <img src={DesertCar}></img>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values - 3 Columns */}
        <section className="about-section mvv-section">
          <div className="container">
            <div className="mvv-grid">
              <div className="mvv-card">
                <div className="mvv-icon">🎯</div>
                <h3>Our Mission</h3>
                <p>To provide our customers with the ultimate desert adventure that is safe, sustainable and unforgettable.</p>
              </div>
              
              <div className="mvv-card">
                <div className="mvv-icon">🌟</div>
                <h3>Our Vision</h3>
                <p>To become the premier provider of safe, authentic and diverse desert experiences in the UAE. We aim to be recognized for our commitment to safety, excellence, and unparalleled customer service.</p>
              </div>
              
              <div className="mvv-card">
                <div className="mvv-icon">💎</div>
                <h3>Our Corporate Values</h3>
                <p>Sustainability, Diversity, Collaboration</p>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="about-section milestones-section">
          <div className="container">
            <div className="section-label">Success Story</div>
            <h2 className="section-title">Milestones & Success Story</h2>
            <p className="section-subtitle">
              Top Desert Adventure Tourism Company –  Experience
            </p>
            
            <div className="milestone-content">
              <div className="milestone-text">
                <p className="lead-text">
                  As a <strong>private partner of the best brand for off-road Can-Am</strong>, we ensure that our customers have access to the latest and most advanced equipment for their adventures in the desert. At  Experience, we take pride in offering a wide range of exciting adventures and experiences.
                </p>
                <p>
                  From thrilling <strong>Quad Biking Tours</strong>, <strong>Dirt Biking</strong>, <strong>Dune Buggy Rides</strong> to captivating <strong>Desert Safaris</strong>, and authentic Bedouin-inspired activities, we offer something to everyone. Our goal is to create unforgettable memories that will last a lifetime while ensuring your safety and delivering authentic experiences.
                </p>
                <p>
                  Prestigious <strong>Trip Advisor Travelers Choice Award 2022 and 2023</strong>, stellar 5-star ratings by countless delighted customers across prominent review platforms including Trip Advisor and Google Reviews are testaments of our commitment to service excellence.
                </p>
              </div>
              
              <div className="milestone-image">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1717169022464-1f50760d480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBkdW5lJTIwYnVnZ3klMjByaWRlfGVufDF8fHx8MTc2ODEzMzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Desert Golden Hour Can-Am Buggy" 
                />
                <p className="image-caption">Desert's Golden Hour with Can-Am Buggy,  Experience Activity Area, Al Badayer, Sharjah</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="about-section experience-section dark-bg">
          <div className="container">
            <div className="experience-content">
              <div className="experience-image">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1766090648323-41d6b4de0958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHYlMjBxdWFkJTIwYmlrZSUyMGRlc2VydHxlbnwxfHx8fDE3NjgxMzMyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Yamaha Raptor 700CC" 
                />
                <p className="image-caption">Sleek but Powerful Yamaha Raptor 700CC at  Experience Activity Area, Al Badayer, Sharjah</p>
              </div>
              
              <div className="experience-text">
                <h2>More Than Just An Activity</h2>
                <p>
                  Taking part in an activity at  Experience is much more than just an activity a customer pays for. We offer a <strong>holistic approach to the entire desert experience</strong>. Our state-of-the-art facilities include a blend of well-maintained and modern infrastructure preserving Arabic culture and showcasing Bedouin Lifestyle.
                </p>
                <p>
                  Taking a break from the overwhelming adrenaline buggy ride, customers can also take full advantage of <strong>Sandboarding that is offered for FREE</strong> for each ride if informed the agent in advance. Some of our valued customers have greatly complimented our:
                </p>
                <ul className="amenities-list">
                  <li>Air-conditioned majilis room</li>
                  <li>Football/Basketball courts</li>
                  <li>Tennis table</li>
                  <li>Bedouin style private tent</li>
                  <li>Coffee Shop to chill and enjoy with friends and family</li>
                  <li>Go-Pro rental to capture every moment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      

        {/* Activities Showcase */}
        <section className="about-section activities-showcase">
          <div className="container">
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">Our Adventures</h2>
            
            <div className="activities-grid">
              <div className="activity-card">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1717169022464-1f50760d480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBkdW5lJTIwYnVnZ3klMjByaWRlfGVufDF8fHx8MTc2ODEzMzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Dune Buggy Rides" 
                />
                <div className="activity-info">
                  <h3>Dune Buggy Rides</h3>
                  <p>Can-Am & Polaris buggies for the ultimate off-road experience</p>
                </div>
              </div>
              
              <div className="activity-card">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1766090648323-41d6b4de0958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHYlMjBxdWFkJTIwYmlrZSUyMGRlc2VydHxlbnwxfHx8fDE3NjgxMzMyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Quad Biking" 
                />
                <div className="activity-info">
                  <h3>Quad Biking Tours</h3>
                  <p>ATVs and Yamaha Raptors for thrilling dune adventures</p>
                </div>
              </div>
              
              <div className="activity-card">
                <img src={DesertQuads}></img>
                <div className="activity-info">
                  <h3>Desert Safari</h3>
                  <p>Captivating desert experiences with authentic Bedouin activities</p>
                </div>
              </div>
              
              <div className="activity-card">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1730046881361-7780827f070b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lbCUyMGRlc2VydCUyMGR1YmFpfGVufDF8fHx8MTc2ODEzMzI4MXww&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Camel Rides" 
                />
                <div className="activity-info">
                  <h3>Camel Rides</h3>
                  <p>Traditional camel experiences in the Arabian desert</p>
                </div>
              </div>
              
              <div className="activity-card">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1597170771965-7f1c56e3239c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBhZHZlbnR1cmUlMjBzcG9ydHN8ZW58MXx8fHwxNzY4MTMzMjgyfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Dirt Biking" 
                />
                <div className="activity-info">
                  <h3>Dirt Biking</h3>
                  <p>Professional dirt bike adventures across golden dunes</p>
                </div>
              </div>
              
              <div className="activity-card">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1725909632786-c25c9b2b5a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRvdWluJTIwdGVudCUyMGRlc2VydHxlbnwxfHx8fDE3NjgwMzc5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Bedouin Experience" 
                />
                <div className="activity-info">
                  <h3>Bedouin Experience</h3>
                  <p>Authentic cultural activities and traditional hospitality</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-section cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready for the Adventure of a Lifetime?</h2>
              <p className="cta-tagline">
                Ride it. Feel it. Live it with Offroad Rental Hub.
              </p>
              <p className="cta-subtitle">
                Desert Adventure Tourism Company –  Experience has set a new bar in the field of unique and premium desert adventure packages!
              </p>
              <div className="cta-buttons">
                <Link to="/cars" className="btn btn-primary">Browse Our Vehicles</Link>
                <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="about-section newsletter-section">
          <div className="container">
            <h3>Stay Updated with Our Latest Adventures</h3>
            <p>Subscribe to our newsletter for exclusive offers and updates</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn btn-subscribe">Subscribe</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
