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
        justify: 'flex-end',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="modal-content"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.7)',
          animation: 'slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          borderLeft: '1px solid var(--glass-border)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="var(--primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Your Food Cart</h2>
          </div>
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => setIsCartOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
              <ShoppingBag size={54} color="#64748b" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Your cart is empty</h3>
              <p style={{ fontSize: '0.85rem' }}>Discover gourmet biryanis, burgers & wood-fired pizzas!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div
                  key={item.food._id}
                  className="glass-card"
                  style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <img
                    src={item.food.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                    alt={item.food.name}
                    style={{ width: '68px', height: '68px', borderRadius: '12px', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {item.food.name}
                    </h4>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)' }}>
                      ₹{item.food.price * item.qty}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 0, 0, 0.05)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    <button
                      onClick={() => updateQuantity(item.food._id, item.qty - 1)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: '18px', textAlign: 'center', color: 'var(--text-primary)' }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.food._id, item.qty + 1)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.food._id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
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
            padding: '24px',
            borderTop: '1px solid var(--glass-border)',
            background: 'var(--bg-card)'
          }}>
            {/* Free Delivery Indicator */}
            {subtotal < 499 ? (
              <div style={{ marginBottom: '16px', fontSize: '0.82rem', color: '#f97316', textAlign: 'center', background: 'rgba(249, 115, 22, 0.12)', padding: '8px', borderRadius: '8px', fontWeight: 600 }}>
                Add <b>₹{499 - subtotal}</b> more for <b>FREE Delivery</b>!
              </div>
            ) : (
              <div style={{ marginBottom: '16px', fontSize: '0.82rem', color: '#10b981', textAlign: 'center', fontWeight: 700, background: 'rgba(16, 185, 129, 0.12)', padding: '8px', borderRadius: '8px' }}>
                🎉 You've unlocked FREE Delivery across India!
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', fontSize: '0.9rem' }}>
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
                justify: 'space-between',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                paddingTop: '10px',
                borderTop: '1px solid var(--glass-border)'
              }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--primary)' }}>₹{total}</span>
              </div>
            </div>

            <button
              className="btn btn-accent glow-accent"
              style={{ width: '100%', height: '48px', fontSize: '1rem' }}
              onClick={() => {
                setIsCartOpen(false);
                onOpenCheckout();
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
