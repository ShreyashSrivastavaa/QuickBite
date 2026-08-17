import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import AuthModal from './components/AuthModal';
import AdminDashboardModal from './components/AdminDashboardModal';

import api from './services/api';
import { Star, ShieldCheck, Heart, Sparkles, ArrowRight, Utensils } from 'lucide-react';

function MainApp() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inThirtyMinOnly, setInThirtyMinOnly] = useState(false);
  const [loading, setLoading] = useState(true);

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
        if (res.data.success) {
          setCategories(res.data.categories || []);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Foods based on Search Query, Category, or Quick Delivery Filter
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
        if (res.data.success) {
          setFoods(res.data.foods || []);
        }
      } catch (err) {
        console.error('Failed to load foods:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchFoods();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, inThirtyMinOnly]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
      />

      {/* Product Catalog Grid */}
      <main style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '0 24px 60px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : inThirtyMinOnly
                ? '⚡ Express Delivery (Under 30 Mins)'
                : selectedCategory
                ? `${selectedCategory} Collection`
                : 'Popular Gourmet Menu'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Handcrafted dishes prepared fresh by top chefs across India.
            </p>
          </div>
          <span className="badge badge-emerald">
            {foods.length} Dishes Available
          </span>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card" style={{ height: '340px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            ))}
          </div>
        ) : foods.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px', borderRadius: 'var(--radius-lg)' }}>
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
              }}
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="product-catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {foods.map((food) => (
              <ProductCard key={food._id} food={food} />
            ))}
          </div>
        )}

        {/* Special Gourmet Promo Banner */}
        <div className="glass-panel glow-primary" style={{
          marginTop: '60px',
          padding: '40px 32px',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          alignItems: 'center'
        }}>
          <div>
            <span className="badge badge-orange" style={{ marginBottom: '12px' }}>
              🔥 Weekend Gourmet Special
            </span>
            <h3 className="font-serif" style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
              Get 15% OFF on Family Biryanis & Combos
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '480px' }}>
              Use coupon promo code <b style={{ color: 'var(--primary)' }}>QUICKBITE</b> at checkout. Free express delivery included on all orders over ₹499.
            </p>
            <button
              className="btn btn-accent glow-accent"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Biryani');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
            >
              <span>Explore Biryani Combos</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
              alt="Gourmet Biryani Feast"
              style={{
                width: '100%',
                maxWidth: '360px',
                height: '240px',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)'
              }}
            />
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div style={{ marginTop: '70px', textAlign: 'center' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            💬 Customer Testimonials
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
            Loved by Foodies Across India
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 40px auto' }}>
            Here is what our happy customers have to say about QuickBite express delivery and gourmet taste.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', textAlign: 'left' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', fontStyle: 'italic' }}>
                "The Hyderabadi Dum Biryani arrived steaming hot in just 22 minutes! Authentic aroma, premium rice, and amazing flavor. Highly recommended!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  AR
                </div>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block' }}>Aarav Roy</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Buyer • Noida</span>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', fontStyle: 'italic' }}>
                "Ordered the Wood-Fired Margherita Pizza & Chocolate Lava Cake. Best crust I've had in a long time. Packaging was 100% sealed and clean."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #c2410c)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  PS
                </div>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block' }}>Priya Sharma</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Buyer • Delhi NCR</span>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', fontStyle: 'italic' }}>
                "Loved the instant UPI checkout option! Smooth experience from ordering to real-time status updates. QuickBite is my new go-to app."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #38bdf8, #0284c7)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  VK
                </div>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block' }}>Vikram Kapoor</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Buyer • Gurgaon</span>
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
          // Re-fetch foods on landing page when admin adds new food
          const fetchFoods = async () => {
            try {
              const res = await api.get('/food');
              if (res.data.success) setFoods(res.data.foods || []);
            } catch (e) {}
          };
          fetchFoods();
        }}
      />

      {/* Rich Footer */}
      <footer className="glass-panel" style={{
        padding: '48px 36px 24px 36px',
        borderTop: '1px solid var(--glass-border)',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '40px', textAlign: 'left' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Utensils size={22} color="var(--primary)" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                Quick<span style={{ color: 'var(--primary)' }}>Bite</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              India's premier gourmet food delivery platform. Delivering fresh artisanal dishes, biryanis, pizzas, and desserts with express speed.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory('')}>Full Gourmet Menu</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setInThirtyMinOnly(true)}>⚡ Express 30-Min Delivery</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setIsOrdersOpen(true)}>Track My Order</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setIsAuthOpen(true)}>Sign In / Register</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Support & Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>📧 Email: <a href="mailto:upscaletechsolution@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>upscaletechsolution@gmail.com</a></span>
              <span>🏢 Crafted by: <b>Shreyash Srivastava (upscaletechsolution)</b></span>
              <span>🌐 Location: Noida / Delhi NCR, India</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid var(--glass-border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} <b>QuickBite India</b> • Designed & Developed with ❤️ by <b>Shreyash Srivastava (upscaletechsolution)</b>
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
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
