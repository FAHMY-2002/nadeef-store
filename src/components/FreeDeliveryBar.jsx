import Icon from './Icon.jsx';
import { FREE_DELIVERY_THRESHOLD, formatPrice } from '../utils/format.js';

export default function FreeDeliveryBar({ subtotal }) {
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <div className="free-bar">
      <p>
        <Icon name="truck" size={18} />
        {remaining > 0 ? (
          <span>
            Add <strong>{formatPrice(remaining)}</strong> more for free delivery
          </span>
        ) : (
          <span>
            <strong>You've got free delivery</strong> on this order
          </span>
        )}
      </p>
      <div className="free-bar__track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Progress to free delivery">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
