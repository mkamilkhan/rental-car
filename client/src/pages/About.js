// import React from 'react';
// import { Link } from 'react-router-dom';
// import HeroCarousel from '../components/HeroCarousel';
// import { useLanguage } from '../context/LanguageContext';
// import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
// import './About.css';
// import DesertCar from "../../src/assets/desertCar.jpeg";
// import DesertQuads from "../../src/assets/desertQuads.jpeg";

// const About = () => {
//   const { t } = useLanguage();

//   return (
//     <div className="about-page">
//       <HeroCarousel 
//         title="About" 
//         subtitle="Dubai's Premier Desert Adventure Tourism Company Since 2017" 
//       />

//       <div className="about-content">
//         {/* History Section */}
//         <section className="about-section history-section">
//           <div className="container">
//             <div className="section-label">Our Story</div>
//             <h2 className="section-title">Our History</h2>
//             <div className="history-content">
//               <div className="history-text">
//                 <p className="lead-text">
//                   <strong> Experience</strong> was founded in 2017, beginning as a small camp in the heart of the desert, inspired by a passion for the Bedouin lifestyle. Over the years, Desert Adventure Tourism Company –  Experience – has become synonymous with unforgettable desert adventures.
//                 </p>
//                 <p>
//                   In <strong>2021</strong>,  Experience achieved another milestone by becoming <strong>Can-Am partner – the only Can-Am Certificate Centre in the UAE</strong>. This achievement is a testament to our commitment to providing the safest and most innovative experiences to our customers.
//                 </p>
//               </div>
//               <div className="history-image">
//                <img src={DesertCar}></img>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Mission, Vision, Values - 3 Columns */}
//         <section className="about-section mvv-section">
//           <div className="container">
//             <div className="mvv-grid">
//               <div className="mvv-card">
//                 <div className="mvv-icon">🎯</div>
//                 <h3>Our Mission</h3>
//                 <p>To provide our customers with the ultimate desert adventure that is safe, sustainable and unforgettable.</p>
//               </div>

//               <div className="mvv-card">
//                 <div className="mvv-icon">🌟</div>
//                 <h3>Our Vision</h3>
//                 <p>To become the premier provider of safe, authentic and diverse desert experiences in the UAE. We aim to be recognized for our commitment to safety, excellence, and unparalleled customer service.</p>
//               </div>

//               <div className="mvv-card">
//                 <div className="mvv-icon">💎</div>
//                 <h3>Our Corporate Values</h3>
//                 <p>Sustainability, Diversity, Collaboration</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Milestones Section */}
//         <section className="about-section milestones-section">
//           <div className="container">
//             <div className="section-label">Success Story</div>
//             <h2 className="section-title">Milestones & Success Story</h2>
//             <p className="section-subtitle">
//               Top Desert Adventure Tourism Company –  Experience
//             </p>

//             <div className="milestone-content">
//               <div className="milestone-text">
//                 <p className="lead-text">
//                   As a <strong>private partner of the best brand for off-road Can-Am</strong>, we ensure that our customers have access to the latest and most advanced equipment for their adventures in the desert. At  Experience, we take pride in offering a wide range of exciting adventures and experiences.
//                 </p>
//                 <p>
//                   From thrilling <strong>Quad Biking Tours</strong>, <strong>Dirt Biking</strong>, <strong>Dune Buggy Rides</strong> to captivating <strong>Desert Safaris</strong>, and authentic Bedouin-inspired activities, we offer something to everyone. Our goal is to create unforgettable memories that will last a lifetime while ensuring your safety and delivering authentic experiences.
//                 </p>
//                 <p>
//                   Prestigious <strong>Trip Advisor Travelers Choice Award 2022 and 2023</strong>, stellar 5-star ratings by countless delighted customers across prominent review platforms including Trip Advisor and Google Reviews are testaments of our commitment to service excellence.
//                 </p>
//               </div>

//               <div className="milestone-image">
//                 <ImageWithFallback 
//                   src="https://images.unsplash.com/photo-1717169022464-1f50760d480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBkdW5lJTIwYnVnZ3klMjByaWRlfGVufDF8fHx8MTc2ODEzMzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" 
//                   alt="Desert Golden Hour Can-Am Buggy" 
//                 />
//                 <p className="image-caption">Desert's Golden Hour with Can-Am Buggy,  Experience Activity Area, Al Badayer, Sharjah</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Experience Section */}
//         <section className="about-section experience-section dark-bg">
//           <div className="container">
//             <div className="experience-content">
//               <div className="experience-image">
//                 <ImageWithFallback 
//                   src="https://images.unsplash.com/photo-1766090648323-41d6b4de0958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHYlMjBxdWFkJTIwYmlrZSUyMGRlc2VydHxlbnwxfHx8fDE3NjgxMzMyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
//                   alt="Yamaha Raptor 700CC" 
//                 />
//                 <p className="image-caption">Sleek but Powerful Yamaha Raptor 700CC at  Experience Activity Area, Al Badayer, Sharjah</p>
//               </div>

