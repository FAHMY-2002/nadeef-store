import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import ProductArt from './ProductArt.jsx';
import QuantityStepper from './QuantityStepper.jsx';
import FreeDeliveryBar from './FreeDeliveryBar.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/format.js';

export default function CartDrawer() {
  const { isOpen, closeCart, lines, count, subtotal, setQty, removeItem } = useCart();
  const navigate = useNavigate();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  const goTo = (path) => {
    closeCart();
    navigate(path);
  };

  return (
    <>
      <div className={`drawer-overlay${isOpen ? ' is-open' : ''}`} onClick={closeCart} aria-hidden="true" />
      <aside className={`drawer${isOpen ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div className="drawer__head">
          <h2 id="drawer-title">
            Your cart <span>({count})</span>
          </h2>
          <button ref={closeButtonRef} type="button" className="icon-btn" onClick={closeCart} aria-label="Close cart">
            <Icon name="close" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <span className="empty-icon">
              <Icon name="bag" size={30} />
            </span>
            <h3>Your cart is empty</h3>
            <p>Add a few favourites and they'll show up here.</p>
            <button type="button" className="btn btn-forest" onClick={() => goTo('/shop')}>
              Browse products
            </button>
          </div>
        ) : (
          <>
            <div className="drawer__ship">
              <FreeDeliveryBar subtotal={subtotal} />
            </div>
            <ul className="drawer__body">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="line-item">
                  <Link
                    to={`/product/${product.id}`}
                    className="line-item__media"
                    style={{ '--tint': product.tint }}
                    onClick={closeCart}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <ProductArt product={product} decorative />
                  </Link>
                  <div className="line-item__info">
                    <Link to={`/product/${product.id}`} className="line-item__name" onClick={closeCart}>
                      {product.name}
                    </Link>
                    <p className="line-item__meta">
                      {product.scent} · {product.size}
                    </p>
                    <QuantityStepper value={qty} min={0} onChange={(next) => setQty(product.id, next)} label={`Quantity of ${product.name}`} />
                  </div>
                  <div className="line-item__right">
                    <strong>{formatPrice(product.price * qty)}</strong>
                    <button type="button" className="remove-btn" onClick={() => removeItem(product.id)}>
                      <Icon name="trash" size={15} /> Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer__foot">
              <div className="summary-row summary-row--total">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="drawer__note">Delivery and discount codes are applied at checkout.</p>
              <div className="drawer__actions">
                <button type="button" className="btn btn-outline" onClick={() => goTo('/cart')}>
                  View cart
                </button>
                <button type="button" className="btn btn-forest" onClick={() => goTo('/checkout')}>
                  Checkout <Icon name="arrowRight" size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
