import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import AuthModal from './components/AuthModal';
import AdminDashboardModal from './components/AdminDashboardModal';

import api from './services/api';
import { MOCK_CATEGORIES, getFilteredFoods } from './services/mockData';
import { Star, ShieldCheck, Heart, Sparkles, ArrowRight, Utensils } from 'lucide-react';

function MainApp() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inThirtyMinOnly, setInThirtyMinOnly] = useState(false);
  const [vegFilter, setVegFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  // Theme State ('dark' | 'light')
  const [theme, setTheme] = useState(localStorage.getItem('qb_theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('qb_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/food/categories');
        if (res.data.success && res.data.categories?.length > 0) {
          setCategories(res.data.categories);
          return;
        }
      } catch (err) {
        console.warn('API categories unavailable, using fallback menu categories.');
      }
      setCategories(MOCK_CATEGORIES);
    };
    fetchCategories();
  }, []);

  // Fetch Foods based on Search Query, Category, Veg/Non-Veg, or Quick Delivery Filter
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        let endpoint = '/food';

        if (searchQuery.trim()) {
          endpoint = `/food/search?q=${encodeURIComponent(searchQuery.trim())}`;
        } else if (inThirtyMinOnly) {
          endpoint = '/food/in-30-min';
        } else if (selectedCategory) {
          endpoint = `/food?category=${encodeURIComponent(selectedCategory)}`;
        }

        const res = await api.get(endpoint);
        if (res.data.success && res.data.foods?.length > 0) {
          let list = res.data.foods;
          if (vegFilter === 'veg') {
            list = list.filter((item) => item.isVeg === true || item.name.toLowerCase().includes('(veg)'));
          } else if (vegFilter === 'non-veg') {
            list = list.filter((item) => item.isVeg === false && !item.name.toLowerCase().includes('(veg)'));
          }
          setFoods(list);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API foods unavailable, using fallback gourmet catalog.');
      }

      // Standalone / Fallback dataset
      const localFoods = getFilteredFoods({
        searchQuery,
        selectedCategory,
        inThirtyMinOnly,
        vegFilter,
      });
      setFoods(localFoods);
      setLoading(false);
    };

    const timer = setTimeout(() => {
      fetchFoods();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, inThirtyMinOnly, vegFilter]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Luxury Glassmorphic Preloader */}
      {showPreloader && <Preloader onFinish={() => setShowPreloader(false)} />}

      {/* Top Glassmorphism Navigation */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Luxury Split Hero Banner */}
      <HeroBanner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        inThirtyMinOnly={inThirtyMinOnly}
        setInThirtyMinOnly={setInThirtyMinOnly}
        vegFilter={vegFilter}
        setVegFilter={setVegFilter}
      />

      {/* Product Catalog Grid */}
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: 'clamp(14px, 2.5vw, 24px) clamp(14px, 2.5vw, 24px) 60px clamp(14px, 2.5vw, 24px)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 className="font-serif" style={{ fontSize: 'clamp(1.45rem, 3.2vw, 2.1rem)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : vegFilter === 'veg'
                ? '🌿 Pure Veg Gourmet Menu'
                : vegFilter === 'non-veg'
                ? '🍗 Non-Veg Gourmet Delicacies'
                : inThirtyMinOnly
                ? '⚡ Express Delivery (Under 30 Mins)'
                : selectedCategory
                ? `${selectedCategory} Collection`
                : 'Popular Gourmet Menu'}
            </h2>
            <p style={{ fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {vegFilter === 'veg'
                ? '100% pure vegetarian culinary masterpieces prepared with artisanal ingredients.'
                : vegFilter === 'non-veg'
                ? 'Handcrafted dum mutton, slow-cooked chicken, and succulent barbecue meats.'
                : 'Handcrafted dishes prepared fresh by top chefs across India.'}
            </p>
          </div>
          <span className="badge badge-emerald" style={{ alignSelf: 'flex-start', fontSize: '0.72rem' }}>
            {foods.length} Dishes Available
          </span>
        </div>

        {loading ? (
          <div className="product-catalog-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="glass-card" style={{ height: '320px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            ))}
          </div>
        ) : foods.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: 'clamp(36px, 6vw, 60px) 20px', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>No food items found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Try searching for a different keyword or browse all menu items.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setInThirtyMinOnly(false);
                setVegFilter('all');
              }}
              style={{ minHeight: '44px' }}
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="product-catalog-grid">
            {foods.map((food) => (
              <ProductCard key={food._id} food={food} />
            ))}
          </div>
        )}

        {/* Special Gourmet Promo Banner */}
        <div className="glass-panel glow-primary" style={{
          marginTop: 'clamp(36px, 6vw, 60px)',
          padding: 'clamp(20px, 4vw, 36px)',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="promo-banner-grid">
            <div>
              <span className="badge badge-orange" style={{ marginBottom: '10px', fontSize: '0.72rem' }}>
                🔥 Weekend Gourmet Special
              </span>
              <h3 className="font-serif" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                Get 15% OFF on Family Biryanis & Combos
              </h3>
              <p style={{ fontSize: 'clamp(0.84rem, 1.8vw, 0.94rem)', color: 'var(--text-secondary)', marginBottom: '20px', maxWidth: '480px', lineHeight: 1.5 }}>
                Use coupon promo code <b style={{ color: 'var(--primary)' }}>ZYMEAL</b> at checkout. Free express delivery included on all orders over ₹499.
              </p>
              <button
                className="btn btn-accent glow-accent"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Biryani');
                  window.scrollTo({ top: 450, behavior: 'smooth' });
                }}
                style={{ minHeight: '44px' }}
              >
                <span>Explore Biryani Combos</span>
                <ArrowRight size={17} />
              </button>
            </div>

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <img
                src="/og-banner.png"
                alt="Zymeal Gourmet Biryani Feast"
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  height: 'clamp(160px, 24vw, 220px)',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div style={{ marginTop: 'clamp(40px, 7vw, 70px)', textAlign: 'center' }}>
          <span className="badge badge-gold" style={{ marginBottom: '10px', fontSize: '0.72rem' }}>
            💬 Customer Testimonials
          </span>
          <h2 className="font-serif" style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.3rem)', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
            Loved by Foodies Across India
          </h2>
          <p style={{ fontSize: 'clamp(0.85rem, 1.8vw, 0.98rem)', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto clamp(20px, 4vw, 36px) auto' }}>
            Here is what our happy customers have to say about Zymeal express delivery and gourmet taste.
          </p>

          <div className="testimonials-grid">
            <div className="glass-card" style={{ padding: 'clamp(16px, 2.5vw, 22px)' }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px', fontStyle: 'italic', lineHeight: 1.5 }}>
                "The Hyderabadi Dum Biryani arrived steaming hot in just 22 minutes! Authentic aroma, premium rice, and amazing flavor. Highly recommended!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                  AR
                </div>
                <div>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'block' }}>Aarav Roy</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Verified Buyer • Noida</span>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 'clamp(16px, 2.5vw, 22px)' }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px', fontStyle: 'italic', lineHeight: 1.5 }}>
                "Ordered the Wood-Fired Margherita Pizza & Chocolate Lava Cake. Best crust I've had in a long time. Packaging was 100% sealed and clean."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #c2410c)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                  PS
                </div>
                <div>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'block' }}>Priya Sharma</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Verified Buyer • Delhi NCR</span>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 'clamp(16px, 2.5vw, 22px)' }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px', fontStyle: 'italic', lineHeight: 1.5 }}>
                "Loved the instant UPI checkout option! Smooth experience from ordering to real-time status updates. Zymeal is my new go-to app."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #38bdf8, #0284c7)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                  VK
                </div>
                <div>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'block' }}>Vikram Kapoor</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Verified Buyer • Gurgaon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
      <OrderHistoryModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAdminSuccess={() => setIsAdminOpen(true)}
      />
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onFoodCreated={() => {
          const fetchFoods = async () => {
            try {
              const res = await api.get('/food');
              if (res.data.success) setFoods(res.data.foods || []);
            } catch (e) {}
          };
          fetchFoods();
        }}
      />

      {/* Rich Responsive Footer */}
      <footer className="glass-panel" style={{
        padding: 'clamp(28px, 4vw, 44px) clamp(16px, 3vw, 36px) 24px clamp(16px, 3vw, 36px)',
        borderTop: '1px solid var(--glass-border)',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', marginBottom: '32px' }}>
          <div className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Utensils size={20} color="var(--primary)" />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                  Zy<span style={{ color: 'var(--primary)' }}>meal</span>
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                India's premier gourmet food delivery platform. Delivering fresh artisanal dishes, biryanis, pizzas, and desserts with express speed.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Quick Navigation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setSelectedCategory('')}>🍽️ Full Gourmet Menu</span>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setInThirtyMinOnly(true)}>⚡ Express 30-Min Delivery</span>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setIsOrdersOpen(true)}>📦 Track My Order</span>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setIsAuthOpen(true)}>👤 Sign In / Register</span>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Support & Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>📧 <a href="mailto:upscaletechsolution@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>upscaletechsolution@gmail.com</a></span>
                <span>🏢 Crafted by: <b>Shreyash Srivastava (upscaletechsolution)</b></span>
                <span>🌐 Location: Noida / Delhi NCR, India</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid var(--glass-border)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          © {new Date().getFullYear()} <b>Zymeal India</b> • Designed & Developed with ❤️ by <b>Shreyash Srivastava (upscaletechsolution)</b>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <MainApp />
          <Analytics />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