//               <div className="experience-text">
//                 <h2>More Than Just An Activity</h2>
//                 <p>
//                   Taking part in an activity at  Experience is much more than just an activity a customer pays for. We offer a <strong>holistic approach to the entire desert experience</strong>. Our state-of-the-art facilities include a blend of well-maintained and modern infrastructure preserving Arabic culture and showcasing Bedouin Lifestyle.
//                 </p>
//                 <p>
//                   Taking a break from the overwhelming adrenaline offroad ride, customers can also take full advantage of <strong>Sandboarding that is offered for FREE</strong> for each ride if informed the agent in advance. Some of our valued customers have greatly complimented our:
//                 </p>
//                 <ul className="amenities-list">
//                   <li>Air-conditioned majilis room</li>
//                   <li>Football/Basketball courts</li>
//                   <li>Tennis table</li>
//                   <li>Bedouin style private tent</li>
//                   <li>Coffee Shop to chill and enjoy with friends and family</li>
//                   <li>Go-Pro rental to capture every moment</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </section>



//         {/* Activities Showcase */}
//         <section className="about-section activities-showcase">
//           <div className="container">
//             <div className="section-label">What We Offer</div>
//             <h2 className="section-title">Our Adventures</h2>

//             <div className="activities-grid">
//               <div className="activity-card">
//                 <ImageWithFallback 
//                   src="https://images.unsplash.com/photo-1717169022464-1f50760d480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBkdW5lJTIwYnVnZ3klMjByaWRlfGVufDF8fHx8MTc2ODEzMzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" 
//                   alt="Dune Buggy Rides" 
//                 />
//                 <div className="activity-info">
//                   <h3>Offroad Vehicle Rides</h3>
//                   <p>Can-Am & Polaris buggies for the ultimate off-road experience</p>
//                 </div>
//               </div>

//               <div className="activity-card">
//                 <ImageWithFallback 
//                   src="https://images.unsplash.com/photo-1766090648323-41d6b4de0958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHYlMjBxdWFkJTIwYmlrZSUyMGRlc2VydHxlbnwxfHx8fDE3NjgxMzMyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
//                   alt="Quad Biking" 
//                 />
//                 <div className="activity-info">
//                   <h3>Quad Biking Tours</h3>
//                   <p>ATVs and Yamaha Raptors for thrilling dune adventures</p>
//                 </div>
//               </div>

//               <div className="activity-card">
//                 <img src={DesertQuads}></img>
//                 <div className="activity-info">
//                   <h3>Desert Safari</h3>
//                   <p>Captivating desert experiences with authentic Bedouin activities</p>
//                 </div>
//               </div>

//               <div className="activity-card">
//                 <ImageWithFallback 
//                   src="https://images.unsplash.com/photo-1730046881361-7780827f070b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lbCUyMGRlc2VydCUyMGR1YmFpfGVufDF8fHx8MTc2ODEzMzI4MXww&ixlib=rb-4.1.0&q=80&w=1080" 
//                   alt="Camel Rides" 
//                 />
//                 <div className="activity-info">
//                   <h3>Camel Rides</h3>
//                   <p>Traditional camel experiences in the Arabian desert</p>
//                 </div>
//               </div>

//               <div className="activity-card">
//                 <ImageWithFallback 
//                   src="https://images.unsplash.com/photo-1597170771965-7f1c56e3239c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBhZHZlbnR1cmUlMjBzcG9ydHN8ZW58MXx8fHwxNzY4MTMzMjgyfDA&ixlib=rb-4.1.0&q=80&w=1080" 
//                   alt="Dirt Biking" 
//                 />
//                 <div className="activity-info">
//                   <h3>Dirt Biking</h3>
//                   <p>Professional dirt bike adventures across golden dunes</p>
//                 </div>
//               </div>

