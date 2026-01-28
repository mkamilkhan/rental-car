// API Base URL Configuration - Smart detection for mobile
const getApiBaseUrl = () => {
  // Priority 1: Environment variable (build-time)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Priority 2: Localhost for development
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  
  // Priority 3: Render domain detection
  if (hostname.includes('onrender.com')) {
    return 'https://offroad-rental-server.onrender.com';
  }
  
  // Priority 4: Fallback
  return 'https://offroad-rental-server.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();

export const api = {
  baseURL: API_BASE_URL,
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};

export default API_BASE_URL;
