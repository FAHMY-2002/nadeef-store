import { Link } from 'react-router-dom';
import ProductMedia from '../components/ProductMedia.jsx';
import { Stars } from '../components/Rating.jsx';
import { getProduct } from '../data/products.js';
import { useReviews } from '../context/ReviewsContext.jsx';

function ArtTile({ id }) {
  const product = getProduct(id);
  return (
    <Link to={`/product/${id}`} className="art-tile" style={{ '--tint': product.tint }}>
      <ProductMedia product={product} width={700} decorative />
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
  const { overall } = useReviews();
  return (
    <section className="section section--flush-top" aria-label="Nadeef in numbers">
      <div className="container bento">
        <div className="bento__col">
          <ArtTile id="home-cleaning-regular" />
          <StatTile value="12,400" suffix="+" label="Homes order every month" note="Across Cairo, Giza and Alexandria" />
        </div>
        <div className="bento__col bento__col--offset">
          <StatTile
            value={overall.average.toFixed(1)}
            suffix="/5"
            label="Average rating"
            note={`From ${overall.count} reviews of our products and services`}
            accent
            stars
          />
          <ArtTile id="ac-maintenance" />
        </div>
        <div className="bento__col">
          <ArtTile id="plumber-visit" />
          <StatTile value="70" suffix="%" label="Less plastic with refills" note="Keep your bottle, top it up with a pouch" />
        </div>
      </div>
    </section>
  );
}
