import React from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import "./Blog.css";

import QuadBike from "../assets/QuadBike.jpeg";
import CanAmTurbo from "../assets/CanAm-Maverick-Turbo-RS.jpeg";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 7 Thrilling Desert Adventures in Dubai",
      author: "Soor Subedaar",
      date: "05 May, 2025",
      category: "Desert Safari",
      image: CanAmTurbo,
      excerpt:
        "Discover Dubai’s top desert adventures including dune bashing, quad biking, camel riding and more."
    },
    {
      id: 2,
      title: "Quad Biking in Dubai: An ATV Adventure in the Dunes",
      author: "Soor Subedaar",
      date: "22 May, 2025",
      category: "Dubai Desert",
      image: QuadBike,
      excerpt:
        "Experience quad biking in Dubai with best locations, safety tips and booking guide."
    }
  ];

  return (
    <div className="blog-page">
      <HeroCarousel title="Blog" subtitle="Home → Blog" />

      <div className="blog-wrapper container">
        
        {/* LEFT SIDE */}
        <div className="blog-left">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-post">
              <img src={post.image} alt={post.title} />

              <div className="post-meta">
                <span>👤 By {post.author}</span>
                <span>📅 {post.date}</span>
                <span>🏷 {post.category}</span>
              </div>

              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>

              <Link className="read-more" to="#">
                READ MORE »
              </Link>
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
              <img src={QuadBike} alt="" />
              <div>
                <p>Quad Biking In Dubai</p>
                <span>22/6/2025</span>
              </div>
            </div>
            <div className="recent-post">
              <img src={CanAmTurbo} alt="" />
              <div>
                <p>KTM Dirt Bike Adventures</p>
                <span>25/6/2025</span>
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

export default Blog;
