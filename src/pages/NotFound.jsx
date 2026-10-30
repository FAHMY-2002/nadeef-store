import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';

export default function NotFound() {
  return (
    <section className="container cart-empty">
      <span className="empty-icon">
        <Icon name="search" size={28} />
      </span>
      <h1>We couldn't find that page</h1>
      <p>The link may be old or mistyped. Head back to the shop to keep browsing.</p>
      <div className="cart-empty__actions">
        <Link to="/" className="btn btn-outline btn-lg">
          Back to home
        </Link>
        <Link to="/shop" className="btn btn-forest btn-lg">
          Browse products
        </Link>
      </div>
    </section>
  );
}
