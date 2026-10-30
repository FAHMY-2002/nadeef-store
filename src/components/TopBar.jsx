import Icon from './Icon.jsx';
import { FREE_DELIVERY_THRESHOLD, formatPrice } from '../utils/format.js';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <p className="topbar__promo">
          <Icon name="truck" size={17} />
          <span>
            Free delivery <span className="topbar__long">in Cairo &amp; Giza on orders </span>over{' '}
            {formatPrice(FREE_DELIVERY_THRESHOLD)}
          </span>
        </p>
        <div className="topbar__meta">
          <span>
            <Icon name="phone" size={15} /> +20 100 000 0000
          </span>
          <span>
            <Icon name="clock" size={15} /> Daily, 9 AM – 10 PM
          </span>
        </div>
      </div>
    </div>
  );
}
