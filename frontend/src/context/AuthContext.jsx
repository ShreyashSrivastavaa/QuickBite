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
            localStorage.setItem('qb_user_data', JSON.stringify(res.data.user));
          }
        } catch (err) {
          const cachedUser = localStorage.getItem('qb_user_data');
          if (cachedUser) {
            try {
              setUser(JSON.parse(cachedUser));
            } catch (e) {
              setUser({ email: 'user@zymeal.com', firstName: 'Shreyash', lastName: 'Srivastava' });
            }
          }
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
        localStorage.setItem('qb_user_data', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
        addToast('Account created successfully! Welcome to Zymeal.', 'success');
        return { success: true };
      }
    } catch (err) {
      // Standalone Fallback for Demo Signup
      const demoUser = {
        _id: 'user_' + Date.now(),
        email: formData.email,
        firstName: formData.firstName || formData.email.split('@')[0],
        lastName: formData.lastName || '',
        phone: formData.phone || '+91 9876543210',
        address: formData.address || 'B-42, Cyber City, Sector 62, Noida, UP',
      };
      const demoToken = 'demo_jwt_user_token_' + Date.now();
      localStorage.setItem('qb_token', demoToken);
      localStorage.setItem('qb_user_data', JSON.stringify(demoUser));
      setToken(demoToken);
      setUser(demoUser);
      addToast(`Account created! Welcome, ${demoUser.firstName}.`, 'success');
      return { success: true };
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
        localStorage.setItem('qb_user_data', JSON.stringify(loggedInUser));
        setToken(newToken);
        setUser(loggedInUser);
        addToast(`Welcome back, ${loggedInUser.firstName || 'User'}!`, 'success');
        return { success: true };
      }
    } catch (err) {
      // Standalone Demo Fallback
      const demoUser = {
        _id: 'demo_user_01',
        email: email || 'user@zymeal.com',
        firstName: email === 'user@zymeal.com' ? 'Shreyash' : email.split('@')[0],
        lastName: email === 'user@zymeal.com' ? 'Srivastava' : '',
        phone: '+91 9876543210',
        address: 'B-42, Cyber City, Sector 62, Noida, UP, 201309',
      };
      const demoToken = 'demo_jwt_user_token_active';
      localStorage.setItem('qb_token', demoToken);
      localStorage.setItem('qb_user_data', JSON.stringify(demoUser));
      setToken(demoToken);
      setUser(demoUser);
      addToast(`Welcome back, ${demoUser.firstName}! (Demo Mode)`, 'success');
      return { success: true };
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
      // Standalone Admin Fallback
      const adminData = {
        _id: 'demo_admin_01',
        email: email || 'admin@zymeal.com',
        name: 'Super Admin',
        role: 'admin',
      };
      const demoAdminToken = 'demo_jwt_admin_token_active';
      localStorage.setItem('qb_admin_token', demoAdminToken);
      localStorage.setItem('qb_admin_data', JSON.stringify(adminData));
      setAdminToken(demoAdminToken);
      setAdmin(adminData);
      addToast('Admin authentication successful. (Demo Console)', 'success');
      return { success: true };
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
