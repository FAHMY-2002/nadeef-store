import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { getProduct, isService } from '../data/products.js';
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, PROMO } from '../utils/format.js';

const CartContext = createContext(null);
const STORAGE_KEY = 'nadeef-cart';
const PROMO_KEY = 'nadeef-promo';
const MAX_QTY = 99;

function loadPromo() {
  try {
    return localStorage.getItem(PROMO_KEY) === PROMO.code ? PROMO.code : null;
  } catch {
    return null;
  }
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter((item) => getProduct(item.id) && item.qty > 0) : [];
  } catch {
    return [];
  }
}

function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const existing = items.find((item) => item.id === action.id);
      if (existing) {
        return items.map((item) =>
          item.id === action.id ? { ...item, qty: Math.min(MAX_QTY, item.qty + action.qty) } : item
        );
      }
      return [...items, { id: action.id, qty: Math.min(MAX_QTY, action.qty) }];
    }
    case 'setQty':
      if (action.qty <= 0) return items.filter((item) => item.id !== action.id);
      return items.map((item) => (item.id === action.id ? { ...item, qty: Math.min(MAX_QTY, action.qty) } : item));
    case 'remove':
      return items.filter((item) => item.id !== action.id);
    case 'clear':
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState(loadPromo);

  // Keep the cart and discount code after a page refresh.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      if (promoCode) localStorage.setItem(PROMO_KEY, promoCode);
      else localStorage.removeItem(PROMO_KEY);
    } catch {
      /* storage can be unavailable (private mode); the cart still works in memory */
    }
  }, [items, promoCode]);

  const addItem = useCallback((id, qty = 1, { openDrawer = true } = {}) => {
    dispatch({ type: 'add', id, qty });
    if (openDrawer) setIsOpen(true);
  }, []);
  const setQty = useCallback((id, qty) => dispatch({ type: 'setQty', id, qty }), []);
  const removeItem = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const clearCart = useCallback(() => {
    dispatch({ type: 'clear' });
    setPromoCode(null);
  }, []);
  const applyPromo = useCallback((code) => {
    if (code.trim().toUpperCase() !== PROMO.code) return false;
    setPromoCode(PROMO.code);
    return true;
  }, []);
  const removePromo = useCallback(() => setPromoCode(null), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => {
    const lines = items
      .map((item) => ({ ...item, product: getProduct(item.id) }))
      .filter((line) => line.product);
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.qty * line.product.price, 0);
    const discount = promoCode ? Math.round(subtotal * PROMO.rate) : 0;
    // Services are visits, so only physical products need delivery.
    const hasProducts = lines.some((line) => !isService(line.product));
    const delivery = !hasProducts || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    const total = subtotal - discount + delivery;

    return {
      lines,
      count,
      subtotal,
      discount,
      delivery,
      total,
      hasProducts,
      promoCode,
      isOpen,
      addItem,
      setQty,
      removeItem,
      clearCart,
      applyPromo,
      removePromo,
      openCart,
      closeCart,
    };
  }, [items, promoCode, isOpen, addItem, setQty, removeItem, clearCart, applyPromo, removePromo, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside <CartProvider>');
  return context;
}
