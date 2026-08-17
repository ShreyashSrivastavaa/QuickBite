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
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to place order. Please try again.';
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {completedOrder ? 'Order Confirmed!' : 'Checkout'}
          </h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {completedOrder ? (
          /* Order Confirmation View */
          <div style={{ padding: '32px 24px', textAlign: 'center' }}>
            <CheckCircle size={64} color="#10b981" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Order Placed Successfully!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
              Your gourmet dishes are being prepared by the kitchen.
            </p>

            <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px', textAlign: 'left', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <strong style={{ color: 'var(--primary)' }}>{completedOrder.orderID}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                <strong style={{ color: 'var(--text-primary)' }}>₹{completedOrder.totalAmount}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
                <span style={{ color: 'var(--text-primary)' }}>{completedOrder.paidThrough}</span>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', height: '44px' }} onClick={onClose}>
              Done & Track Order
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmitOrder} style={{ padding: '24px' }}>
            {!token && (
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.85rem', color: '#f59e0b' }}>
                💡 You are checking out as a guest. Clicking checkout will prompt you to sign in.
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

            <div className="input-group" style={{ marginBottom: '24px' }}>
              <label className="input-label">Payment Method</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  className={`btn ${paymentMethod === 'UPI' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setPaymentMethod('UPI')}
                  style={{ flexDirection: 'column', padding: '12px 8px', fontSize: '0.8rem', height: 'auto' }}
                >
                  <Smartphone size={20} />
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  className={`btn ${paymentMethod === 'COD' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setPaymentMethod('COD')}
                  style={{ flexDirection: 'column', padding: '12px 8px', fontSize: '0.8rem', height: 'auto' }}
                >
                  <Banknote size={20} />
                  <span>Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  className={`btn ${paymentMethod === 'CARD' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setPaymentMethod('CARD')}
                  style={{ flexDirection: 'column', padding: '12px 8px', fontSize: '0.8rem', height: 'auto' }}
                >
                  <CreditCard size={20} />
                  <span>Debit / Card</span>
                </button>
              </div>
            </div>

            {/* Total Pay Summary in ₹ */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              padding: '16px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '1px solid var(--glass-border)',
              marginBottom: '24px'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>₹{total}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#10b981' }}>
                <ShieldCheck size={16} /> 256-Bit Encrypted Checkout
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-accent glow-accent"
              disabled={submitting}
              style={{ width: '100%', height: '48px', fontSize: '1rem' }}
            >
              {submitting ? 'Processing Order...' : `Pay ₹${total} & Place Order`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
