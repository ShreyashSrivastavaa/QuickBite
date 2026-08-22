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
  vegFilter,
  setVegFilter,
}) {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(14px, 2.5vw, 24px) clamp(14px, 2.5vw, 24px) 20px clamp(14px, 2.5vw, 24px)' }}>
      {/* Split 2-Column Hero Section */}
      <div className="hero-grid-split" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
        gap: 'clamp(20px, 3vw, 36px)',
        alignItems: 'center',
        marginBottom: 'clamp(24px, 3vw, 36px)'
      }}>
        {/* Left Column: Headline, Search & Live Stats */}
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
            <span className="badge badge-emerald" style={{ fontSize: 'clamp(0.68rem, 1.8vw, 0.75rem)' }}>
              <Flame size={13} color="#34d399" />
              India's Premier Gourmet Food Delivery
            </span>
          </div>

          <h1 className="font-serif" style={{
            fontSize: 'clamp(1.9rem, 4.4vw, 3.6rem)',
            fontWeight: 800,
            lineHeight: 1.14,
            marginBottom: '14px',
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
            fontSize: 'clamp(0.88rem, 1.9vw, 1.02rem)',
            color: 'var(--text-secondary)',
            marginBottom: '20px',
            lineHeight: 1.55,
            maxWidth: '540px'
          }}>
            Experience authentic flavors, handcrafted dum biryanis, wood-fired pizzas, gourmet burgers, and indulgent desserts brought hot to your doorstep.
          </p>

          {/* Search Input Box */}
          <div style={{
            position: 'relative',
            width: '100%',
            marginBottom: '20px'
          }}>
            <Search
              size={18}
              color="#94a3b8"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Search biryani, burgers, pizza, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search Gourmet Dishes"
              style={{
                paddingLeft: '46px',
                paddingRight: '16px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.94rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
              }}
            />
          </div>

          {/* Live Order Stats Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(10px, 2vw, 18px)',
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '14px',
            border: '1px solid var(--glass-border)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={15} fill="#fbbf24" color="#fbbf24" style={{ flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block', lineHeight: 1.2 }}>4.9 / 5.0</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>15,000+ Reviews</span>
              </div>
            </div>

            <div className="hide-mobile" style={{ height: '20px', width: '1px', background: 'var(--glass-border)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={15} color="#34d399" style={{ flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#34d399', display: 'block', lineHeight: 1.2 }}>22 Mins Avg</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Express Delivery</span>
              </div>
            </div>

            <div className="hide-mobile" style={{ height: '20px', width: '1px', background: 'var(--glass-border)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={15} color="#f97316" style={{ flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#f97316', display: 'block', lineHeight: 1.2 }}>100% Sealed</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Hygienic Packing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
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
                height: 'clamp(200px, 32vw, 320px)',
                objectFit: 'cover',
                objectPosition: 'center 50%',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(7, 9, 14, 0.15) 0%, rgba(7, 9, 14, 0.88) 100%)'
            }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', textAlign: 'left' }}>
              <span className="badge badge-gold" style={{ marginBottom: '4px', fontSize: '0.7rem' }}>
                <Star size={11} fill="#fbbf24" /> Chef's Gourmet Selection
              </span>
              <p style={{ fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)', fontWeight: 600, color: '#f8fafc', margin: '4px 0 0 0' }}>
                Handcrafted Biryanis • Wood-Fired Pizzas • Truffle Burgers • Mocktails
              </p>
            </div>
          </div>

          {/* Live Kitchen Ticker Card */}
          <div className="glass-card" style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '14px',
            textAlign: 'left',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '7px', borderRadius: '9px', color: '#34d399', flexShrink: 0 }}>
                <Zap size={16} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', lineHeight: 1.2 }}>
                  Live Kitchen Express Dispatch
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  Freshly cooked upon order placement
                </span>
              </div>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.68rem', flexShrink: 0 }}>
              ⚡ 30-Min Express
            </span>
          </div>
        </div>
      </div>

      {/* 4-Column Feature Highlights Bar */}
      <div className="feature-highlights-grid" style={{ marginBottom: '28px' }}>
        <div className="glass-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '10px', borderRadius: '10px', color: '#34d399', flexShrink: 0 }}>
            <Zap size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Express 30-Min</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Piping hot delivery</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(249, 115, 22, 0.15)', padding: '10px', borderRadius: '10px', color: '#fb923c', flexShrink: 0 }}>
            <Award size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>100% Authentic</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Artisanal ingredients</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '10px', borderRadius: '10px', color: '#fbbf24', flexShrink: 0 }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Hygienic Sealed</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Safety-first packing</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px', color: '#38bdf8', flexShrink: 0 }}>
            <HeartHandshake size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>COD & Instant UPI</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Flexible checkout</span>
          </div>
        </div>
      </div>

      {/* Category & Dietary Filter Pills Bar (Horizontally Scrollable) */}
      <div id="gourmet-menu-section" className="no-scrollbar" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        padding: '6px 2px 10px 2px',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}>
        {/* All Dishes Button */}
        <button
          className={`btn ${selectedCategory === '' && !inThirtyMinOnly && vegFilter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => {
            setSelectedCategory('');
            setInThirtyMinOnly(false);
            if (setVegFilter) setVegFilter('all');
          }}
          style={{ borderRadius: 'var(--radius-full)', flexShrink: 0, padding: '8px 16px', minHeight: '40px' }}
        >
          <Compass size={15} />
          <span>All Dishes</span>
        </button>

        {/* Pure Veg Filter Button */}
        <button
          className="btn"
          onClick={() => {
            if (setVegFilter) {
              setVegFilter(vegFilter === 'veg' ? 'all' : 'veg');
            }
          }}
          style={{
            borderRadius: 'var(--radius-full)',
            flexShrink: 0,
            padding: '8px 14px',
            minHeight: '40px',
            background: vegFilter === 'veg' ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(16, 185, 129, 0.35))' : 'rgba(255, 255, 255, 0.05)',
            border: `1.5px solid ${vegFilter === 'veg' ? '#22c55e' : 'rgba(34, 197, 94, 0.35)'}`,
            color: vegFilter === 'veg' ? '#4ade80' : 'var(--text-secondary)',
            boxShadow: vegFilter === 'veg' ? '0 0 14px rgba(34, 197, 94, 0.35)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            width: '13px',
            height: '13px',
            border: '1.5px solid #22c55e',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(34, 197, 94, 0.1)'
          }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <span style={{ fontWeight: vegFilter === 'veg' ? 700 : 500, fontSize: '0.86rem' }}>Pure Veg</span>
        </button>

        {/* Non-Veg Filter Button */}
        <button
          className="btn"
          onClick={() => {
            if (setVegFilter) {
              setVegFilter(vegFilter === 'non-veg' ? 'all' : 'non-veg');
            }
          }}
          style={{
            borderRadius: 'var(--radius-full)',
            flexShrink: 0,
            padding: '8px 14px',
            minHeight: '40px',
            background: vegFilter === 'non-veg' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(220, 38, 38, 0.35))' : 'rgba(255, 255, 255, 0.05)',
            border: `1.5px solid ${vegFilter === 'non-veg' ? '#ef4444' : 'rgba(239, 68, 68, 0.35)'}`,
            color: vegFilter === 'non-veg' ? '#f87171' : 'var(--text-secondary)',
            boxShadow: vegFilter === 'non-veg' ? '0 0 14px rgba(239, 68, 68, 0.35)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            width: '13px',
            height: '13px',
            border: '1.5px solid #ef4444',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(239, 68, 68, 0.1)'
          }}>
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '3px solid transparent',
              borderRight: '3px solid transparent',
              borderBottom: '6px solid #ef4444'
            }} />
          </div>
          <span style={{ fontWeight: vegFilter === 'non-veg' ? 700 : 500, fontSize: '0.86rem' }}>Non-Veg</span>
        </button>

        {/* Under 30 Mins Filter Button */}
        <button
          className={`btn ${inThirtyMinOnly ? 'btn-accent' : 'btn-ghost'}`}
          onClick={() => {
            setInThirtyMinOnly(!inThirtyMinOnly);
          }}
          style={{ borderRadius: 'var(--radius-full)', flexShrink: 0, padding: '8px 14px', minHeight: '40px' }}
        >
          <Zap size={14} />
          <span style={{ fontSize: '0.86rem' }}>⚡ Under 30 Mins</span>
        </button>

        <div style={{ height: '20px', width: '1px', background: 'var(--glass-border)', margin: '0 2px', flexShrink: 0 }} />

        {/* Categories */}
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${selectedCategory === cat && !inThirtyMinOnly ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => {
              setSelectedCategory(selectedCategory === cat ? '' : cat);
              setInThirtyMinOnly(false);
            }}
            style={{ borderRadius: 'var(--radius-full)', flexShrink: 0, padding: '8px 14px', minHeight: '40px', fontSize: '0.86rem' }}
          >
            <span>{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