//               <div className="activity-card">
//                 <ImageWithFallback 
//                   src="https://images.unsplash.com/photo-1725909632786-c25c9b2b5a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRvdWluJTIwdGVudCUyMGRlc2VydHxlbnwxfHx8fDE3NjgwMzc5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
//                   alt="Bedouin Experience" 
//                 />
//                 <div className="activity-info">
//                   <h3>Bedouin Experience</h3>
//                   <p>Authentic cultural activities and traditional hospitality</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="about-section cta-section">
//           <div className="container">
//             <div className="cta-content">
//               <h2>Ready for the Adventure of a Lifetime?</h2>
//               <p className="cta-tagline">
//                 Ride it. Feel it. Live it with Offroad Rental Hub.
//               </p>
//               <p className="cta-subtitle">
//                 Desert Adventure Tourism Company –  Experience has set a new bar in the field of unique and premium desert adventure packages!
//               </p>
//               <div className="cta-buttons">
//                 <Link to="/cars" className="btn btn-primary">Browse Our Vehicles</Link>
//                 <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Newsletter Section */}
//         <section className="about-section newsletter-section">
//           <div className="container">
//             <h3>Stay Updated with Our Latest Adventures</h3>
//             <p>Subscribe to our newsletter for exclusive offers and updates</p>
//             <div className="newsletter-form">
//               <input type="email" placeholder="Enter your email address" />
//               <button className="btn btn-subscribe">Subscribe</button>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default About;
import React from 'react';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
// import exampleImage1 from 'figma:asset/bdc4e328507a9c0a3a678ec47871aaf6e5deed09.png';
// import exampleImage2 from 'figma:asset/f9022d2141aa8c02c0999e023070ec2edc204f79.png';
// import exampleImage3 from 'figma:asset/5889fe7ea51935935fd4a26b0dfb457817d06c7d.png';
// import exampleImage4 from 'figma:asset/4623ad6221b68a6a4ea249f953ac2e7d3b7d633d.png';
// import exampleImage5 from 'figma:asset/7d87ec40df40b7e5d664cc487a92fb3e853bcc00.png';
// import exampleImage4 from "../../src/assets/desertQuads.jpeg";
// import exampleImage4 from "../../src/assets/About-hero.jpg";
import exampleImage4 from "../../src/assets/about-hero1.jpeg";
import './About.css';
import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";



