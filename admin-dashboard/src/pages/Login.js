import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Force body background to dark theme
  useEffect(() => {
    document.body.style.backgroundColor = '#1A1A1A';
    document.body.style.background = '#1A1A1A';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.background = '';
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/auth/login`, formData);
      login(response.data.token, response.data.user);

      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/my-bookings');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          background-color: #1A1A1A !important;
          background: #1A1A1A !important;
        }
        .auth-page {
          min-height: 100vh !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                      radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      #1A1A1A !important;
          background-size: 20px 20px, 40px 40px, 100% 100% !important;
          background-position: 0 0, 10px 10px, 0 0 !important;
          background-color: #1A1A1A !important;
          padding: 2rem !important;
          position: relative !important;
          overflow: hidden !important;
          margin: 0 !important;
        }
        .auth-card {
          width: 100% !important;
          max-width: 420px !important;
          background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%) !important;
          padding: 2.5rem !important;
          border-radius: 16px !important;
          border: 2px solid #1F2937 !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(253, 180, 60, 0.1) !important;
          position: relative !important;
          overflow: hidden !important;
          z-index: 1 !important;
          margin: 0 !important;
        }
        .auth-title {
          text-align: center !important;
          font-size: 2rem !important;
          font-weight: 900 !important;
          margin-bottom: 0.5rem !important;
          color: #FDB43C !important;
          text-transform: uppercase !important;
          letter-spacing: 2px !important;
          font-family: 'Impact', 'Arial Black', Arial, sans-serif !important;
          -webkit-text-stroke: 1px #FDB43C !important;
          text-shadow: 0 0 20px rgba(253, 180, 60, 0.5), 0 4px 10px rgba(0, 0, 0, 0.5) !important;
        }
        .auth-subtitle {
          text-align: center !important;
          font-size: 0.9rem !important;
          color: #9ca3af !important;
          margin-bottom: 2rem !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          font-weight: 600 !important;
        }
        .form-group label {
          color: #FDB43C !important;
          font-weight: 700 !important;
        }
      `}</style>
      <div 
        className="auth-page"
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: `
            radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            #1A1A1A
          `,
          backgroundSize: '20px 20px, 40px 40px, 100% 100%',
          backgroundPosition: '0 0, 10px 10px, 0 0',
          backgroundColor: '#1A1A1A',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
          margin: 0
        }}
      >
      <div className="auth-background-decoration"></div>
      <div 
        className="auth-card"
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
          padding: '2.5rem',
          borderRadius: '16px',
          border: '2px solid #1F2937',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(253, 180, 60, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        <div className="auth-content">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔐</div>
            <h2 className="auth-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Login</h2>
            <p className="auth-subtitle" style={{ fontSize: '0.9rem', color: '#9ca3af' }}>Authorized access only</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.75rem', color: '#FDB43C', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@admin.com"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '8px',
                  border: '2px solid #1F2937',
                  fontSize: '0.95rem',
                  background: 'rgba(31, 41, 55, 0.5)',
                  color: '#ffffff',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FDB43C';
                  e.target.style.boxShadow = '0 0 20px rgba(253, 180, 60, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#1F2937';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.75rem', color: '#FDB43C', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: '8px',
                  border: '2px solid #1F2937',
                  fontSize: '0.95rem',
                  background: 'rgba(31, 41, 55, 0.5)',
                  color: '#ffffff',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FDB43C';
                  e.target.style.boxShadow = '0 0 20px rgba(253, 180, 60, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#1F2937';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                background: '#FDB43C',
                border: '2px solid #FDB43C',
                borderRadius: '8px',
                color: '#000000',
                fontSize: '1rem',
                fontWeight: 900,
                cursor: loading ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontFamily: 'Impact, Arial Black, Arial, sans-serif',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.background = '#f59e0c';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(253, 180, 60, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.background = '#FDB43C';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '3px solid rgba(0, 0, 0, 0.2)',
                    borderTopColor: '#000000',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    display: 'inline-block'
                  }}></span>
                  <style>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
