import React from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Adventure Destinations for 2025',
      date: '22/8/2025',
      image: '/assets/vehicles/polaris-rzr1000.jpg',
      excerpt: 'Discover the most exciting adventure destinations to visit this year...'
    },
    {
      id: 2,
      title: 'Essential Tips for Desert Adventures',
      date: '15/7/2025',
      image: '/assets/vehicles/dirt-bike.jpg',
      excerpt: 'Everything you need to know before embarking on your desert journey...'
    },
    {
      id: 3,
      title: 'Best Time to Visit Desert Locations',
      date: '10/6/2025',
      image: '/assets/vehicles/canam-maverick-turbo.jpg',
      excerpt: 'Learn about the optimal seasons for desert adventures...'
    }
  ];

  return (
    <div className="blog-page">
      <HeroCarousel title="Blog" subtitle="Home → Blog" />

      <div className="blog-content">
        <div className="container">
          <div className="blog-intro">
            <span className="section-label">Latest News</span>
            <h2>Our Blog & Articles</h2>
            <p>Stay updated with the latest adventure tips, destination guides, and travel stories.</p>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-date">{post.date}</div>
                </div>
                <div className="blog-info">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link to="#" className="read-more">
                    Read More →
                  </Link>
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

