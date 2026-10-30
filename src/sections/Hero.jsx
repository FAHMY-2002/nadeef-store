import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ProductArt from '../components/ProductArt.jsx';
import { getProduct } from '../data/products.js';
import { useReviews } from '../context/ReviewsContext.jsx';

const AVATARS = [
  { initials: 'MH', color: '#F5D45E' },
  { initials: 'AK', color: '#8EC5EA' },
  { initials: 'SN', color: '#F2B5AA' },
  { initials: 'YR', color: '#C3B1E8' },
];

export default function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { overall } = useReviews();

  const handleSearch = (event) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
  };

  const scrollToCategories = () => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero-wrap" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero">
          <div className="hero__content">
            <span className="pill pill--glass">
              <Icon name="leaf" size={16} /> Products &amp; home services
            </span>
            <h1 id="hero-title" className="hero__title">
              Spotless homes,{' '}
              <span className="hl">
                naturally.
                <Icon name="sparkle" className="hero__spark" />
              </span>
            </h1>
            <p className="hero__lead">
              Plant-based cleaners delivered to your door, and trusted pros for home cleaning, plumbing and AC
              maintenance, booked in a minute.
            </p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn-lime btn-lg">
                Shop all products
                <span className="btn__icon">
                  <Icon name="arrowUpRight" size={16} strokeWidth={2.2} />
                </span>
              </Link>
              <button type="button" className="btn btn-ghost-light btn-lg" onClick={scrollToCategories}>
                Book a service
              </button>
            </div>
            <div className="hero__proof">
              <div className="avatars" aria-hidden="true">
                {AVATARS.map((a) => (
                  <span key={a.initials} style={{ background: a.color }}>
                    {a.initials}
                  </span>
                ))}
              </div>
              <div>
                <strong>12K+ happy homes</strong>
                {overall.count > 0 && (
                  <span className="hero__rating">
                    <Icon name="star" size={14} /> {overall.average.toFixed(1)} average from {overall.count} reviews
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__blob" aria-hidden="true" />
            <ProductArt product={getProduct('laundry-fresh-linen')} className="hero__p hero__p--back" decorative />
            <ProductArt product={getProduct('all-purpose-lemon')} className="hero__p hero__p--left" decorative />
            <ProductArt product={getProduct('dish-soap-green-tea')} className="hero__p hero__p--right" decorative />

            <div className="float-chip float-chip--top">
              <span className="float-chip__icon">
                <Icon name="refill" size={20} />
              </span>
              <span>
                <strong>Refill pouches</strong>
                <span>Save up to 40%</span>
              </span>
            </div>

            <form className="hero-search" role="search" onSubmit={handleSearch}>
              <label htmlFor="hero-search" className="visually-hidden">
                Search products
              </label>
              <Icon name="search" size={18} className="hero-search__icon" />
              <input
                id="hero-search"
                type="search"
                placeholder="Try “AC” or “dish soap”"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" aria-label="Search">
                <Icon name="arrowRight" size={18} strokeWidth={2.2} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
