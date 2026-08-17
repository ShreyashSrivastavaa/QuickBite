import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [tab, setTab] = useState(initialTab); // 'login' | 'register' | 'admin'
  const { loginUser, signupUser, loginAdmin } = useAuth();

  // User Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // User Signup Form State
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  // Admin Login State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUserLogin = async (e) => {
    e.preventDefault();
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
    e.preventDefault();
    setLoading(true);
    const res = await loginAdmin(adminEmail, adminPassword);
    setLoading(false);
    if (res.success) onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '20px 24px 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {tab === 'admin' ? 'Admin Portal' : tab === 'register' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Auth Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', margin: '16px 24px 0 24px' }}>
          <button
            onClick={() => setTab('login')}
            style={{
              flex: 1,
              padding: '12px',
              background: 'none',
              border: 'none',
              borderBottom: tab === 'login' ? '2px solid var(--primary)' : '2px solid transparent',
              color: tab === 'login' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            User Login
          </button>
          <button
            onClick={() => setTab('register')}
            style={{
              flex: 1,
              padding: '12px',
              background: 'none',
              border: 'none',
              borderBottom: tab === 'register' ? '2px solid var(--primary)' : '2px solid transparent',
              color: tab === 'register' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Register
          </button>
          <button
            onClick={() => setTab('admin')}
            style={{
              flex: 1,
              padding: '12px',
              background: 'none',
              border: 'none',
              borderBottom: tab === 'admin' ? '2px solid #fb923c' : '2px solid transparent',
              color: tab === 'admin' ? '#fb923c' : 'var(--text-secondary)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Admin
          </button>
        </div>

        {/* Tab Contents */}
        <div style={{ padding: '24px' }}>
          {tab === 'login' && (
            <form onSubmit={handleUserLogin}>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="user@quickbite.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group" style={{ marginBottom: '24px' }}>
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

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', height: '46px' }}>
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>

              <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                Demo User: <b>user@quickbite.com</b> / <b>User@123456</b>
              </p>
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
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Last Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Doe"
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
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="input-group" style={{ marginBottom: '24px' }}>
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

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', height: '46px' }}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {tab === 'admin' && (
            <form onSubmit={handleAdminLogin}>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem', color: '#fb923c' }}>
                🔒 Restricted Admin Console Access
              </div>

              <div className="input-group">
                <label className="input-label">Admin Email</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="admin@quickbite.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group" style={{ marginBottom: '24px' }}>
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

              <button type="submit" className="btn btn-accent" disabled={loading} style={{ width: '100%', height: '46px' }}>
                {loading ? 'Authenticating Admin...' : 'Login to Admin Console'}
              </button>

              <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                Demo Admin: <b>admin@quickbite.com</b> / <b>Admin@123456</b>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
