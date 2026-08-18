import axios from 'axios';

// Smart API Base URL fallback: Localhost for local dev, live Render API for production Vercel
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://quickbite-llg6.onrender.com');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Bearer token automatically
api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('qb_admin_token');
    const userToken = localStorage.getItem('qb_token');
    const token = adminToken || userToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized request. Token may be invalid or expired.');
    }
    return Promise.reject(error);
  }
);

export default api;
