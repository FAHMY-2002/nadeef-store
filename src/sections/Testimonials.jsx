import { Link } from 'react-router-dom';
import { Stars } from '../components/Rating.jsx';
import { ReviewCard } from '../components/ProductReviews.jsx';
import { useReviews } from '../context/ReviewsContext.jsx';
import { getProduct } from '../data/products.js';

// Reviews featured on the home page: [product id, reviewer name].
const FEATURED = [
  ['home-cleaning-regular', 'Noha Ragab'],
  ['ac-maintenance', 'Mohamed Zaki'],
  ['plumber-visit', 'Walid Ezzat'],
];

export default function Testimonials() {
  const { reviewsFor, overall } = useReviews();
  const featured = FEATURED.map(([productId, name]) => {
    const review = reviewsFor(productId).find((r) => r.name === name);
    return review && { review, product: getProduct(productId) };
  }).filter(Boolean);

  if (featured.length === 0) return null;
  const hasSamples = featured.some(({ review }) => review.sample);

  return (
    <section className="section section--mist" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <span className="eyebrow">Reviews</span>
            <h2 id="reviews-title">Loved in homes across Egypt</h2>
          </div>
          <div className="rating-summary">
            <strong>{overall.average.toFixed(1)}</strong>
            <div>
              <Stars value={overall.average} size={18} />
              <span>From {overall.count} reviews</span>
            </div>
          </div>
        </div>
        <ul className="reviews">
          {featured.map(({ review, product }) => (
            <li key={review.id} className="review">
              <ul className="review__inner">
                <ReviewCard review={review} />
              </ul>
              <Link to={`/product/${product.id}`} className="review__product">
                {product.name} →
              </Link>
            </li>
          ))}
        </ul>
        {hasSamples && <p className="reviews-note">Reviews marked “Sample review” are examples, not customer reviews.</p>}
      </div>
    </section>
  );
}
