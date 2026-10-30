import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import ProductArt from './ProductArt.jsx';
import Rating from './Rating.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getCategory } from '../data/products.js';
import { discountPercent, formatPrice } from '../utils/format.js';

export function Price({ product, className = 'price' }) {
  return (
    <span className={className}>
      <span>{formatPrice(product.price)}</span>
      {product.oldPrice && (
        <del>
          <span className="visually-hidden">Was </span>
          {formatPrice(product.oldPrice)}
        </del>
      )}
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const off = discountPercent(product);
  const url = `/product/${product.id}`;

  return (
    <article className="product-card">
      <div className="product-card__media-wrap">
        <Link to={url} className="product-card__media" style={{ '--tint': product.tint }} tabIndex={-1} aria-hidden="true">
          <ProductArt product={product} decorative />
        </Link>
        {(product.badge || off > 0) && (
          <div className="badges">
            {product.badge && <span className="badge">{product.badge}</span>}
            {off > 0 && <span className="badge badge--sale">−{off}%</span>}
          </div>
        )}
        <button type="button" className="quick-add" onClick={() => addItem(product.id)} aria-label={`Add ${product.name} to cart`}>
          <Icon name="plus" size={20} strokeWidth={2.2} />
        </button>
      </div>
      <div className="product-card__body">
        <p className="product-card__meta">
          {getCategory(product.category)?.name} · {product.size}
        </p>
        <h3 className="product-card__title">
          <Link to={url}>{product.name}</Link>
        </h3>
        <p className="product-card__scent">{product.scent}</p>
        <div className="product-card__foot">
          <Price product={product} />
          <Rating value={product.rating} count={product.reviews} />
        </div>
      </div>
    </article>
  );
}
