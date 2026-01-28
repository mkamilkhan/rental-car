import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  // Force body background to dark theme
  useEffect(() => {
    document.body.style.backgroundColor = '#1A1A1A';
    document.body.style.background = '#1A1A1A';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.background = '';
    };
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const savedPath = localStorage.getItem('from');
      if (savedPath && savedPath !== '/login') {
        navigate(savedPath, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user, navigate]);

  // Handle Google Login
  const handleGoogleLogin = () => {
    // NEVER overwrite existing 'from' path - it's already set by BookingForm
    // Only set if there's absolutely no saved path
    const savedPath = localStorage.getItem('from');
    console.log('Login: Current saved path:', savedPath); // Debug log
    
    if (!savedPath) {
      // Only set default if no path exists at all
      const currentPath = window.location.pathname + window.location.search;
      if (!currentPath.includes('/login')) {
        localStorage.setItem('from', currentPath);
      } else {
        localStorage.setItem('from', '/');
      }
    }
    // If savedPath exists, DO NOT overwrite it - keep the booking form path
    
    // Smart URL detection for mobile and desktop
    const getApiUrl = () => {
      // Priority 1: Use environment variable if set
      if (process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL;
      }
      
      // Priority 2: If on localhost (development)
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:5000';
      }
      
      // Priority 3: If on Render domain, use Render server URL
      if (hostname.includes('onrender.com')) {
        return 'https://offroad-rental-server.onrender.com';
      }
      
      // Priority 4: Fallback
      return 'https://offroad-rental-server.onrender.com';
    };
    
    const apiUrl = getApiUrl();
    console.log('Login: Using API URL:', apiUrl);
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  // If user is already logged in, show redirect message
  if (user) {
    return (
      <div 
        className="auth-page"
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#1A1A1A',
          color: '#ffffff',
          textAlign: 'center',
          padding: '2rem'
        }}
      >
        <div>
          <h2 style={{ color: '#FDB43C', marginBottom: '1rem' }}>Already Logged In</h2>
          <p style={{ marginBottom: '2rem' }}>You are already logged in. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="auth-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#1A1A1A',
        color: '#ffffff',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <div>
        <h2 style={{ color: '#FDB43C', marginBottom: '1rem', fontSize: '2rem' }}>Login</h2>
        <p style={{ marginBottom: '2rem', color: '#d1d5db' }}>
          Please use the "Login" button in the navigation bar to sign in with Google.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.75rem 2rem',
            background: '#FDB43C',
            border: 'none',
            borderRadius: '8px',
            color: '#000000',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#fc8b1a';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#FDB43C';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Login;
