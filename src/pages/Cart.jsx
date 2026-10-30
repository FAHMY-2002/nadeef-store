import { Link } from 'react-router-dom';
import FreeDeliveryBar from '../components/FreeDeliveryBar.jsx';
import Icon from '../components/Icon.jsx';
import ProductMedia from '../components/ProductMedia.jsx';
import ProductCard from '../components/ProductCard.jsx';
import QuantityStepper from '../components/QuantityStepper.jsx';
import { PromoForm, Totals } from '../components/OrderSummary.jsx';
import { useCart } from '../context/CartContext.jsx';
import { products } from '../data/products.js';
import { formatPrice } from '../utils/format.js';

export default function Cart() {
  const { lines, count, subtotal, hasProducts, setQty, removeItem } = useCart();

  if (lines.length === 0) {
    const picks = [...products].sort((a, b) => b.popular - a.popular).slice(0, 4);
    return (
      <>
        <section className="container cart-empty">
          <span className="empty-icon">
            <Icon name="bag" size={30} />
          </span>
          <h1>Your cart is empty</h1>
          <p>Start with our best sellers or browse by room.</p>
          <Link to="/shop" className="btn btn-forest btn-lg">
            Browse products <Icon name="arrowRight" size={18} />
          </Link>
        </section>
        <section className="section section--mist" aria-labelledby="picks-title">
          <div className="container">
            <div className="section-head">
              <h2 id="picks-title">Popular right now</h2>
            </div>
            <div className="product-grid">
              {picks.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Cart</span>
          </nav>
          <h1>Your cart</h1>
          <p>
            {count} {count === 1 ? 'item' : 'items'} ready for checkout.
          </p>
        </div>
      </section>

      <div className="container cart-layout">
        <div>
          <ul className="cart-list">
            {lines.map(({ product, qty }) => (
              <li key={product.id} className="cart-row">
                <Link to={`/product/${product.id}`} className="cart-row__media" style={{ '--tint': product.tint }} tabIndex={-1} aria-hidden="true">
                  <ProductMedia product={product} width={240} decorative />
                </Link>
                <div className="cart-row__info">
                  <Link to={`/product/${product.id}`} className="cart-row__name">
                    {product.name}
                  </Link>
                  <p>
                    {product.scent} · {product.size}
                  </p>
                  <p className="cart-row__unit">{formatPrice(product.price)} each</p>
                  <button type="button" className="remove-btn" onClick={() => removeItem(product.id)}>
                    <Icon name="trash" size={15} /> Remove
                  </button>
                </div>
                <div className="cart-row__controls">
                  <QuantityStepper value={qty} min={0} onChange={(next) => setQty(product.id, next)} label={`Quantity of ${product.name}`} />
                  <strong className="cart-row__total">{formatPrice(product.price * qty)}</strong>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/shop" className="back-link">
            <Icon name="arrowLeft" size={18} /> Continue shopping
          </Link>
        </div>

        <aside className="summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Order summary</h2>
          {hasProducts && (
            <div className="summary__ship">
              <FreeDeliveryBar subtotal={subtotal} />
            </div>
          )}
          <PromoForm />
          <Totals />
          <Link to="/checkout" className="btn btn-forest btn-lg btn-block">
            Go to checkout <Icon name="arrowRight" size={18} />
          </Link>
          <p className="summary__note">
            <Icon name="shield" size={16} /> Pay cash or card on delivery or after the visit.
          </p>
        </aside>
      </div>
    </>
  );
}
