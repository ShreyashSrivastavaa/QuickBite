import React from 'react';
import { Search, Flame, Zap, Compass, Star, Award, ShieldCheck, HeartHandshake, Clock, Sparkles } from 'lucide-react';

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
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 20px 20px' }}>
      {/* Split 2-Column Hero Section */}
      <div className="hero-grid-split" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
        gap: '36px',
        alignItems: 'center',
        marginBottom: '36px'
      }}>
        {/* Left Column: Headline, Search & Live Stats */}
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'inline-flex', marginBottom: '16px' }}>
            <span className="badge badge-emerald">
              <Flame size={14} color="#34d399" />
              India's Premier Gourmet Food Delivery
            </span>
          </div>

          <h1 className="font-serif" style={{
            fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.12,
            marginBottom: '16px',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
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
            fontSize: '1.02rem',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            lineHeight: 1.55
          }}>
            Experience authentic flavors, handcrafted dum biryanis, wood-fired pizzas, gourmet burgers, and indulgent desserts brought hot to your doorstep.
          </p>

          {/* Search Input Box */}
          <div style={{
            position: 'relative',
            width: '100%',
            marginBottom: '24px'
          }}>
            <Search
              size={20}
              color="#94a3b8"
              style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Search biryani, burgers, pizza, curries, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: '50px',
                height: '52px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.98rem',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
              }}
            />
          </div>

          {/* Live Order Stats Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '12px 18px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>4.9 / 5.0</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Over 15,000+ Reviews</span>
              </div>
            </div>

            <div style={{ height: '24px', width: '1px', background: 'var(--glass-border)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#34d399" />
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#34d399', display: 'block' }}>22 Mins Avg</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Express Delivery</span>
              </div>
            </div>

            <div style={{ height: '24px', width: '1px', background: 'var(--glass-border)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#f97316" />
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f97316', display: 'block' }}>100% Sealed</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Hygienic Packing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          {/* Main Hero Visual Showcase Card */}
          <div className="glass-panel animate-float" style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(16, 185, 129, 0.2)'
          }}>
            <img
              src="/og-banner.png"
              alt="Zymeal Gourmet Food Showcase"
              style={{
                width: '100%',
                height: '340px',
                objectFit: 'cover',
                objectPosition: 'center 50%'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(7, 9, 14, 0.2) 0%, rgba(7, 9, 14, 0.88) 100%)'
            }} />
            <div style={{ position: 'absolute', bottom: '18px', left: '20px', right: '20px', textAlign: 'left' }}>
              <span className="badge badge-gold" style={{ marginBottom: '6px' }}>
                <Star size={12} fill="#fbbf24" /> Chef's Gourmet Selection
              </span>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc', margin: '4px 0 0 0' }}>
                Handcrafted Biryanis • Wood-Fired Pizzas • Truffle Burgers • Mocktails
              </p>
            </div>
          </div>

          {/* Live Kitchen Ticker Card */}
          <div className="glass-card" style={{
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            borderRadius: '14px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '8px', borderRadius: '10px', color: '#34d399' }}>
                <Zap size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
                  Live Kitchen Express Dispatch
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  Freshly cooked upon order placement
                </span>
              </div>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
              ⚡ 30-Min Express
            </span>
          </div>
        </div>
      </div>

      {/* 4-Column Feature Highlights Bar */}
      <div className="feature-highlights-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px',
        marginBottom: '32px'
      }}>
        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '12px', borderRadius: '12px', color: '#34d399' }}>
            <Zap size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Express 30-Min</h4>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Piping hot delivery</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(249, 115, 22, 0.15)', padding: '12px', borderRadius: '12px', color: '#fb923c' }}>
            <Award size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>100% Authentic</h4>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Artisanal ingredients</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '12px', borderRadius: '12px', color: '#fbbf24' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Hygienic Sealed</h4>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Safety-first packing</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '12px', borderRadius: '12px', color: '#38bdf8' }}>
            <HeartHandshake size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>COD & Instant UPI</h4>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Flexible checkout</span>
          </div>
        </div>
      </div>

      {/* Category Pills Bar (Horizontally Scrollable) */}
      <div className="no-scrollbar" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
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
