import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onOpenCheckout }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    tax,
    total,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 7, 13, 0.78)',
        backdropFilter: 'blur(10px)',
        zIndex: 90,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="cart-drawer-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          maxHeight: '100vh',
          backgroundColor: '#0d121d',
          borderLeft: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.7)',
          animation: 'slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: 'clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 24px)',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Your Food Cart</h2>
          </div>
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
            style={{ width: '38px', height: '38px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 24px)' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
              <ShoppingBag size={48} color="#64748b" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--text-primary)' }}>Your cart is empty</h3>
              <p style={{ fontSize: '0.84rem' }}>Discover gourmet biryanis, burgers & wood-fired pizzas!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cart.map((item) => (
                <div
                  key={item.food._id}
                  className="glass-card"
                  style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <img
                    src={item.food.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                    alt={item.food.name}
                    style={{ width: '58px', height: '58px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.food.name}
                    </h4>
                    <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--primary)' }}>
                      ₹{item.food.price * item.qty}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0, 0, 0, 0.08)', padding: '3px 6px', borderRadius: '8px', border: '1px solid var(--glass-border)', flexShrink: 0 }}>
                    <button
                      onClick={() => updateQuantity(item.food._id, item.qty - 1)}
                      aria-label="Decrease quantity"
                      style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', padding: '4px' }}
                    >
                      <Minus size={13} />
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '16px', textAlign: 'center', color: 'var(--text-primary)' }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => addToCart(item.food)}
                      aria-label="Increase quantity"
                      style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', padding: '4px' }}
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.food._id)}
                    aria-label="Remove item"
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px', flexShrink: 0 }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Price Summary in INR (₹) */}
        {cart.length > 0 && (
          <div style={{
            padding: 'clamp(16px, 3vw, 24px)',
            borderTop: '1px solid var(--glass-border)',
            background: 'var(--bg-card)',
            marginTop: 'auto'
          }}>
            {/* Free Delivery Indicator */}
            {subtotal < 499 ? (
              <div style={{ marginBottom: '14px', fontSize: '0.78rem', color: '#f97316', textAlign: 'center', background: 'rgba(249, 115, 22, 0.12)', padding: '7px', borderRadius: '8px', fontWeight: 600 }}>
                Add <b>₹{499 - subtotal}</b> more for <b>FREE Delivery</b>!
              </div>
            ) : (
              <div style={{ marginBottom: '14px', fontSize: '0.78rem', color: '#10b981', textAlign: 'center', fontWeight: 700, background: 'rgba(16, 185, 129, 0.12)', padding: '7px', borderRadius: '8px' }}>
                🎉 You've unlocked FREE Delivery across India!
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Express Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#10b981' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Estimated GST (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                paddingTop: '8px',
                borderTop: '1px solid var(--glass-border)'
              }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--primary)' }}>₹{total}</span>
              </div>
            </div>

            <button
              className="btn btn-accent glow-accent"
              style={{ width: '100%', minHeight: '46px', fontSize: '0.95rem' }}
              onClick={() => {
                setIsCartOpen(false);
                onOpenCheckout();
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
