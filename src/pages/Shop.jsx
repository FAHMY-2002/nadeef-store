import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useReviews } from '../context/ReviewsContext.jsx';
import { categories, countInCategory, getCategory, products } from '../data/products.js';
import { formatPrice } from '../utils/format.js';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'popular', label: 'Best selling' },
  { id: 'rating', label: 'Top rated' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
];

const PRICE_MIN = 50;
const PRICE_STEP = 50;
const PRICE_MAX = Math.ceil(Math.max(...products.map((p) => p.price)) / PRICE_STEP) * PRICE_STEP;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get('cat') || 'all';
  const query = params.get('q') || '';
  const sort = params.get('sort') || 'featured';
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [saleOnly, setSaleOnly] = useState(false);
  const searchRef = useRef(null);
  const { statsFor } = useReviews();

  useEffect(() => {
    if (params.get('focus') === 'search') searchRef.current?.focus();
  }, [params]);

  const updateParam = (key, value, defaultValue) => {
    const next = new URLSearchParams(params);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    next.delete('focus');
    setParams(next, { replace: true });
  };

  const clearFilters = () => {
    setMaxPrice(PRICE_MAX);
    setSaleOnly(false);
    setParams({}, { replace: true });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (p.price > maxPrice) return false;
      if (saleOnly && !p.oldPrice) return false;
      if (q && !`${p.name} ${p.scent} ${getCategory(p.category)?.name}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const sorters = {
      popular: (a, b) => b.popular - a.popular,
      rating: (a, b) => statsFor(b.id).average - statsFor(a.id).average || statsFor(b.id).count - statsFor(a.id).count,
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
    };
    return sorters[sort] ? [...list].sort(sorters[sort]) : list;
  }, [category, query, sort, maxPrice, saleOnly, statsFor]);

  const activeCategory = getCategory(category);
  const hasFilters = category !== 'all' || query || maxPrice < PRICE_MAX || saleOnly;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            {activeCategory ? <Link to="/shop">Shop</Link> : <span aria-current="page">Shop</span>}
            {activeCategory && (
              <>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{activeCategory.name}</span>
              </>
            )}
          </nav>
          <h1>{activeCategory ? activeCategory.name : 'All products'}</h1>
          <p>
            {activeCategory
              ? `${activeCategory.blurb}. Delivered or booked across Egypt.`
              : 'Cleaning products, plus home cleaning, plumbing and AC services you can book online.'}
          </p>
        </div>
      </section>

      <div className="container shop-layout">
        <aside className="filters" aria-label="Filters">
          <div className="filter-group">
            <h2>Category</h2>
            <div className="cat-list">
              <button type="button" className="cat-option" aria-pressed={category === 'all'} onClick={() => updateParam('cat', 'all', 'all')}>
                All products <span className="count">{products.length}</span>
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="cat-option"
                  aria-pressed={category === c.id}
                  onClick={() => updateParam('cat', c.id, 'all')}
                >
                  {c.name} <span className="count">{countInCategory(c.id)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <h2>
                <label htmlFor="price-range">Max price</label>
              </h2>
              <input
                id="price-range"
                className="range"
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="range-labels">
                <span>{formatPrice(PRICE_MIN)}</span>
                <strong>Up to {formatPrice(maxPrice)}</strong>
              </div>
            </div>

            <div className="filter-group">
              <h2>Offers</h2>
              <label className="check-field" htmlFor="sale-only">
                <input id="sale-only" type="checkbox" checked={saleOnly} onChange={(e) => setSaleOnly(e.target.checked)} />
                On sale only
              </label>
            </div>
          </div>

          {hasFilters && (
            <button type="button" className="btn btn-outline btn-block" onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </aside>

        <div className="shop-main">
          <div className="shop-toolbar">
            <div className="search-field">
              <label htmlFor="shop-search" className="visually-hidden">
                Search products
              </label>
              <Icon name="search" size={18} />
              <input
                ref={searchRef}
                id="shop-search"
                className="input"
                type="search"
                placeholder="Search products and services"
                value={query}
                onChange={(e) => updateParam('q', e.target.value, '')}
              />
            </div>
            <label htmlFor="shop-sort" className="visually-hidden">
              Sort products
            </label>
            <select id="shop-sort" className="select" value={sort} onChange={(e) => updateParam('sort', e.target.value, 'featured')}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  Sort: {s.label}
                </option>
              ))}
            </select>
          </div>

          <p className="results-count" role="status">
            {results.length} {results.length === 1 ? 'product' : 'products'}
            {query && ` for “${query}”`}
          </p>

          {results.length > 0 ? (
            <div className="product-grid">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">
                <Icon name="search" size={28} />
              </span>
              <h2>No products match these filters</h2>
              <p>Try a different search word or raise the price limit.</p>
              <button type="button" className="btn btn-forest" onClick={clearFilters}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
