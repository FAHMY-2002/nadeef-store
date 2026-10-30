import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ProductArt from '../components/ProductArt.jsx';
import ProductCard, { Price } from '../components/ProductCard.jsx';
import QuantityStepper from '../components/QuantityStepper.jsx';
import Rating from '../components/Rating.jsx';
import NotFound from './NotFound.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getCategory, getProduct, products } from '../data/products.js';
import { FREE_DELIVERY_THRESHOLD, discountPercent, formatPrice } from '../utils/format.js';

const TABS = [
  { id: 'details', label: 'Details' },
  { id: 'how', label: 'How to use' },
  { id: 'ingredients', label: 'Ingredients' },
];

function relatedTo(product) {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products
    .filter((p) => p.category !== product.category)
    .sort((a, b) => b.popular - a.popular);
  return [...sameCategory, ...others].slice(0, 4);
}

export default function ProductPage() {
  const { id } = useParams();
  const product = getProduct(id);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('details');

  useEffect(() => {
    setQty(1);
    setTab('details');
  }, [id]);

  if (!product) return <NotFound />;

  const category = getCategory(product.category);
  const off = discountPercent(product);

  const buyNow = () => {
    addItem(product.id, qty, { openDrawer: false });
    navigate('/checkout');
  };

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
              {product.badge && <span className="badge pdp__badge">{product.badge}</span>}
              <ProductArt product={product} />
            </div>
            <ul className="pdp__chips">
              <li>
                <Icon name="leaf" size={18} /> Plant-based
              </li>
              <li>
                <Icon name="shield" size={18} /> Cruelty-free
              </li>
              <li>
                <Icon name="refill" size={18} /> Recyclable
              </li>
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
            <Rating value={product.rating} count={product.reviews} compact={false} />
            <div className="pdp__price">
              <Price product={product} className="price price--lg" />
              {off > 0 && <span className="badge badge--sale">Save {off}%</span>}
            </div>
            <p className="pdp__desc">{product.description}</p>

            <div className="pdp__buy">
              <QuantityStepper value={qty} onChange={setQty} size="lg" />
              <button type="button" className="btn btn-lime btn-lg" onClick={() => addItem(product.id, qty)}>
                <Icon name="bag" size={19} /> Add to cart · {formatPrice(product.price * qty)}
              </button>
              <button type="button" className="btn btn-forest btn-lg" onClick={buyNow}>
                Buy now
              </button>
            </div>

            <ul className="perks">
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
            </ul>

            <div className="pdp-tabs">
              <div className="pdp-tabs__list" role="tablist" aria-label="Product information">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={tab === t.id}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setTab(t.id)}
                  >
                    {t.label}
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
                {tab === 'ingredients' && <p>{product.ingredients}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

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
