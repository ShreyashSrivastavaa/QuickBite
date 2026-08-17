import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const { addToast } = useToast();

  const fetchCart = async () => {
    if (token) {
      try {
        setLoading(true);
        const res = await api.get('/user/cart');
        if (res.data.success) {
          setCart(res.data.cart || []);
        }
      } catch (err) {
        console.error('Failed to fetch remote cart:', err);
      } finally {
        setLoading(false);
      }
    } else {
      const localCart = localStorage.getItem('qb_guest_cart');
      if (localCart) {
        try {
          setCart(JSON.parse(localCart));
        } catch (e) {
          setCart([]);
        }
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem('qb_guest_cart', JSON.stringify(cart));
    }
  }, [cart, token]);

  const addToCart = async (foodItem) => {
    if (token) {
      try {
        const res = await api.post(`/user/cart/${foodItem._id}`);
        if (res.data.success) {
          setCart(res.data.cart || []);
          addToast(`Added "${foodItem.name}" to cart!`, 'success');
        }
      } catch (err) {
        addToast('Failed to add item to cart.', 'error');
      }
    } else {
      setCart((prev) => {
        const existingIndex = prev.findIndex((item) => item.food._id === foodItem._id);
        let updated = [...prev];
        if (existingIndex >= 0) {
          updated[existingIndex].qty += 1;
        } else {
          updated.push({ food: foodItem, qty: 1 });
        }
        return updated;
      });
      addToast(`Added "${foodItem.name}" to cart!`, 'success');
    }
  };

  const updateQuantity = async (foodId, newQty) => {
    if (token) {
      try {
        const res = await api.put(`/user/cart/${foodId}/${newQty}`);
        if (res.data.success) {
          setCart(res.data.cart || []);
        }
      } catch (err) {
        addToast('Failed to update cart quantity.', 'error');
      }
    } else {
      setCart((prev) => {
        if (newQty <= 0) {
          return prev.filter((item) => item.food._id !== foodId);
        }
        return prev.map((item) =>
          item.food._id === foodId ? { ...item, qty: newQty } : item
        );
      });
    }
  };

  const removeFromCart = async (foodId) => {
    if (token) {
      try {
        const res = await api.delete(`/user/cart/${foodId}`);
        if (res.data.success) {
          setCart(res.data.cart || []);
          addToast('Item removed from cart.', 'info');
        }
      } catch (err) {
        addToast('Failed to remove item from cart.', 'error');
      }
    } else {
      setCart((prev) => prev.filter((item) => item.food._id !== foodId));
      addToast('Item removed from cart.', 'info');
    }
  };

  const clearCart = async () => {
    if (token) {
      try {
        await api.delete('/user/cart');
        setCart([]);
      } catch (err) {
        console.error('Failed to clear cart:', err);
      }
    } else {
      setCart([]);
      localStorage.removeItem('qb_guest_cart');
    }
  };

  // Indian Rupee (₹) Pricing Calculations
  const subtotal = cart.reduce((sum, item) => {
    const price = item.food?.price || 0;
    return sum + price * item.qty;
  }, 0);

  const deliveryFee = subtotal > 0 ? (subtotal >= 499 ? 0 : 49) : 0;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + deliveryFee + tax;
  const totalItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        deliveryFee,
        tax,
        total,
        totalItemCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
