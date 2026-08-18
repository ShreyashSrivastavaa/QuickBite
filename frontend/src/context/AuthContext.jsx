import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('qb_token') || null);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('qb_admin_token') || null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  // Load User Profile on Startup if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const res = await api.get('/user/profile');
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          logoutUser();
        }
      }

      if (adminToken) {
        try {
          const savedAdmin = localStorage.getItem('qb_admin_data');
          if (savedAdmin) {
            setAdmin(JSON.parse(savedAdmin));
          }
        } catch (err) {
          console.error('Failed to load admin state:', err);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [token, adminToken]);

  // User Signup
  const signupUser = async (formData) => {
    try {
      const res = await api.post('/user/signup', formData);
      if (res.data.success) {
        const newToken = res.data.token;
        const newUser = res.data.user;
        localStorage.setItem('qb_token', newToken);
        setToken(newToken);
        setUser(newUser);
        addToast('Account created successfully! Welcome to Zymeal.', 'success');
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed. Please try again.';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  // User Login
  const loginUser = async (email, password) => {
    try {
      const res = await api.post('/user/login', { email, password });
      if (res.data.success) {
        const newToken = res.data.token;
        const loggedInUser = res.data.user;
        localStorage.setItem('qb_token', newToken);
        setToken(newToken);
        setUser(loggedInUser);
        addToast(`Welcome back, ${loggedInUser.firstName || 'User'}!`, 'success');
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Invalid email or password.';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  // Admin Login
  const loginAdmin = async (email, password) => {
    try {
      const res = await api.post('/admin/login', { email, password });
      if (res.data.success) {
        const newToken = res.data.token;
        const adminData = res.data.admin;
        localStorage.setItem('qb_admin_token', newToken);
        localStorage.setItem('qb_admin_data', JSON.stringify(adminData));
        setAdminToken(newToken);
        setAdmin(adminData);
        addToast('Admin authentication successful.', 'success');
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Admin login failed.';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  // Logout User
  const logoutUser = () => {
    localStorage.removeItem('qb_token');
    setToken(null);
    setUser(null);
    addToast('Logged out of user account.', 'info');
  };

  // Logout Admin
  const logoutAdmin = () => {
    localStorage.removeItem('qb_admin_token');
    localStorage.removeItem('qb_admin_data');
    setAdminToken(null);
    setAdmin(null);
    addToast('Logged out of admin console.', 'info');
  };

  // Profile Update
  const updateUserProfile = async (updatedData) => {
    try {
      const res = await api.put('/user/profile', updatedData);
      if (res.data.success) {
        setUser(res.data.user);
        addToast('Profile details updated.', 'success');
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile.';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        token,
        adminToken,
        loading,
        signupUser,
        loginUser,
        loginAdmin,
        logoutUser,
        logoutAdmin,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
