import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeroCarousel from "../components/HeroCarousel";
import "./Blog.css";
import { Search, Calendar, User, Tag } from "lucide-react";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/blogs`);
      // API already returns only published blogs (backend filters by status: 'published')
      setBlogPosts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Safe description – kabhi bhi crash na ho agar content string na ho
  const getDescription = (post) => {
    if (post.shortDescription && typeof post.shortDescription === 'string') return post.shortDescription;
    if (post.excerpt && typeof post.excerpt === 'string') return post.excerpt;
    if (post.content && typeof post.content === 'string') {
      const text = post.content.substring(0, 220).trim();
      return post.content.length > 220 ? text + '...' : text;
    }
    return 'No description.';
  };

  // Toggle category filter
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(post.category);
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="blog-page">
        <HeroCarousel title="BLOGS" subtitle="Home → Blogs" />
        <div className="blog-loading">
          <div className="loading-spinner"></div>
          <p>Loading awesome content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <HeroCarousel title="BLOGS" subtitle="Home → Blogs" />

      <div className="blog-wrapper">
        
        {/* LEFT SIDE - Blog Posts */}
        <div className="blog-left">
          {filteredPosts.length === 0 ? (
            <div className="no-posts">
              <h3>No blogs found</h3>
              <p>Check back soon for exciting desert safari content!</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article key={post._id || post.id} className="blog-post">
                <div className="blog-post-image">
                  <img 
                    src={post.mainImage || post.image} 
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=500&q=75&fit=crop&auto=format';
                    }}
                  />
                  <div className="blog-category-badge">
                    {post.category || 'General'}
                  </div>
                </div>
                
                <div className="blog-post-content">
                  <div className="post-meta">
                    <span className="meta-item">
                      <User size={16} />
                      {post.authorName || post.author || 'Admin'}
                    </span>
                    <span className="meta-item">
                      <Calendar size={16} />
                      {new Date(post.publishDate || post.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>

                  <h2 className="blog-title">{post.title || 'Untitled'}</h2>
                  <p className="blog-excerpt">{getDescription(post)}</p>

                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="blog-tags">
                      {post.tags.filter(Boolean).slice(0, 4).map((tag, i) => (
                        <span key={`${post._id}-tag-${i}`} className="blog-tag">
                          <Tag size={12} />
                          {String(tag)}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link className="read-more-btn" to={`/blog/${post.slug || post.id}`}>
                    READ MORE
                    <span className="arrow">→</span>
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
            <h4 className="sidebar-title">
              <Search size={20} />
              Search
            </h4>
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Search blogs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="search-icon" size={18} />
            </div>
          </div>

          {/* ACTIVITY TYPE */}
          <div className="sidebar-box">
            <h4 className="sidebar-title">Activity Type</h4>
            <div className="checkbox-group">
              {['Offroad Vehicle 1000cc', 'Quad Bike', 'CAN-AM 1500cc', 'Raptor 750cc', 'KTM Bike', 'Safari Night'].map(activity => (
                <label key={activity} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(activity)}
                    onChange={() => toggleCategory(activity)}
                  />
                  <span className="checkbox-text">{activity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* RECENT POSTS */}
          <div className="sidebar-box">
            <h4 className="sidebar-title">Recent Posts</h4>
            {blogPosts.length === 0 ? (
              <p className="no-content">No posts yet.</p>
            ) : (
              <div className="recent-posts-list">
                {blogPosts.slice(0, 5).map((p) => (
                  <Link
                    key={p._id || p.id}
                    to={`/blog/${p.slug || p.id}`}
                    className="recent-post"
                  >
                    <div className="recent-post-image">
                      <img
                        src={p.mainImage || p.image || ''}
                        alt={p.title || ''}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { 
                          e.target.src = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=180&h=135&q=70&fit=crop&auto=format'; 
                        }}
                      />
                    </div>
                    <div className="recent-post-info">
                      <p className="recent-post-title">{p.title || 'Untitled'}</p>
                      <span className="recent-post-date">
                        {p.publishDate || p.date
                          ? new Date(p.publishDate || p.date).toLocaleDateString('en-GB', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })
                          : '—'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* TAGS */}
          <div className="sidebar-box">
            <h4 className="sidebar-title">Popular Tags</h4>
            <div className="tags-cloud">
              {['Desert Safari', 'Quad Bikes', 'Raptor Rides', 'KTM Bikes', 'CAN-AM', 'Dune Bashing', 'Adventure'].map(tag => (
                <span key={tag} className="tag-item">{tag}</span>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default Blog;
