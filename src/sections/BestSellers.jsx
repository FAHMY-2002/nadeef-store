import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { categories, products } from '../data/products.js';

const TABS = [{ id: 'all', name: 'All' }, ...categories];

export default function BestSellers() {
  const [tab, setTab] = useState('all');
  const list = products
    .filter((p) => tab === 'all' || p.category === tab)
    .sort((a, b) => b.popular - a.popular)
    .slice(0, 8);

  return (
    <section className="section" aria-labelledby="bestsellers-title">
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <span className="eyebrow">Best sellers</span>
            <h2 id="bestsellers-title">The ones people reorder</h2>
          </div>
          <Link to="/shop?sort=popular" className="btn btn-outline">
            View all products <Icon name="arrowRight" size={18} />
          </Link>
        </div>
        <div className="tabs" aria-label="Filter best sellers by room">
          {TABS.map((t) => (
            <button key={t.id} type="button" className="tab" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
              {t.name}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
