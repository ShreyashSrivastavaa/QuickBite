import React, { useState } from 'react';
import { ShoppingBag, User, ShieldCheck, Clock, UtensilsCrossed, LogOut, Sparkles, X, Sun, Moon } from 'lucide-react';
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
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          gap: '12px',
          position: 'relative',
          letterSpacing: '0.02em'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} />
            <span>⚡ Express 30-Min Delivery Across India | Use Code <b style={{ background: 'rgba(0,0,0,0.25)', padding: '2px 6px', borderRadius: '4px' }}>QUICKBITE</b> for 15% OFF | 🛵 FREE Delivery on orders above ₹499</span>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            style={{
              position: 'absolute',
              right: '16px',
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
        padding: '16px 36px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between'
      }}>
        {/* Brand Emblem */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo.png"
            alt="QuickBite Logo"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4)',
              border: '1px solid var(--glass-border)'
            }}
          />
          <div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.5rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Quick<span style={{ color: 'var(--primary)' }}>Bite</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.62rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
              Gourmet Kitchens • India
            </span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Light / Dark Mode Toggle Button */}
          <button
            className="btn btn-ghost btn-icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{ border: '1px solid var(--glass-border)' }}
          >
            {theme === 'dark' ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#6366f1" />}
          </button>

          {/* Admin Console Toggle */}
          {admin ? (
            <button className="btn btn-ghost" onClick={onOpenAdmin} style={{ color: '#fb923c', border: '1px solid rgba(249, 115, 22, 0.4)' }}>
              <ShieldCheck size={18} />
              <span>Admin Console</span>
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={onOpenAdmin} style={{ fontSize: '0.85rem' }}>
              <ShieldCheck size={16} />
              <span>Admin</span>
            </button>
          )}

          {/* User Orders History */}
          {user && (
            <button className="btn btn-ghost" onClick={onOpenOrders}>
              <Clock size={18} />
              <span>My Orders</span>
            </button>
          )}

          {/* Auth Button */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                Namaste, {user.firstName || 'Foodie'}
              </span>
              <button className="btn btn-ghost btn-icon" onClick={logoutUser} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button className="btn btn-ghost" onClick={onOpenAuth}>
              <User size={18} />
              <span>Sign In</span>
            </button>
          )}

          {/* Shopping Cart Button */}
          <button
            className="btn btn-primary glow-primary"
            onClick={() => setIsCartOpen(true)}
            style={{ position: 'relative', padding: '10px 20px' }}
          >
            <ShoppingBag size={20} />
            <span>Cart</span>
            {totalItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#f97316',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 800,
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                border: '2px solid var(--bg-dark)',
                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.5)'
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
