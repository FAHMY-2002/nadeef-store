import { Link } from 'react-router-dom';

export function LogoMark({ size = 34, inverted = false }) {
  const tile = inverted ? 'var(--lime)' : 'var(--forest)';
  const drop = inverted ? 'var(--forest-deep)' : 'var(--lime)';
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true">
      <rect width="34" height="34" rx="11" fill={tile} />
      <path d="M17 7s7 7.6 7 12.6a7 7 0 0 1-14 0C10 14.6 17 7 17 7z" fill={drop} />
      <path d="M14 20.5a3.2 3.2 0 0 0 3 3" stroke={tile} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function Logo({ inverted = false }) {
  return (
    <Link to="/" className={`logo${inverted ? ' logo--inverted' : ''}`} aria-label="Nadeef home">
      <LogoMark inverted={inverted} />
      <span>nadeef</span>
    </Link>
  );
}
