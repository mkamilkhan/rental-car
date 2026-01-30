import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeroCarousel from "../components/HeroCarousel";
import "./Blog.css";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/blogs`);
      // Filter only published blogs
      const publishedBlogs = response.data.filter(blog => blog.status === 'published');
      setBlogPosts(publishedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // No fallback - show empty state if API fails
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-page">
        <HeroCarousel title="BLOGS" subtitle="Home → Blogs" />
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center', color: '#ffffff' }}>
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <HeroCarousel title="BLOGS" subtitle="Home → Blogs" />

      <div className="blog-wrapper container">
        
        {/* LEFT SIDE */}
        <div className="blog-left">
          {blogPosts.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#ffffff' }}>
              <p>No blogs available yet. Check back soon!</p>
            </div>
          ) : (
            blogPosts.map((post) => (
              <article key={post._id || post.id} className="blog-post">
                <img 
                  src={post.mainImage || post.image} 
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
                    <span>👤 By {post.authorName || post.author || 'Admin'}</span>
                    <span>📅 {new Date(post.publishDate || post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>🏷 {post.category || 'General'}</span>
                  </div>

                  <h2>{post.title}</h2>
                  <p>{post.shortDescription || post.excerpt || post.content?.substring(0, 150) + '...'}</p>

                  <Link className="read-more" to={`/blog/${post.slug || post.id}`}>
                    READ MORE
                  </Link>
                </div>
              </article>
            ))
          )}
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

export default Blog;
