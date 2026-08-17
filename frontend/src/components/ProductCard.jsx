import React from 'react';
import { Star, Clock, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const DEFAULT_FOOD_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';

export default function ProductCard({ food }) {
  const { addToCart, cart } = useCart();

  const isAdded = cart.some((item) => item.food._id === food._id);

  const imageUrl = food.images && food.images.length > 0 ? food.images[0] : DEFAULT_FOOD_IMAGE;
  const ratingVal = food.rating?.rate || 4.8;
  const readyTime = food.readyTime || 25;

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

        {/* Category Pill */}
        <span
          className="badge badge-emerald"
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backdropFilter: 'blur(10px)',
            background: 'rgba(7, 9, 14, 0.85)'
          }}
        >
          {food.category}
        </span>

        {/* Rating Badge */}
        <span
          className="badge badge-gold"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backdropFilter: 'blur(10px)',
            background: 'rgba(7, 9, 14, 0.85)'
          }}
        >
          <Star size={12} fill="#fbbf24" color="#fbbf24" />
          {ratingVal.toFixed(1)}
        </span>
      </div>

      {/* Food Details */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px', gap: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.25 }}>
              {food.name}
            </h3>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Clock size={14} color="#34d399" />
              <span>{readyTime}m</span>
            </div>

            <button
              className={`btn ${isAdded ? 'btn-ghost' : 'btn-primary'}`}
              onClick={() => addToCart(food)}
              style={{
                padding: '8px 16px',
                fontSize: '0.85rem',
                ...(isAdded && { borderColor: 'var(--primary)', color: 'var(--primary)' })
              }}
            >
              {isAdded ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <Plus size={14} /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
