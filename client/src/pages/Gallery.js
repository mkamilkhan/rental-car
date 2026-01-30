import React from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import "./Blog.css";

const Gallery = () => {
  // Original gallery data that was in Blog.js before
  const galleryPosts = [
    {
      id: 1,
      title: "Top 7 Thrilling Desert Adventures in Dubai",
      author: "Soor Subedaar",
      date: "05 May, 2025",
      category: "Desert Safari",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=500&q=75&fit=crop&auto=format",
      excerpt:
        "Discover Dubai's top desert adventures including dune bashing, quad biking, camel riding and more. Experience the thrill of off-road vehicles racing through golden dunes under the Arabian sun."
    },
    {
      id: 2,
      title: "Quad Biking in Dubai: An ATV Adventure in the Dunes",
      author: "Soor Subedaar",
      date: "22 May, 2025",
      category: "Dubai Desert",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=500&q=75&fit=crop&auto=format",
      excerpt:
        "Experience quad biking in Dubai with best locations, safety tips and booking guide. Master the art of dune riding with our expert guides and premium ATV fleet."
    },
    {
      id: 3,
      title: "Polaris RZR: The Ultimate Desert Machine",
      author: "Soor Subedaar",
      date: "15 June, 2025",
      category: "Vehicle Reviews",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&q=75&fit=crop&auto=format",
      excerpt:
        "Explore why the Polaris RZR is the top choice for desert adventures. Power, performance, and precision in one incredible off-road vehicle."
    },
    {
      id: 4,
      title: "Can-Am Maverick: Luxury Meets Adventure",
      author: "Soor Subedaar",
      date: "28 June, 2025",
      category: "Vehicle Reviews",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&q=75&fit=crop&auto=format",
      excerpt:
        "Discover the Can-Am Maverick's superior engineering and comfort features. Perfect for those who want adventure without compromising on luxury."
    }
  ];

  return (
    <div className="blog-page">
      <HeroCarousel title="GALLERY" subtitle="Home → Gallery" />

      <div className="blog-wrapper container">
        
        {/* LEFT SIDE */}
        <div className="blog-left">
          {galleryPosts.map((post) => (
            <article key={post.id} className="blog-post">
              <img 
                src={post.image} 
                alt={post.title}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling?.classList.add('image-error');
                }}
              />
              
              <div className="blog-post-content">
                <div className="post-meta">
                  <span>👤 By {post.author}</span>
                  <span>📅 {post.date}</span>
                  <span>🏷 {post.category}</span>
                </div>

                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>

                <Link className="read-more" to="#">
                  READ MORE
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="blog-sidebar">

          {/* SEARCH */}
          <div className="sidebar-box search-box">
            <input type="text" placeholder="Search" />
          </div>

          {/* ACTIVITY TYPE */}
          <div className="sidebar-box">
            <h4>Activity Type</h4>
            <label><input type="checkbox" /> Offroad Vehicle 1000cc</label>
            <label><input type="checkbox" /> Quad Bike</label>
            <label><input type="checkbox" /> CAN-AM 1500cc</label>
            <label><input type="checkbox" /> Raptor 750cc</label>
            <label><input type="checkbox" /> KTM Bike</label>
            <label><input type="checkbox" /> Safari Night</label>
          </div>

          {/* RECENT POSTS */}
          <div className="sidebar-box">
            <h4>Recent Posts</h4>
            <div className="recent-post">
              <img 
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=180&h=135&q=70&fit=crop&auto=format" 
                alt="Quad Biking"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p>Quad Biking In Dubai</p>
                <span>22/6/2025</span>
              </div>
            </div>
            <div className="recent-post">
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=180&h=135&q=70&fit=crop&auto=format" 
                alt="Can-Am Adventure"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p>Can-Am Desert Safari</p>
                <span>25/6/2025</span>
              </div>
            </div>
            <div className="recent-post">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=180&h=135&q=70&fit=crop&auto=format" 
                alt="Polaris RZR"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p>Polaris RZR Experience</p>
                <span>28/6/2025</span>
              </div>
            </div>
          </div>

          {/* TAGS */}
          <div className="sidebar-box">
            <h4>Popular Tags</h4>
            <div className="tags">
              <span>Desert Safari</span>
              <span>Quad Bikes</span>
              <span>Raptor Rides</span>
              <span>KTM Bikes</span>
              <span>CAN-AM</span>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default Gallery;
