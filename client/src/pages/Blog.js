import React from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import './Blog.css';
import CanAmTurbo from "../assets/CanAm-Maverick-Turbo-RS.jpeg";
import CanAmSport from "../assets/CanAm-maverick-XRS-Turbo-sports.jpeg";
import DirtBike from "../assets/Dirt-bike.jpeg";
import Polaris1000 from "../assets/Polaris-rzr-1000.jpg";
import PolarisPro from "../assets/Polaris-rzr-Pro.jpeg";
// import Polaris2Seater from "../assets/Polaris-rzr1000-2-seater.jpeg";
// import Polaris4Seater from "../assets/Polaris-rzr1000-four-seater.jpeg";
// import Polaris1Seater from "../assets/Polaris-rzr1000-single-seater.jpeg";
import QuadBike from "../assets/QuadBike.jpeg";
import YamahaRaptor from "../assets/Yamaha-raptor.jpeg";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Dirt Bikes vs Motorcycles: Which will Ignite your Passion for Adventure?',
      date: 'January 5, 2026',
      tag: 'Dirt Bikes ',
      image: CanAmTurbo,
      excerpt:
        'Are you confused about what to choose for your adventure ride? The evergreen debate between adrenaline enthusiasts in the world of two wheeler is between'
    },
    {
      id: 2,
      title: 'Why do some adventurers ONLY enjoy Morning Quad Biking?',
      date: 'January 5, 2026',
      tag: 'Dirt Bikes ',
      image: CanAmTurbo,
      excerpt:
        'Adventurers come in multiple forms, seeking out experiences that push their boundaries and ignite their senses.'
    },
    {
      id: 3,
      title: 'Night time Adventures: Thrilling Twilight Quad Biking Tours in Dubai',
      date: 'January 5, 2026',
      tag: 'Dirt Bikes ',
      image: CanAmTurbo,
      excerpt:
        'Experience the thrill of quad biking through the rolling golden dunes of Dubai. Feel the rush of adrenaline.'
    },
  
    /* NEW BLOGS */
    {
      id: 4,
      title: 'Sunrise Desert Safari: Why Early Morning Adventures Are Magical',
      date: 'January 8, 2026',
      tag: 'Dirt Bikes ',
      image: CanAmTurbo,
      excerpt:
        'Witness golden dunes, cool winds, and peaceful landscapes as sunrise desert safaris offer unmatched serenity.'
    },
    {
      id: 5,
      title: 'ATV Quad Biking Safety Tips Every Rider Must Know',
      date: 'January 10, 2026',
      tag: 'Dirt Bikes ',
      image: CanAmTurbo,
      excerpt:
        'From protective gear to terrain awareness, these essential quad biking safety tips ensure a thrilling yet safe ride.'
    },
    {
      id: 6,
      title: 'Evening Desert Safari vs Night Safari: Which Adventure Suits You?',
      date: 'January 12, 2026',
      tag: 'Dirt Bikes ',
      image: CanAmTurbo,
      excerpt:
        'Confused between evening and night safari? Discover which desert experience matches your adventure style.'
    },
    {
      id: 7,
      title: 'Top Reasons Tourists Love Dune Bashing in Dubai',
      date: 'January 15, 2026',
      tag: 'Dirt Bikes ',
      image: CanAmTurbo,
      excerpt:
        'Dune bashing remains one of Dubai’s most loved adventures, offering high-speed thrills across massive sand dunes.'
    },
    {
      id: 8,
      title: 'Camel Ride Experience: A Traditional Desert Adventure',
      date: 'January 18, 2026',
      tag: 'Dirt Bikes ',
      image: CanAmTurbo,
      excerpt:
        'Experience the calm and cultural side of the desert with traditional camel rides across serene landscapes.'
    }
  ];
  

  return (
    <div className="blog-page">
      <HeroCarousel title="Blog" subtitle="Home → Blog" />

      <div className="blog-content">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                           <div className="blog-image">
  <img src={post.image} alt={post.title} />
  <span className="blog-tag">{post.tag}</span>
</div>


                <div className="blog-body">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>

                  <div className="blog-footer">
                    <Link to="#" className="read-more">
                      READ MORE »
                    </Link>
                    <span className="blog-date">{post.date} • No Comments</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
