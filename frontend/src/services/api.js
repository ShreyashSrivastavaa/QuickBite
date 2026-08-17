import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

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
      // If token expired or unauthorized, clear storage if needed
      console.warn('Unauthorized request. Token may be invalid or expired.');
    }
    return Promise.reject(error);
  }
);

export default api;
