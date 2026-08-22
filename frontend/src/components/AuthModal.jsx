import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialTab = 'login', onAdminSuccess }) {
  const [tab, setTab] = useState(initialTab); // 'login' | 'register' | 'admin'
  const { loginUser, signupUser, loginAdmin } = useAuth();

  // User Login Form State
  const [loginEmail, setLoginEmail] = useState('user@zymeal.com');
  const [loginPassword, setLoginPassword] = useState('User@123456');

  // User Signup Form State
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  // Admin Login State
  const [adminEmail, setAdminEmail] = useState('admin@zymeal.com');
  const [adminPassword, setAdminPassword] = useState('Admin@123456');

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUserLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    const res = await loginUser(loginEmail, loginPassword);
    setLoading(false);
    if (res.success) onClose();
  };

  const handleUserSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signupUser({
      email: regEmail,
      password: regPassword,
      firstName,
      lastName,
      phone
    });
    setLoading(false);
    if (res.success) onClose();
  };

  const handleAdminLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    const res = await loginAdmin(adminEmail, adminPassword);
    setLoading(false);
    if (res.success) {
      onClose();
      if (onAdminSuccess) onAdminSuccess();
    }
  };

  // 1-Click Instant Demo User Sign-In
  const quickLoginAsUser = async () => {
    setLoginEmail('user@zymeal.com');
    setLoginPassword('User@123456');
    setLoading(true);
    const res = await loginUser('user@zymeal.com', 'User@123456');
    setLoading(false);
    if (res.success) onClose();
  };

  // 1-Click Instant Demo Admin Sign-In
  const quickLoginAsAdmin = async () => {
    setAdminEmail('admin@zymeal.com');
    setAdminPassword('Admin@123456');
    setLoading(true);
    const res = await loginAdmin('admin@zymeal.com', 'Admin@123456');
    setLoading(false);
    if (res.success) {
      onClose();
      if (onAdminSuccess) onAdminSuccess();
    }
  };

  const fillDemoUser = () => {
    setLoginEmail('user@zymeal.com');
    setLoginPassword('User@123456');
  };

  const fillDemoAdmin = () => {
    setAdminEmail('admin@zymeal.com');
    setAdminPassword('Admin@123456');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {tab === 'admin' ? '🛡️ Admin Console Portal' : tab === 'register' ? '✨ Create Account' : '👋 Welcome Back'}
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {tab === 'admin' ? 'Manage orders, analytics and restaurants' : 'Sign in to order gourmet meals with fast delivery'}
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 1-Click Quick Demo Accounts Header Banner */}
        <div style={{
          margin: '16px 24px 0 24px',
          padding: '12px 14px',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Zap size={13} /> 1-Click Instant Demo Credentials
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {/* Demo User 1-Click */}
            <button
              type="button"
              onClick={quickLoginAsUser}
              disabled={loading}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '8px',
                padding: '8px 10px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
              className="glow-primary-hover"
            >
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                👤 Demo User <ArrowRight size={12} />
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>user@zymeal.com</span>
            </button>

            {/* Demo Admin 1-Click */}
            <button
              type="button"
              onClick={quickLoginAsAdmin}
              disabled={loading}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(249, 115, 22, 0.4)',
                borderRadius: '8px',
                padding: '8px 10px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fb923c', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                🛡️ Demo Admin <ArrowRight size={12} />
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>admin@zymeal.com</span>
            </button>
          </div>
        </div>

        {/* Auth Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', margin: '14px 24px 0 24px' }}>
          <button
            onClick={() => setTab('login')}
            style={{
              flex: 1,
              padding: '10px',
              background: 'none',
              border: 'none',
              borderBottom: tab === 'login' ? '2px solid var(--primary)' : '2px solid transparent',
              color: tab === 'login' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            User Login
          </button>
          <button
            onClick={() => setTab('register')}
            style={{
              flex: 1,
              padding: '10px',
              background: 'none',
              border: 'none',
              borderBottom: tab === 'register' ? '2px solid var(--primary)' : '2px solid transparent',
              color: tab === 'register' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Register
          </button>
          <button
            onClick={() => setTab('admin')}
            style={{
              flex: 1,
              padding: '10px',
              background: 'none',
              border: 'none',
              borderBottom: tab === 'admin' ? '2px solid #fb923c' : '2px solid transparent',
              color: tab === 'admin' ? '#fb923c' : 'var(--text-secondary)',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Admin
          </button>
        </div>

        {/* Tab Contents */}
        <div style={{ padding: '20px 24px 24px 24px' }}>
          {tab === 'login' && (
            <form onSubmit={handleUserLogin}>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="user@zymeal.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group" style={{ marginBottom: '18px' }}>
                <label className="input-label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary glow-primary" disabled={loading} style={{ width: '100%', height: '46px', marginBottom: '12px' }}>
                {loading ? 'Authenticating...' : 'Sign In as User'}
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={fillDemoUser}
                style={{ width: '100%', fontSize: '0.85rem', color: 'var(--primary)', borderColor: 'rgba(16, 185, 129, 0.4)' }}
              >
                <Sparkles size={14} /> Auto-fill Demo User Credentials
              </button>
            </form>
          )}

          {tab === 'register' && (
            <form onSubmit={handleUserSignup}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="input-group">
                  <label className="input-label">First Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Shreyash"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Last Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Srivastava"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="your.email@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="input-group" style={{ marginBottom: '20px' }}>
                <label className="input-label">Password (Min 6 chars)</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <button type="submit" className="btn btn-primary glow-primary" disabled={loading} style={{ width: '100%', height: '46px' }}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {tab === 'admin' && (
            <form onSubmit={handleAdminLogin}>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.82rem', color: '#fb923c' }}>
                🔒 Restricted Admin Console Access
              </div>

              <div className="input-group">
                <label className="input-label">Admin Email</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="admin@zymeal.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group" style={{ marginBottom: '18px' }}>
                <label className="input-label">Admin Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-accent glow-accent" disabled={loading} style={{ width: '100%', height: '46px', marginBottom: '12px' }}>
                {loading ? 'Authenticating Admin...' : 'Login to Admin Console'}
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={fillDemoAdmin}
                style={{ width: '100%', fontSize: '0.85rem', color: '#fb923c', borderColor: 'rgba(249, 115, 22, 0.4)' }}
              >
                <Sparkles size={14} /> Auto-fill Demo Admin Credentials
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
