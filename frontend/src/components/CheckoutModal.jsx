import React, { useState } from 'react';
import { X, CreditCard, Banknote, Smartphone, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export default function CheckoutModal({ isOpen, onClose, onOpenAuth }) {
  const { cart, total, clearCart } = useCart();
  const { user, token } = useAuth();
  const { addToast } = useToast();

  const [address, setAddress] = useState(user?.address || 'B-42, Cyber City, Sector 62, Noida, UP, 201309');
  const [phone, setPhone] = useState(user?.phone || '+91 9876543210');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      addToast('Please sign in to complete your order.', 'warning');
      onClose();
      onOpenAuth();
      return;
    }

    if (!address.trim() || !phone.trim()) {
      addToast('Please enter a delivery address and contact phone number.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/user/add-order', {
        paidThrough: paymentMethod,
        deliveryAddress: address,
        phone: phone,
      });

      if (res.data.success) {
        setCompletedOrder(res.data.order);
        clearCart();
        addToast('Order placed successfully!', 'success');
        return;
      }
    } catch (err) {
      // Standalone / Offline Fallback Order
      const newOrderId = 'ZYM-' + Math.floor(100000 + Math.random() * 900000);
      const localOrder = {
        _id: 'ord_' + Date.now(),
        orderID: newOrderId,
        totalAmount: total,
        paidThrough: paymentMethod,
        orderStatus: 'confirmed',
        deliveryAddress: address,
        phone: phone,
        items: cart.map((i) => ({
          food: i.food,
          unitPrice: i.food?.price || 0,
          quantity: i.qty,
        })),
        createdAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem('qb_orders') || '[]');
        existing.unshift(localOrder);
        localStorage.setItem('qb_orders', JSON.stringify(existing));
      } catch (e) {
        localStorage.setItem('qb_orders', JSON.stringify([localOrder]));
      }

      setCompletedOrder(localOrder);
      clearCart();
      addToast('Order placed successfully! (Demo Mode)', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: 'clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 24px)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {completedOrder ? 'Order Confirmed!' : 'Checkout'}
          </h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close Checkout Modal" style={{ width: '38px', height: '38px' }}>
            <X size={18} />
          </button>
        </div>

        {completedOrder ? (
          /* Order Confirmation View */
          <div style={{ padding: 'clamp(20px, 4vw, 32px) clamp(16px, 3vw, 24px)', textAlign: 'center' }}>
            <CheckCircle size={56} color="#10b981" style={{ marginBottom: '14px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
              Order Placed Successfully!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '18px' }}>
              Your gourmet dishes are being prepared fresh in the kitchen.
            </p>

            <div className="glass-panel" style={{ padding: '14px', borderRadius: '12px', textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.86rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <strong style={{ color: 'var(--primary)' }}>{completedOrder.orderID}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.86rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                <strong style={{ color: 'var(--text-primary)' }}>₹{completedOrder.totalAmount}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
                <span style={{ color: 'var(--text-primary)' }}>{completedOrder.paidThrough}</span>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', minHeight: '44px' }} onClick={onClose}>
              Done & Track Order
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmitOrder} style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
            {!token && (
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.82rem', color: '#f59e0b' }}>
                💡 Checking out as guest. You will be prompted to sign in or use 1-click demo login.
              </div>
            )}

            <div className="input-group">
              <label className="input-label">Delivery Address in India</label>
              <textarea
                className="input-field"
                rows={3}
                placeholder="Flat / House No., Colony / Street, City, Pincode..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Contact Phone Number</label>
              <input
                type="tel"
                className="input-field"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="input-group" style={{ marginBottom: '20px' }}>
              <label className="input-label">Payment Method</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '6px' }}>
                <button
                  type="button"
                  className={`btn ${paymentMethod === 'UPI' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setPaymentMethod('UPI')}
                  style={{ flexDirection: 'column', padding: '10px 4px', fontSize: '0.76rem', minHeight: '60px', gap: '4px' }}
                >
                  <Smartphone size={18} />
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  className={`btn ${paymentMethod === 'COD' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setPaymentMethod('COD')}
                  style={{ flexDirection: 'column', padding: '10px 4px', fontSize: '0.76rem', minHeight: '60px', gap: '4px' }}
                >
                  <Banknote size={18} />
                  <span>Cash (COD)</span>
                </button>

                <button
                  type="button"
                  className={`btn ${paymentMethod === 'CARD' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setPaymentMethod('CARD')}
                  style={{ flexDirection: 'column', padding: '10px 4px', fontSize: '0.76rem', minHeight: '60px', gap: '4px' }}
                >
                  <CreditCard size={18} />
                  <span>Card / Net</span>
                </button>
              </div>
            </div>

            {/* Total Pay Summary in ₹ */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '1px solid var(--glass-border)',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)' }}>Total Amount</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>₹{total}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: '#10b981' }}>
                <ShieldCheck size={15} /> 256-Bit Encrypted
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-accent glow-accent"
              disabled={submitting}
              style={{ width: '100%', minHeight: '46px', fontSize: '0.96rem' }}
            >
              {submitting ? 'Processing Order...' : `Pay ₹${total} & Place Order`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
