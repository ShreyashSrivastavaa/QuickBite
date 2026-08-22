import React from 'react';
import { Star, Clock, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const DEFAULT_FOOD_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';

export default function ProductCard({ food }) {
  const { addToCart, updateQuantity, cart } = useCart();

  const cartItem = cart.find((item) => item.food._id === food._id);
  const qty = cartItem ? cartItem.qty : 0;

  const imageUrl = food.images && food.images.length > 0 ? food.images[0] : DEFAULT_FOOD_IMAGE;
  const ratingVal = food.rating?.rate || 4.8;
  const readyTime = food.readyTime || 25;
  const isVeg = food.isVeg !== undefined ? food.isVeg : food.name.toLowerCase().includes('(veg)');

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: '100%',
      position: 'relative'
    }}>
      {/* Food Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden' }}>
        <img
          src={imageUrl}
          alt={food.name}
          onError={(e) => { e.target.src = DEFAULT_FOOD_IMAGE; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
        />

        {/* Category Pill & Veg/Non-Veg Indicator */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span
            className="badge badge-emerald"
            style={{
              backdropFilter: 'blur(10px)',
              background: 'rgba(7, 9, 14, 0.85)',
              color: '#34d399'
            }}
          >
            {food.category}
          </span>

          <span
            style={{
              backdropFilter: 'blur(10px)',
              background: 'rgba(7, 9, 14, 0.85)',
              padding: '4px 7px',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${isVeg ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`
            }}
            title={isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
          >
            <div style={{
              width: '13px',
              height: '13px',
              border: `1.5px solid ${isVeg ? '#22c55e' : '#ef4444'}`,
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {isVeg ? (
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
              ) : (
                <div style={{
                  width: 0,
                  height: 0,
                  borderLeft: '3.5px solid transparent',
                  borderRight: '3.5px solid transparent',
                  borderBottom: '6.5px solid #ef4444'
                }} />
              )}
            </div>
          </span>
        </div>

        {/* Rating Badge */}
        <span
          className="badge badge-gold"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backdropFilter: 'blur(10px)',
            background: 'rgba(7, 9, 14, 0.85)',
            color: '#fbbf24'
          }}
        >
          <Star size={12} fill="#fbbf24" color="#fbbf24" />
          {ratingVal.toFixed(1)}
        </span>

        {/* Item Added Quantity Badge on Top Right */}
        {qty > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>{qty} in Cart</span>
          </div>
        )}
      </div>

      {/* Food Details */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  border: `1.5px solid ${isVeg ? '#22c55e' : '#ef4444'}`,
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                title={isVeg ? 'Pure Veg' : 'Non-Veg'}
              >
                {isVeg ? (
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                ) : (
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '3.5px solid transparent',
                    borderRight: '3.5px solid transparent',
                    borderBottom: '6.5px solid #ef4444'
                  }} />
                )}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.25 }}>
                {food.name}
              </h3>
            </div>
          </div>

          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5
          }}>
            {food.description}
          </p>
        </div>

        {/* Bottom Card Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid var(--glass-border)'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Price</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
              ₹{food.price}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Clock size={14} color="#34d399" />
              <span>{readyTime}m</span>
            </div>

            {/* Interactive Quantity Stepper */}
            {qty > 0 ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '8px',
                padding: '4px 8px'
              }}>
                <button
                  onClick={() => updateQuantity(food._id, qty - 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2px'
                  }}
                  title="Reduce Quantity"
                >
                  <Minus size={14} />
                </button>

                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', minWidth: '16px', textAlign: 'center' }}>
                  {qty}
                </span>

                <button
                  onClick={() => addToCart(food)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    padding: '2px'
                  }}
                  title="Add More"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => addToCart(food)}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.85rem'
                }}
              >
                <Plus size={14} /> Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
