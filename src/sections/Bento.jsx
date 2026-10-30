import { Link } from 'react-router-dom';
import ProductArt from '../components/ProductArt.jsx';
import { Stars } from '../components/Rating.jsx';
import { getProduct } from '../data/products.js';

function ArtTile({ id }) {
  const product = getProduct(id);
  return (
    <Link to={`/product/${id}`} className="art-tile" style={{ '--tint': product.tint }}>
      <ProductArt product={product} decorative />
      <span className="art-tile__tag">
        {product.name} <span>· {product.scent}</span>
      </span>
    </Link>
  );
}

function StatTile({ value, suffix, label, note, accent = false, stars = false }) {
  return (
    <div className={`stat-tile${accent ? ' stat-tile--accent' : ''}`}>
      <p className="stat-tile__value">
        {value}
        {suffix && <span>{suffix}</span>}
      </p>
      {stars && <Stars value={5} size={18} />}
      <p className="stat-tile__label">{label}</p>
      <p className="stat-tile__note">{note}</p>
    </div>
  );
}

export default function Bento() {
  return (
    <section className="section section--flush-top" aria-label="Nadeef in numbers">
      <div className="container bento">
        <div className="bento__col">
          <ArtTile id="all-purpose-lemon" />
          <StatTile value="12,400" suffix="+" label="Homes order every month" note="Across Cairo, Giza and Alexandria" />
        </div>
        <div className="bento__col bento__col--offset">
          <StatTile value="4.9" suffix="/5" label="Average rating" note="From 8,700+ verified reviews" accent stars />
          <ArtTile id="softener-lavender" />
        </div>
        <div className="bento__col">
          <ArtTile id="microfiber-cloths" />
          <StatTile value="70" suffix="%" label="Less plastic with refills" note="Keep your bottle, top it up with a pouch" />
        </div>
      </div>
    </section>
  );
}
