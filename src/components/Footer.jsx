import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';
import SectionLink from './SectionLink.jsx';
import { categories } from '../data/products.js';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address, like name@example.com.');
      return;
    }
    // Connect this to your email provider (Mailchimp, Brevo, etc.).
    setError('');
    setSubscribed(true);
  };

  return (
    <div className="newsletter">
      <div>
        <h2>Cleaning tips and first dibs on new scents</h2>
        <p>One short email a month. No spam, and you can unsubscribe anytime.</p>
      </div>
      {subscribed ? (
        <p className="newsletter__done" role="status">
          <Icon name="check" size={18} /> You're subscribed. Look out for our next email.
        </p>
      ) : (
        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email address
          </label>
          <div className="newsletter__row">
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'newsletter-error' : undefined}
            />
            <button type="submit" className="btn btn-lime">
              Subscribe
            </button>
          </div>
          {error && (
            <p id="newsletter-error" className="newsletter__error">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container footer__top">
        <Newsletter />
        <div className="footer__cols">
          <div className="footer__brand">
            <Logo inverted />
            <p>Plant-based cleaning products for every room, made in Egypt and delivered to your door.</p>
          </div>
          <div className="footer__col">
            <h3>Shop</h3>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/shop?cat=${category.id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h3>Help</h3>
            <ul>
              <li>
                <SectionLink section="faq">FAQ</SectionLink>
              </li>
              <li>
                <SectionLink section="how-it-works">Delivery</SectionLink>
              </li>
              <li>
                <Link to="/cart">Your cart</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h3>Contact</h3>
            <ul className="footer__contact">
              <li>
                <Icon name="phone" size={16} /> +20 100 000 0000
              </li>
              <li>
                <Icon name="mail" size={16} /> hello@nadeef.example
              </li>
              <li>
                <Icon name="pin" size={16} /> New Cairo, Egypt
              </li>
              <li>
                <Icon name="clock" size={16} /> Daily, 9 AM – 10 PM
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Nadeef. All rights reserved.</p>
          <p>Cash or card on delivery · Free returns within 14 days</p>
        </div>
      </div>
    </footer>
  );
}
