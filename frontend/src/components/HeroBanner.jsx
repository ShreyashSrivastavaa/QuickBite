import React from 'react';
import { Search, Flame, Zap, Compass, Star, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function HeroBanner({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  inThirtyMinOnly,
  setInThirtyMinOnly,
}) {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 20px 24px' }}>
      {/* Split Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'center',
        marginBottom: '48px'
      }}>
        {/* Left Column: Headline & Search */}
        <div>
          <div style={{ display: 'inline-flex', marginBottom: '20px' }}>
            <span className="badge badge-emerald">
              <Flame size={14} color="#34d399" />
              India's Premier Gourmet Food Delivery
            </span>
          </div>

          <h1 className="font-serif" style={{
            fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '20px',
            color: 'var(--text-primary)'
          }}>
            Artisanal Culinary <br />
            <span style={{
              background: 'linear-gradient(135deg, #10b981 0%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Excellence Delivered.
            </span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            maxWidth: '520px',
            lineHeight: 1.6
          }}>
            Experience authentic flavors, handcrafted biryanis, gourmet wood-fired pizzas, and indulgent desserts brought hot to your doorstep.
          </p>

          {/* Search Input Box */}
          <div style={{
            position: 'relative',
            maxWidth: '520px',
            marginBottom: '24px'
          }}>
            <Search
              size={22}
              color="#94a3b8"
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Search for biryani, burgers, pizza, or desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: '54px',
                height: '56px',
                borderRadius: 'var(--radius-full)',
                fontSize: '1rem',
                boxShadow: '0 10px 35px rgba(0, 0, 0, 0.15)'
              }}
            />
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase & Floating Badges */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Main Hero Visual Card */}
          <div className="glass-panel animate-float" style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '460px',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3), 0 0 30px rgba(16, 185, 129, 0.2)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
              alt="Gourmet Food Showcase"
              style={{ width: '100%', height: '340px', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(7, 9, 14, 0.85) 100%)'
            }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                <Star size={12} fill="#fbbf24" /> Chef's Choice
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                Hyderabadi Dum Biryani
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                Slow-cooked saffron rice with tender spiced chicken.
              </p>
            </div>
          </div>

          {/* Floating Stat Card 1 */}
          <div className="glass-panel" style={{
            position: 'absolute',
            top: '20px',
            left: '-10px',
            padding: '12px 18px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
          }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '8px', borderRadius: '10px' }}>
              <Star size={20} color="#fbbf24" fill="#fbbf24" />
            </div>
            <div>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)', display: 'block' }}>4.9 / 5.0</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Over 15,000+ Reviews</span>
            </div>
          </div>

          {/* Floating Stat Card 2 */}
          <div className="glass-panel" style={{
            position: 'absolute',
            bottom: '20px',
            right: '-10px',
            padding: '12px 18px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
          }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '10px' }}>
              <Zap size={20} color="#34d399" />
            </div>
            <div>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)', display: 'block' }}>20 Mins Avg</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Express Kitchen Prep</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Feature Highlights Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '40px'
      }}>
        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '12px', borderRadius: '14px', color: '#34d399' }}>
            <Zap size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Express 30-Min</h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Piping hot delivery</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(249, 115, 22, 0.15)', padding: '12px', borderRadius: '14px', color: '#fb923c' }}>
            <Award size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>100% Authentic</h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Artisanal ingredients</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '12px', borderRadius: '14px', color: '#fbbf24' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Hygienic Sealed</h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Safety-first packing</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '12px', borderRadius: '14px', color: '#38bdf8' }}>
            <HeartHandshake size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>COD & Instant UPI</h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Flexible checkout</span>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <button
          className={`btn ${selectedCategory === '' && !inThirtyMinOnly ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => {
            setSelectedCategory('');
            setInThirtyMinOnly(false);
          }}
          style={{ borderRadius: 'var(--radius-full)' }}
        >
          <Compass size={16} />
          <span>All Menu</span>
        </button>

        <button
          className={`btn ${inThirtyMinOnly ? 'btn-accent' : 'btn-ghost'}`}
          onClick={() => {
            setInThirtyMinOnly(!inThirtyMinOnly);
            setSelectedCategory('');
          }}
          style={{ borderRadius: 'var(--radius-full)' }}
        >
          <Zap size={16} />
          <span>⚡ Under 30 Mins</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${selectedCategory === cat && !inThirtyMinOnly ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => {
              setSelectedCategory(cat);
              setInThirtyMinOnly(false);
            }}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <span>{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
