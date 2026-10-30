import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ProductMedia from '../components/ProductMedia.jsx';
import ProductCard, { Price } from '../components/ProductCard.jsx';
import ProductReviews from '../components/ProductReviews.jsx';
import QuantityStepper from '../components/QuantityStepper.jsx';
import Rating from '../components/Rating.jsx';
import NotFound from './NotFound.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useReviews } from '../context/ReviewsContext.jsx';
import { getCategory, getProduct, isService, products } from '../data/products.js';
import { FREE_DELIVERY_THRESHOLD, discountPercent, formatPrice } from '../utils/format.js';

const COPY = {
  product: {
    tabs: { details: 'Details', how: 'How to use', more: 'Ingredients' },
    chips: [
      ['leaf', 'Plant-based'],
      ['shield', 'Cruelty-free'],
      ['refill', 'Recyclable'],
    ],
    add: 'Add to cart',
    now: 'Buy now',
  },
  service: {
    tabs: { details: 'What’s included', how: 'How it works', more: 'Good to know' },
    chips: [
      ['shield', 'Vetted pros'],
      ['check', 'Work warranty'],
      ['cash', 'Pay after visit'],
    ],
    add: 'Add booking',
    now: 'Book now',
  },
};

function relatedTo(product) {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category).sort((a, b) => b.popular - a.popular);
  return [...sameCategory, ...others].slice(0, 4);
}

export default function ProductPage() {
  const { id } = useParams();
  const product = getProduct(id);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { statsFor } = useReviews();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('details');

  useEffect(() => {
    setQty(1);
    setTab('details');
  }, [id]);

  if (!product) return <NotFound />;

  const service = isService(product);
  const copy = service ? COPY.service : COPY.product;
  const category = getCategory(product.category);
  const stats = statsFor(product.id);
  const off = discountPercent(product);

  const buyNow = () => {
    addItem(product.id, qty, { openDrawer: false });
    navigate('/checkout');
  };

  const scrollToReviews = () => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs pdp-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/shop?cat=${category.id}`}>{category.name}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pdp">
          <div className="pdp__gallery">
            <div className="pdp__media" style={{ '--tint': product.tint }}>
              <div className="badges pdp__badges">
                {service && (
                  <span className="badge badge--service">
                    <Icon name="calendar" size={13} /> Service
                  </span>
                )}
                {product.badge && <span className="badge">{product.badge}</span>}
              </div>
              <ProductMedia product={product} width={1100} />
            </div>
            <ul className="pdp__chips">
              {copy.chips.map(([icon, label]) => (
                <li key={label}>
                  <Icon name={icon} size={18} /> {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="pdp__info">
            <div>
              <p className="eyebrow">{category.name}</p>
              <h1 className="pdp__title">{product.name}</h1>
              <p className="pdp__scent">
                {product.scent} · {product.size}
              </p>
            </div>
            <button type="button" className="pdp__rating-link" onClick={scrollToReviews} disabled={!stats.count}>
              <Rating value={stats.average} count={stats.count} compact={false} />
            </button>
            <div className="pdp__price">
              <Price product={product} className="price price--lg" />
              {off > 0 && <span className="badge badge--sale">Save {off}%</span>}
            </div>
            <p className="pdp__desc">{product.description}</p>

            <div className="pdp__buy">
              <QuantityStepper value={qty} onChange={setQty} size="lg" label={service ? 'Number of visits or units' : 'Quantity'} />
              <button type="button" className="btn btn-lime btn-lg" onClick={() => addItem(product.id, qty)}>
                <Icon name={service ? 'calendar' : 'bag'} size={19} /> {copy.add} · {formatPrice(product.price * qty)}
              </button>
              <button type="button" className="btn btn-forest btn-lg" onClick={buyNow}>
                {copy.now}
              </button>
            </div>

            <ul className="perks">
              {service ? (
                <>
                  <li>
                    <Icon name="calendar" />
                    <span>
                      <strong>Pick your day and time</strong> at checkout. Same-week slots in Cairo and Giza.
                    </span>
                  </li>
                  <li>
                    <Icon name="cash" />
                    <span>
                      <strong>Pay after the visit</strong>, in cash or by card
                    </span>
                  </li>
                  <li>
                    <Icon name="shield" />
                    <span>
                      <strong>Warranty on the work</strong>, with parts quoted before anything starts
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Icon name="truck" />
                    <span>
                      <strong>Free delivery</strong> on orders over {formatPrice(FREE_DELIVERY_THRESHOLD)}. Next day in Cairo and Giza.
                    </span>
                  </li>
                  <li>
                    <Icon name="cash" />
                    <span>
                      <strong>Cash or card</strong> on delivery
                    </span>
                  </li>
                  <li>
                    <Icon name="refill" />
                    <span>
                      <strong>Free returns</strong> on unopened products within 14 days
                    </span>
                  </li>
                </>
              )}
            </ul>

            <div className="pdp-tabs">
              <div className="pdp-tabs__list" role="tablist" aria-label="Product information">
                {Object.entries(copy.tabs).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    id={`tab-${key}`}
                    aria-selected={tab === key}
                    aria-controls={`panel-${key}`}
                    onClick={() => setTab(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="pdp-tabs__panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
                {tab === 'details' && (
                  <ul className="feature-list">
                    {product.features.map((feature) => (
                      <li key={feature}>
                        <Icon name="check" size={18} strokeWidth={2.2} /> {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {tab === 'how' && <p>{product.howTo}</p>}
                {tab === 'more' && <p>{product.ingredients}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReviews key={product.id} product={product} />

      <section className="section section--mist related" aria-labelledby="related-title">
        <div className="container">
          <div className="section-head section-head--row">
            <h2 id="related-title">You might also like</h2>
            <Link to="/shop" className="btn btn-outline">
              Shop all <Icon name="arrowRight" size={18} />
            </Link>
          </div>
          <div className="product-grid">
            {relatedTo(product).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
