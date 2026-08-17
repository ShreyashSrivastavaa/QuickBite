import React, { useState } from 'react';
import { ShoppingBag, User, ShieldCheck, Clock, LogOut, Sparkles, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenAuth, onOpenOrders, onOpenAdmin, theme, toggleTheme }) {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const { user, admin, logoutUser, logoutAdmin } = useAuth();
  const { totalItemCount, setIsCartOpen } = useCart();

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
          justify: 'center',
          gap: '8px',
          position: 'relative',
          letterSpacing: '0.01em'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={13} />
            <span>⚡ Express 30-Min Delivery | Code <b style={{ background: 'rgba(0,0,0,0.25)', padding: '1px 5px', borderRadius: '4px' }}>QUICKBITE</b> for 15% OFF</span>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            style={{
              position: 'absolute',
              right: '10px',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
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
        justify: 'space-between',
        gap: '8px'
      }}>
        {/* Brand Emblem */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo.png"
            alt="QuickBite Logo"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              objectFit: 'cover',
              boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4)',
              border: '1px solid var(--glass-border)'
            }}
          />
          <div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.35rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Quick<span style={{ color: 'var(--primary)' }}>Bite</span>
            </span>
            <span className="header-brand-sub" style={{ display: 'block', fontSize: '0.6rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
              Gourmet Kitchens • India
            </span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {/* Light / Dark Mode Toggle Button */}
          <button
            className="btn btn-ghost btn-icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{ border: '1px solid var(--glass-border)', padding: '6px 10px' }}
          >
            {theme === 'dark' ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {/* Admin Console Toggle Button */}
          {admin && (
            <button className="btn btn-ghost" onClick={onOpenAdmin} style={{ color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.4)', padding: '6px 10px' }}>
              <ShieldCheck size={16} />
              <span className="btn-label-mobile">Admin</span>
            </button>
          )}

          {/* User Orders History */}
          {user && (
            <button className="btn btn-ghost" onClick={onOpenOrders} style={{ padding: '6px 10px' }} title="My Orders">
              <Clock size={16} />
              <span className="btn-label-mobile">Orders</span>
            </button>
          )}

          {/* Authentication State Controls */}
          {admin ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="header-user-name" style={{ fontSize: '0.82rem', color: '#f97316', fontWeight: 700 }}>
                Admin
              </span>
              <button className="btn btn-ghost btn-icon" onClick={logoutAdmin} title="Logout Admin" style={{ color: '#ef4444', padding: '6px 8px' }}>
                <LogOut size={16} />
              </button>
            </div>
          ) : user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="header-user-name" style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                Namaste, {user.firstName || 'Foodie'}
              </span>
              <button className="btn btn-ghost btn-icon" onClick={logoutUser} title="Logout" style={{ padding: '6px 8px' }}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="btn btn-ghost" onClick={onOpenAuth} style={{ padding: '6px 12px' }}>
              <User size={16} />
              <span>Sign In</span>
            </button>
          )}

          {/* Shopping Cart Button */}
          <button
            className="btn btn-primary glow-primary"
            onClick={() => setIsCartOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              position: 'relative'
            }}
          >
            <ShoppingBag size={18} />
            <span className="btn-label-mobile">Cart</span>
            {totalItemCount > 0 && (
              <span style={{
                background: '#f97316',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.4)'
              }}>
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
}
