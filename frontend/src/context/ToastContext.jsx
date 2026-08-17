import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container" style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px'
      }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="glass-panel"
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              borderLeft: toast.type === 'success' ? '4px solid #10b981' : toast.type === 'error' ? '4px solid #ef4444' : '4px solid #f59e0b',
              animation: 'slideUp 0.2s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {toast.type === 'success' && <CheckCircle2 size={20} color="#10b981" />}
              {toast.type === 'error' && <AlertCircle size={20} color="#ef4444" />}
              {toast.type === 'warning' && <Info size={20} color="#f59e0b" />}
              <span style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 500 }}>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
