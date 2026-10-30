import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { PROMO, formatPrice } from '../utils/format.js';

// Promo code form + price breakdown, shared by the cart and checkout pages.
export function PromoForm() {
  const { promoCode, applyPromo, removePromo } = useCart();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (promoCode) {
    return (
      <div className="promo-applied">
        <span>
          Code <strong>{promoCode}</strong> applied: {PROMO.rate * 100}% off
        </span>
        <button type="button" className="link-button" onClick={removePromo}>
          Remove
        </button>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!code.trim()) {
      setError('Enter a discount code first.');
      return;
    }
    if (!applyPromo(code)) {
      setError(`That code isn't valid. Try ${PROMO.code} for 15% off your first order.`);
      return;
    }
    setError('');
    setCode('');
  };

  return (
    <form className="promo-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="promo-code" className="visually-hidden">
        Discount code
      </label>
      <div className="promo-form__row">
        <input
          id="promo-code"
          className="input"
          placeholder="Discount code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'promo-error' : undefined}
        />
        <button type="submit" className="btn btn-outline">
          Apply
        </button>
      </div>
      {error && (
        <p id="promo-error" className="field-error">
          {error}
        </p>
      )}
    </form>
  );
}

export function Totals() {
  const { subtotal, discount, delivery, total } = useCart();
  return (
    <div className="totals">
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="summary-row summary-row--discount">
          <span>Discount</span>
          <span>−{formatPrice(discount)}</span>
        </div>
      )}
      <div className="summary-row">
        <span>Delivery</span>
        <span>{delivery === 0 ? 'Free' : formatPrice(delivery)}</span>
      </div>
      <div className="summary-row summary-row--total summary-row--divider">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
