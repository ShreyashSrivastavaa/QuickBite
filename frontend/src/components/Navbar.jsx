import React, { useState } from 'react';
import { ShoppingBag, User, ShieldCheck, Clock, LogOut, Sparkles, X, Sun, Moon, Menu, Compass, Zap, Flame, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenAuth, onOpenOrders, onOpenAdmin, theme, toggleTheme }) {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, admin, logoutUser, logoutAdmin } = useAuth();
  const { totalItemCount, setIsCartOpen } = useCart();

  const handleScrollToMenu = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('gourmet-menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      {showAnnouncement && (
        <div style={{
          background: 'linear-gradient(90deg, #047857, #10b981, #f97316)',
          padding: '6px 12px',
          textAlign: 'center',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          position: 'relative',
          letterSpacing: '0.01em',
          minHeight: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 'calc(100% - 30px)' }}>
            <Sparkles size={13} style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              ⚡ 30-Min Delivery | Code <b style={{ background: 'rgba(0,0,0,0.25)', padding: '1px 5px', borderRadius: '4px' }}>ZYMEAL</b> for 15% OFF
            </span>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            aria-label="Close Announcement"
            style={{
              position: 'absolute',
              right: '8px',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Floating Glassmorphic Header */}
      <header className="glass-header" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        gap: '8px'
      }}>
        {/* Brand Emblem */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo.png"
            alt="Zymeal Logo"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
              objectFit: 'cover',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
              border: '1px solid var(--glass-border)'
            }}
          />
          <div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.28rem', color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Zy<span style={{ color: 'var(--primary)' }}>meal</span>
            </span>
            <span className="hide-mobile" style={{ display: 'block', fontSize: '0.58rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginTop: '2px' }}>
              Gourmet Kitchens • India
            </span>
          </div>
        </div>

        {/* Desktop Header Navigation Links */}
        <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={handleScrollToMenu}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', transition: 'color 0.2s' }}
          >
            Menu Catalog
          </button>
          {user && (
            <button
              onClick={onOpenOrders}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <Clock size={15} /> My Orders
            </button>
          )}
          {admin && (
            <button
              onClick={onOpenAdmin}
              style={{ background: 'none', border: 'none', color: '#f97316', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <ShieldCheck size={15} /> Admin Console
            </button>
          )}
        </nav>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
          {/* Light / Dark Mode Toggle */}
          <button
            className="btn btn-ghost btn-icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
            style={{ width: '40px', height: '40px', flexShrink: 0 }}
          >
            {theme === 'dark' ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#6366f1" />}
          </button>

          {/* Desktop Auth Controls */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {admin ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button className="btn btn-ghost" onClick={onOpenAdmin} style={{ color: '#f97316', padding: '6px 12px', fontSize: '0.84rem' }}>
                  <ShieldCheck size={15} /> Admin
                </button>
                <button className="btn btn-ghost btn-icon" onClick={logoutAdmin} title="Logout Admin" style={{ color: '#ef4444', width: '38px', height: '38px' }}>
                  <LogOut size={15} />
                </button>
              </div>
            ) : user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Namaste, {user.firstName || 'Foodie'}
                </span>
                <button className="btn btn-ghost btn-icon" onClick={logoutUser} title="Logout" style={{ width: '38px', height: '38px' }}>
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button className="btn btn-ghost" onClick={onOpenAuth} style={{ padding: '7px 14px', fontSize: '0.86rem' }}>
                <User size={15} /> Sign In
              </button>
            )}
          </div>

          {/* Shopping Cart Button */}
          <button
            className="btn btn-primary glow-primary"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Food Cart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              minHeight: '40px',
              flexShrink: 0
            }}
          >
            <ShoppingBag size={17} />
            <span className="hide-mobile" style={{ fontSize: '0.88rem' }}>Cart</span>
            {totalItemCount > 0 && (
              <span style={{
                background: '#f97316',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(249, 115, 22, 0.4)'
              }}>
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            className="btn btn-ghost btn-icon show-mobile-only"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu Navigation Drawer"
            style={{
              display: 'none',
              width: '40px',
              height: '40px',
              flexShrink: 0,
              padding: 0
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Slide-In Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(3, 5, 10, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 110,
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-nav-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div style={{
              padding: '18px 20px',
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="/logo.png"
                  alt="Zymeal Logo"
                  style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                    Zy<span style={{ color: 'var(--primary)' }}>meal</span>
                  </span>
                  <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--accent)', fontWeight: 700 }}>
                    Gourmet Delivery
                  </span>
                </div>
              </div>
              <button
                className="btn btn-ghost btn-icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Mobile Drawer"
                style={{ width: '38px', height: '38px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* User Greeting / Auth Status Card */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.02)' }}>
              {admin ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#f97316', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Admin Active
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Super Admin Console</h4>
                  </div>
                  <button
                    className="btn btn-ghost btn-icon"
                    onClick={() => { logoutAdmin(); setMobileMenuOpen(false); }}
                    title="Logout"
                    style={{ color: '#ef4444', width: '36px', height: '36px' }}
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : user ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700 }}>Signed In</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{user.firstName || 'User'} {user.lastName || ''}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</span>
                  </div>
                  <button
                    className="btn btn-ghost btn-icon"
                    onClick={() => { logoutUser(); setMobileMenuOpen(false); }}
                    title="Logout"
                    style={{ width: '36px', height: '36px' }}
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Sign in to track live orders and save delivery addresses.
                  </p>
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', minHeight: '40px', fontSize: '0.88rem' }}
                    onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  >
                    <User size={15} /> Sign In / Demo Account
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Navigation Links */}
            <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <button
                onClick={handleScrollToMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: 'none',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Compass size={18} color="var(--primary)" />
                  <span>Browse Full Menu</span>
                </div>
                <ChevronRight size={16} color="var(--text-muted)" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrders();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: 'none',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={18} color="#34d399" />
                  <span>My Orders & Tracking</span>
                </div>
                <ChevronRight size={16} color="var(--text-muted)" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: 'none',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShoppingBag size={18} color="#f97316" />
                  <span>Shopping Cart ({totalItemCount})</span>
                </div>
                <ChevronRight size={16} color="var(--text-muted)" />
              </button>

              {admin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    background: 'rgba(249, 115, 22, 0.1)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    borderRadius: '10px',
                    color: '#fb923c',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginTop: '4px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={18} />
                    <span>Admin Dashboard</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>

            {/* Drawer Bottom Switcher */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Appearance</span>
              <button
                className="btn btn-ghost"
                onClick={toggleTheme}
                style={{ padding: '6px 12px', fontSize: '0.8rem', minHeight: '36px' }}
              >
                {theme === 'dark' ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#6366f1" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
