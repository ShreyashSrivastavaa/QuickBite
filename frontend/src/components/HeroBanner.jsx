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
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px 20px 16px' }}>
      {/* Split Hero Section */}
      <div className="hero-grid-split" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        alignItems: 'center',
        marginBottom: '36px'
      }}>
        {/* Left Column: Headline & Search */}
        <div>
          <div style={{ display: 'inline-flex', marginBottom: '16px' }}>
            <span className="badge badge-emerald">
              <Flame size={14} color="#34d399" />
              India's Premier Gourmet Delivery
            </span>
          </div>

          <h1 className="font-serif" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: '16px',
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
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            maxWidth: '520px',
            lineHeight: 1.5
          }}>
            Experience authentic flavors, handcrafted biryanis, gourmet wood-fired pizzas, and indulgent desserts brought hot to your doorstep.
          </p>

          {/* Search Input Box */}
          <div style={{
            position: 'relative',
            maxWidth: '520px',
            marginBottom: '16px'
          }}>
            <Search
              size={20}
              color="#94a3b8"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Search biryani, burgers, pizza..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: '48px',
                height: '50px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.95rem',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
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
            maxWidth: '440px',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25), 0 0 25px rgba(16, 185, 129, 0.15)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
              alt="Gourmet Food Showcase"
              style={{ width: '100%', height: '280px', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 35%, rgba(7, 9, 14, 0.88) 100%)'
            }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '6px' }}>
                <Star size={12} fill="#fbbf24" /> Chef's Choice
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                Hyderabadi Dum Biryani
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                Slow-cooked saffron rice with tender spiced chicken.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Feature Highlights Bar */}
      <div className="feature-highlights-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
        marginBottom: '32px'
      }}>
        <div className="glass-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '10px', borderRadius: '12px', color: '#34d399' }}>
            <Zap size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>Express 30-Min</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Piping hot delivery</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(249, 115, 22, 0.15)', padding: '10px', borderRadius: '12px', color: '#fb923c' }}>
            <Award size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>100% Authentic</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Artisanal ingredients</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '10px', borderRadius: '12px', color: '#fbbf24' }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>Hygienic Sealed</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Safety-first packing</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '12px', color: '#38bdf8' }}>
            <HeartHandshake size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>COD & Instant UPI</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Flexible checkout</span>
          </div>
        </div>
      </div>

      {/* Category Pills Bar (Horizontally Scrollable on Mobile) */}
      <div className="no-scrollbar" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        padding: '6px 2px',
        scrollBehavior: 'smooth'
      }}>
        <button
          className={`btn ${selectedCategory === '' && !inThirtyMinOnly ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => {
            setSelectedCategory('');
            setInThirtyMinOnly(false);
          }}
          style={{ borderRadius: 'var(--radius-full)', flexShrink: 0 }}
        >
          <Compass size={15} />
          <span>All Menu</span>
        </button>

        <button
          className={`btn ${inThirtyMinOnly ? 'btn-accent' : 'btn-ghost'}`}
          onClick={() => {
            setInThirtyMinOnly(!inThirtyMinOnly);
            setSelectedCategory('');
          }}
          style={{ borderRadius: 'var(--radius-full)', flexShrink: 0 }}
        >
          <Zap size={15} />
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
            style={{ borderRadius: 'var(--radius-full)', flexShrink: 0 }}
          >
            <span>{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
