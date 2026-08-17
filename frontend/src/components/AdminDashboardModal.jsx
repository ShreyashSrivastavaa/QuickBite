import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, IndianRupee, ShoppingBag, Users, Utensils, RefreshCw, Plus } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function AdminDashboardModal({ isOpen, onClose, onFoodCreated }) {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Food Item Form State
  const [showAddFood, setShowAddFood] = useState(false);
  const [selectedRestId, setSelectedRestId] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodDesc, setFoodDesc] = useState('');
  const [foodCategory, setFoodCategory] = useState('Burgers');
  const [foodPrice, setFoodPrice] = useState('299');
  const [foodReadyTime, setFoodReadyTime] = useState('20');
  const [foodImageUrl, setFoodImageUrl] = useState('');

  const { adminToken, logoutAdmin } = useAuth();
  const { addToast } = useToast();

  const fetchAdminData = async (silent = false) => {
    if (!adminToken) return;
    try {
      if (!silent) setLoading(true);
      const [statsRes, ordersRes, restRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/orders'),
        api.get('/admin/view-restaurants'),
      ]);

      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (ordersRes.data.success) setOrders(ordersRes.data.orders);
      if (restRes.data.success) {
        setRestaurants(restRes.data.restaurants || []);
        if (restRes.data.restaurants?.length > 0 && !selectedRestId) {
          setSelectedRestId(restRes.data.restaurants[0]._id);
        }
      }
    } catch (err) {
      console.error('Failed to load admin dashboard:', err);
      if (!silent) addToast('Failed to load admin metrics.', 'error');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Real-Time Live Polling (Every 3 seconds)
  useEffect(() => {
    if (isOpen && adminToken) {
      fetchAdminData(false);

      const interval = setInterval(() => {
        fetchAdminData(true); // Silent background update
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isOpen, adminToken]);

  if (!isOpen) return null;

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await api.put(`/admin/orders/${orderId}/status`, { orderStatus: newStatus });
      if (res.data.success) {
        addToast(`Order status updated to "${newStatus}"`, 'success');
        fetchAdminData(true);
      }
    } catch (err) {
      addToast('Failed to update order status.', 'error');
    }
  };

  const handleCreateFood = async (e) => {
    e.preventDefault();
    if (!selectedRestId) {
      addToast('Please select a restaurant first.', 'error');
      return;
    }

    try {
      const res = await api.post(`/admin/add-food/${selectedRestId}`, {
        name: foodName,
        description: foodDesc,
        category: foodCategory,
        price: parseFloat(foodPrice),
        readyTime: parseInt(foodReadyTime, 10),
        images: foodImageUrl ? [foodImageUrl] : [],
      });

      if (res.data.success) {
        addToast(`Food item "${foodName}" added!`, 'success');
        setShowAddFood(false);
        setFoodName('');
        setFoodDesc('');
        fetchAdminData(true);
        if (onFoodCreated) onFoodCreated();
      }
    } catch (err) {
      addToast('Failed to add food item.', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '860px', width: '95%' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={24} color="#f97316" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              QuickBite Admin Console • Live
            </h2>
            <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>⚡ Real-Time Sync</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="btn btn-ghost" onClick={() => fetchAdminData(false)} title="Manual Refresh">
              <RefreshCw size={16} />
            </button>
            <button className="btn btn-ghost" onClick={logoutAdmin} style={{ color: '#ef4444' }}>
              Logout Admin
            </button>
            <button className="btn btn-ghost btn-icon" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div style={{ padding: '24px', maxHeight: '80vh', overflowY: 'auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
              Loading Admin Analytics & Live Orders...
            </div>
          ) : (
            <>
              {/* Analytics Metric Cards in ₹ with High Contrast */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div className="glass-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Revenue</span>
                    <IndianRupee size={20} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    ₹{stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : '0'}
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f97316', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Orders</span>
                    <ShoppingBag size={20} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {stats?.totalOrders || 0}
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f59e0b', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Kitchen Active Orders</span>
                    <Utensils size={20} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {stats?.pendingOrders || 0}
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#38bdf8', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Registered Users</span>
                    <Users size={20} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {stats?.totalUsers || 0}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Live Orders Management</h3>
                <button
                  className="btn btn-primary"
                  style={{ fontSize: '0.85rem' }}
                  onClick={() => setShowAddFood(!showAddFood)}
                >
                  <Plus size={16} />
                  <span>{showAddFood ? 'Close Form' : 'Add New Food Item'}</span>
                </button>
              </div>

              {/* Add Food Form */}
              {showAddFood && (
                <form onSubmit={handleCreateFood} className="glass-panel" style={{ padding: '20px', borderRadius: '14px', marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', color: 'var(--primary)' }}>
                    Add New Product to Menu
                  </h4>

                  <div className="input-group">
                    <label className="input-label">Select Kitchen / Restaurant</label>
                    <select
                      className="input-field"
                      value={selectedRestId}
                      onChange={(e) => setSelectedRestId(e.target.value)}
                    >
                      {restaurants.map((r) => (
                        <option key={r._id} value={r._id} style={{ background: '#0d121d', color: '#fff' }}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="input-group">
                      <label className="input-label">Food Title</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g. Paneer Butter Masala"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Category</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Biryani, Burgers, Pizza, Desserts..."
                        value={foodCategory}
                        onChange={(e) => setFoodCategory(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="input-group">
                      <label className="input-label">Price in INR (₹)</label>
                      <input
                        type="number"
                        className="input-field"
                        placeholder="299"
                        value={foodPrice}
                        onChange={(e) => setFoodPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Ready Time (Mins)</label>
                      <input
                        type="number"
                        className="input-field"
                        value={foodReadyTime}
                        onChange={(e) => setFoodReadyTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Description</label>
                    <textarea
                      className="input-field"
                      rows={2}
                      placeholder="Artisanal ingredients, spice level, etc..."
                      value={foodDesc}
                      onChange={(e) => setFoodDesc(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Image URL (Optional)</label>
                    <input
                      type="url"
                      className="input-field"
                      placeholder="https://images.unsplash.com/..."
                      value={foodImageUrl}
                      onChange={(e) => setFoodImageUrl(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-accent glow-accent" style={{ width: '100%', height: '42px', marginTop: '8px' }}>
                    Save & Publish Food Item
                  </button>
                </form>
              )}

              {/* Orders Table List */}
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                  No customer orders found.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {orders.map((ord) => (
                    <div key={ord._id} className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)' }}>
                            {ord.orderID}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            Customer: <b>{ord.user?.email || 'Guest'}</b>
                          </span>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          Total: <b style={{ color: 'var(--text-primary)' }}>₹{ord.totalAmount}</b> ({ord.items?.length || 0} items) • {ord.paidThrough}
                        </span>
                      </div>

                      {/* Order Status Selector */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => handleUpdateStatus(ord._id, e.target.value)}
                          className="input-field"
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.85rem',
                            width: 'auto',
                            fontWeight: 700,
                            color: ord.orderStatus === 'delivered' ? '#10b981' : '#f97316',
                            borderColor: 'var(--glass-border)'
                          }}
                        >
                          <option value="pending">pending</option>
                          <option value="confirmed">confirmed</option>
                          <option value="preparing">preparing</option>
                          <option value="shipped">shipped</option>
                          <option value="delivered">delivered</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
