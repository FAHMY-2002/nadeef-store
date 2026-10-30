import Icon from '../components/Icon.jsx';

const ITEMS = [
  'Plant-based formulas',
  'Refillable packaging',
  'Cruelty-free',
  'Safe around kids & pets',
  'Made in Egypt',
  'Cash on delivery',
];

export default function ValueMarquee() {
  return (
    <div className="marquee" aria-label="Our promises">
      <div className="marquee__track">
        {[...ITEMS, ...ITEMS].map((item, index) => (
          <span key={index} aria-hidden={index >= ITEMS.length ? 'true' : undefined}>
            <Icon name="sparkle" size={16} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