const About = () => {
  return (
    <div className="about-page">
    {/* About Hero Section */}
    <section
      className="about-hero"
      // style={{ backgroundImage: `https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/dd/a3/75.jpg` }} // React-friendly background
    >
      <div className="about-hero-overlay" />

      <div className="about-hero-content">
        <p className="about-hero-label">OUR STORY</p>

        <h1 className="about-hero-title">
          BEYOND THE <span>DUNES</span>
        </h1>

        <p className="about-hero-subtitle">
          “Crafting elite desert experiences since 2017. We don't just rent buggies; we curate memories.”
        </p>
      </div>
    </section>


      {/* Legacy Section */}
      <section className="legacy-section">
        <div className="container">
          <div className="legacy-content">
            <div className="legacy-text">
              <h1 className="Buggy-section-title ">THE OFFROAD RENTAL HUB LEGACY</h1>
              <p>
                Founded in the heart of the Dubai Desert Conservation Reserve, OFFROAD RENTAL HUB began with a simple mission: to offer a desert experience that breaks away from the crowded, standard tourist trails. We wanted to provide <strong>"speed, freedom, and luxury"</strong>.
              </p>
              <p>
                Today, with a fleet of over 60 high-performance vehicles ranging from the agile Kymco quads to the beastly Polaris RZR turbos, we are the premier choice for thrill-seekers visiting Dubai.
              </p>
              {/* Mission & Vision */}
              <div className="mission-vision-grid">
                <div className="mv-card">
                  <h3 className="mv-title">OUR MISSION</h3>
                  <p className="mv-text">
                    To provide the safest, most adrenaline-pumping off-road desert experience in the UAE, combining top-tier machinery with expert local guidance.
                  </p>
                </div>
                <div className="mv-card">
                  <h3 className="mv-title">OUR VISION</h3>
                  <p className="mv-text">
                    To become the global benchmark for luxury adventure tourism, where every grain of sand tells a story of excitement.
                  </p>
                </div>
              </div>
            </div>
            <div className="polaroid-grid">
              <div className="polaroid-card">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1766090648323-41d6b4de0958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHYlMjBxdWFkJTIwYmlrZSUyMGRlc2VydHxlbnwxfHx8fDE3NjgxMzMyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Thrill Ride"
                />
                <p className="polaroid-caption">Thrill Ride</p>
              </div>
              <div className="polaroid-card">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1730046881361-7780827f070b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lbCUyMGRlc2VydCUyMGR1YmFpfGVufDF8fHx8MTc2ODEzMzI4MXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Camel Trekking"
                />
                <p className="polaroid-caption">Camel Trekking</p>
              </div>
              <div className="polaroid-card">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1717169022464-1f50760d480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBkdW5lJTIwYnVnZ3klMjByaWRlfGVufDF8fHx8MTc2ODEzMzI4MHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="High-Speed Trails"
                />
                <p className="polaroid-caption">High-Speed Trails</p>
              </div>
              <div className="polaroid-card">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1597170771965-7f1c56e3239c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBhZHZlbnR1cmUlMjBzcG9ydHN8ZW58MXx8fHwxNzY4MTMzMjgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Falconry Show"
                />
                <p className="polaroid-caption">Falconry Show</p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities-section">
        <div className="container">
          <p className="section-label">COMFORT & CONVENIENCE</p>
          <h2 className="section-title-white">OUR BASE CAMP FACILITIES</h2>
          <div className="facilities-grid">
            <div className="facility-card">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1725909632786-c25c9b2b5a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRvdWluJTIwdGVudCUyMGRlc2VydHxlbnwxfHx8fDE3NjgwMzc5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="VIP Lounge"
              />
              <h3 className="facility-title">VIP LOUNGE</h3>
            </div>
            <div className="facility-card">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaGFuZ2luZyUyMHJvb218ZW58MXx8fHwxNzM3MTY1MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Changing Rooms"
              />
              <h3 className="facility-title">CHANGING ROOMS</h3>
            </div>
            <div className="facility-card">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjByb29tfGVufDF8fHx8MTczNzE2NTAwNXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Prayer Area"
              />
              <h3 className="facility-title">PRAYER AREA</h3>
            </div>
            <div className="facility-card">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwbG90fGVufDF8fHx8MTczNzE2NTAwNXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Free Parking"
              />
              <h3 className="facility-title">FREE PARKING</h3>
            </div>
            <div className="facility-card">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTczNzE2NTAwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Cafe"
              />
              <h3 className="facility-title">CAFE</h3>
            </div>
            <div className="facility-card">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V2ZW5pciUyMHNob3B8ZW58MXx8fHwxNzM3MTY1MDA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Souvenir Store"
              />
              <h3 className="facility-title">SOUVENIR STORE</h3>
            </div>
            <div className="facility-card">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjb3VydHxlbnwxfHx8fDE3MzcxNjUwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Sports Courts"
              />
              <h3 className="facility-title">SPORTS COURTS</h3>
            </div>
            <div className="facility-card">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1606041011872-596597976b25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJlbCUyMHR5cGV8ZW58MXx8fHwxNzM3MTY1MDA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Kids Play Area"
              />
              <h3 className="facility-title">KIDS PLAY AREA</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Visit HQ Section */}
      {/* <section className="visit-hq-section">
        <div className="container">
          <p className="section-label-gold">GET IN TOUCH</p>
          <h2 className="section-title-hq">
            VISIT OUR <span className="hq-outline">HQ</span>
          </h2>
          <div className="hq-image">
            <img src={exampleImage4} alt="ABU BUGGY HQ" />
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">

          <div className="contact-grid">
            <div className="contact-details">
              <h3 className="contact-subtitle">Contact Details</h3>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhoneAlt size={20} color='#E9B949' />
                </div>
                <div>
                  <p className="contact-labels">CALL OR WHATSAPP</p>
                  <p className="contact-value">+971 52 229 6899</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon filled">
                  <FaEnvelope size={20} color='#E9B949' />
                </div>
                <div>
                  <p className="contact-labels">EMAIL US</p>
                  <p className="contact-value">offroadrentalhub@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon filled">
                  <FaClock size={20} color='#E9B949'  />
                </div>
                <div>
                  <p className="contact-labels">OPENING HOURS</p>
                  <p className="contact-value">Daily: 8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>


            <div className="stats-section">
              <h3 className="contact-subtitle">By The Numbers</h3>
              <div className="stats-grid">
                <div className='stats-group'>

                  <div className="stat-cards">
                    <p className="stat-number">50k+</p>
                    <p className="stat-label">HAPPY RIDERS</p>
                  </div>
                  <div className="stat-cards">
                    <p className="stat-number">60+</p>
                    <p className="stat-label">VEHICLES</p>
                  </div>
                </div>
                <div className='stats-group'>

                  <div className="stat-cards">
                    <p className="stat-number">100%</p>
                    <p className="stat-label">SAFETY RECORD</p>
                  </div>
                  <div className="stat-cards">
                    <p className="stat-number">7+</p>
                    <p className="stat-label">YEARS ACTIVE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
