import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { formatPrice } from '../utils/format.js';

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <section className="container cart-empty">
        <h1>No recent order</h1>
        <p>Your order confirmation shows here right after checkout.</p>
        <Link to="/shop" className="btn btn-forest btn-lg">
          Browse products
        </Link>
      </section>
    );
  }

  const firstName = order.customer.fullName.trim().split(/\s+/)[0];
  const payment = order.customer.payment === 'card' ? 'Card' : 'Cash';
  const visitDay = order.visit
    ? new Date(`${order.visit.date}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
    : null;

  return (
    <section className="container success">
      <span className="success__icon">
        <Icon name="check" size={40} strokeWidth={2.4} />
      </span>
      <h1>Thanks, {firstName}! Your order is confirmed.</h1>
      <p>
        We'll call <strong>{order.customer.phone}</strong> to confirm{order.visit ? ' the visit' : ' delivery'}. Your order number is{' '}
        <strong>{order.number}</strong>.
      </p>

      <div className="order-card">
        <div className="order-card__meta">
          {order.estimate && (
            <div>
              <span>Delivery</span>
              <strong>{order.estimate}</strong>
            </div>
          )}
          {order.visit && (
            <div>
              <span>Visit</span>
              <strong>
                {visitDay}, {order.visit.slot.split(',')[0].toLowerCase()}
              </strong>
            </div>
          )}
          <div>
            <span>Payment</span>
            <strong>{payment}</strong>
          </div>
          <div>
            <span>Address</span>
            <strong>
              {order.customer.area}, {order.customer.governorate}
            </strong>
          </div>
        </div>
        <ul className="order-card__lines">
          {order.lines.map((line) => (
            <li key={line.id}>
              <span>
                {line.qty} × {line.name} <span>({line.scent})</span>
              </span>
              <span>{formatPrice(line.qty * line.price)}</span>
            </li>
          ))}
        </ul>
        <div className="totals">
          {order.discount > 0 && (
            <div className="summary-row summary-row--discount">
              <span>Discount ({order.promoCode})</span>
              <span>−{formatPrice(order.discount)}</span>
            </div>
          )}
          {order.estimate && (
            <div className="summary-row">
              <span>Delivery</span>
              <span>{order.delivery === 0 ? 'Free' : formatPrice(order.delivery)}</span>
            </div>
          )}
          <div className="summary-row summary-row--total summary-row--divider">
            <span>{order.visit ? 'Total to pay' : 'Total to pay on delivery'}</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <Link to="/shop" className="btn btn-forest btn-lg">
        Continue shopping <Icon name="arrowRight" size={18} />
      </Link>
    </section>
  );
}
