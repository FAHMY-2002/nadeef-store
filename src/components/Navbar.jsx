import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';
import { useCart } from '../context/CartContext.jsx';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop all' },
  { to: '/shop?cat=kitchen', label: 'Kitchen' },
  { to: '/shop?cat=bathroom', label: 'Bathroom' },
  { to: '/shop?cat=laundry', label: 'Laundry' },
];

// NavLink only compares the path, so "/shop" and "/shop?cat=kitchen" would both
// light up. Compare the category too.
function isActive(to, location) {
  const [path, query = ''] = to.split('?');
  if (location.pathname !== path) return false;
  if (path !== '/shop') return true;
  const wanted = new URLSearchParams(query).get('cat');
  const current = new URLSearchParams(location.search).get('cat');
  return wanted === current;
}

export default function Navbar() {
  const { count, openCart } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [location.pathname, location.search]);

  const renderLinks = () =>
    LINKS.map((link) => {
      const active = isActive(link.to, location);
      return (
        <Link key={link.to} to={link.to} className={active ? 'is-active' : undefined} aria-current={active ? 'page' : undefined}>
          {link.label}
        </Link>
      );
    });

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />
        <nav className="main-nav" aria-label="Main">
          {renderLinks()}
        </nav>
        <div className="header-actions">
          <Link to="/shop?focus=search" className="icon-btn" aria-label="Search products">
            <Icon name="search" />
          </Link>
          <button type="button" className="cart-btn" onClick={openCart} aria-label={`Open cart, ${count} items`}>
            <Icon name="bag" />
            <span className="cart-btn__label">Cart</span>
            <span className="cart-count">{count}</span>
          </button>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile" hidden={!menuOpen}>
        <div className="container">{renderLinks()}</div>
      </nav>
    </header>
  );
}
