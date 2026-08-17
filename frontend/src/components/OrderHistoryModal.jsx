import React, { useState, useEffect } from 'react';
import { X, Package, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function OrderHistoryModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (isOpen && token) {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const res = await api.get('/user/order');
          if (res.data.success) {
            setOrders(res.data.orders || []);
          }
        } catch (err) {
          console.error('Failed to fetch user orders:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [isOpen, token]);

  if (!isOpen) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return <span className="badge badge-emerald"><CheckCircle2 size={12} /> Delivered</span>;
      case 'shipped':
        return <span className="badge badge-orange"><Truck size={12} /> Out for Delivery</span>;
      case 'preparing':
        return <span className="badge badge-gold"><Clock size={12} /> Kitchen Preparing</span>;
      case 'confirmed':
        return <span className="badge badge-gold"><Clock size={12} /> Confirmed</span>;
      case 'cancelled':
        return <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}><AlertCircle size={12} /> Cancelled</span>;
      default:
        return <span className="badge badge-gold"><Clock size={12} /> Pending</span>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Package size={22} color="var(--primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>My Order History</h2>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
              Loading order history...
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
              <Package size={48} color="#334155" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: '#f8fafc' }}>No orders placed yet</h3>
              <p style={{ fontSize: '0.85rem' }}>Place your first order and track its status live!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map((ord) => (
                <div key={ord._id} className="glass-card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {ord.orderID}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '10px' }}>
                        {new Date(ord.createdAt || ord.orderDate).toLocaleDateString()} at {new Date(ord.createdAt || ord.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {getStatusBadge(ord.orderStatus)}
                  </div>

                  {/* Order Items */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '10px', marginBottom: '12px' }}>
                    {ord.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                        <span>{item.qty}x {item.name || item.food?.name || 'Food Item'}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>₹{(item.price || item.food?.price || 0) * item.qty}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      Address: {ord.deliveryAddress || 'Standard Delivery'}
                    </span>
                    <strong style={{ fontSize: '1.15rem', color: '#f8fafc' }}>
                      ₹{ord.totalAmount}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
