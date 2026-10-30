import Icon from './Icon.jsx';
import { formatNumber } from '../utils/format.js';

export function Stars({ value = 5, size = 16 }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} className={i < Math.round(value) ? 'star is-on' : 'star'} />
      ))}
    </span>
  );
}

export default function Rating({ value, count, compact = true }) {
  if (!count) return <span className="rating rating--empty">No reviews yet</span>;
  const label = `Rated ${value} out of 5 from ${formatNumber(count)} ${count === 1 ? 'review' : 'reviews'}`;
  if (compact) {
    return (
      <span className="rating" aria-label={label}>
        <Icon name="star" size={15} className="star is-on" />
        <strong>{value}</strong>
        <span>({formatNumber(count)})</span>
      </span>
    );
  }
  return (
    <span className="rating rating--full" aria-label={label}>
      <Stars value={value} />
      <strong>{value}</strong>
      <span>
        {formatNumber(count)} {count === 1 ? 'review' : 'reviews'}
      </span>
    </span>
  );
}
