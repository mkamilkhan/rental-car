import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import HeroCarousel from '../components/HeroCarousel';
import './Blog.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError('Invalid post');
      return;
    }
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    axios
      .get(`${apiUrl}/api/blogs/${slug}`)
      .then((res) => {
        setPost(res.data);
        setError(null);
      })
      .catch((err) => {
        setPost(null);
        setError(err.response?.status === 404 ? 'Post not found' : 'Failed to load post');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-page">
        <HeroCarousel title="BLOG" subtitle="Home → Blog" />
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center', color: '#fff' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-page">
        <HeroCarousel title="BLOG" subtitle="Home → Blog" />
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center', color: '#fff' }}>
          <p>{error || 'Post not found.'}</p>
          <Link to="/blog" className="read-more" style={{ marginTop: '1rem', display: 'inline-block' }}>
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const safeContent = typeof post.content === 'string' ? post.content : '';

  return (
    <div className="blog-page">
      <HeroCarousel title="BLOG" subtitle="Home → Blog" />
      <div className="container blog-detail-wrapper">
        <article className="blog-detail-post">
          {post.mainImage && (
            <img
              src={post.mainImage}
              alt={post.title || ''}
              className="blog-detail-image"
              loading="eager"
            />
          )}
          <div className="blog-detail-content">
            <div className="post-meta">
              <span>👤 By {post.authorName || 'Admin'}</span>
              <span>📅 {new Date(post.publishDate || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <span>🏷 {post.category || 'General'}</span>
            </div>
            <h1 className="blog-detail-title">{post.title || 'Untitled'}</h1>
            {post.shortDescription && <p className="blog-detail-lead">{post.shortDescription}</p>}
            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="blog-card-tags" style={{ marginBottom: '1.5rem' }}>
                {post.tags.filter(Boolean).map((tag, i) => (
                  <span key={i} className="blog-card-tag">{String(tag)}</span>
                ))}
              </div>
            )}
            {safeContent && (
              <div className="blog-detail-body">
                {safeContent}
              </div>
            )}
            <Link to="/blog" className="read-more" style={{ marginTop: '2rem', display: 'inline-block' }}>
              ← Back to Blogs
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
