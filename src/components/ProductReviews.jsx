import { useState } from 'react';
import Icon from './Icon.jsx';
import { Stars } from './Rating.jsx';
import { useReviews } from '../context/ReviewsContext.jsx';
import { formatNumber } from '../utils/format.js';

const AVATAR_COLORS = ['#F5D45E', '#8EC5EA', '#F2B5AA', '#C3B1E8', '#B7F37B', '#79C7BE'];
const PAGE_SIZE = 4;

const initials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const formatDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function ReviewCard({ review, productName }) {
  const color = AVATAR_COLORS[review.name.length % AVATAR_COLORS.length];
  return (
    <li className="review-item">
      <div className="review-item__head">
        <span className="review-item__avatar" style={{ background: color }} aria-hidden="true">
          {initials(review.name)}
        </span>
        <div className="review-item__who">
          <strong dir="auto">{review.name}</strong>
          <span>
            {review.area && (
              <>
                <bdi>{review.area}</bdi> ·{' '}
              </>
            )}
            {formatDate(review.date)}
          </span>
        </div>
        {review.sample && <span className="tag tag--sample">Sample review</span>}
        {review.mine && <span className="tag tag--mine">Your review</span>}
      </div>
      <div className="review-item__rating">
        <Stars value={review.rating} size={15} />
        <span className="visually-hidden">{review.rating} out of 5 stars</span>
        {productName && <span className="review-item__product">{productName}</span>}
      </div>
      <p className="review-item__text" dir="auto">
        {review.text}
      </p>
    </li>
  );
}

function StarInput({ value, onChange, error }) {
  const [hover, setHover] = useState(0);
  const labels = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  return (
    <fieldset className={`star-input${error ? ' star-input--error' : ''}`}>
      <legend>Your rating</legend>
      <div className="star-input__row" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={n <= (hover || value) ? 'is-on' : undefined} onMouseEnter={() => setHover(n)}>
            <input type="radio" name="review-rating" value={n} checked={value === n} onChange={() => onChange(n)} />
            <Icon name="star" size={30} />
            <span className="visually-hidden">
              {n} {n === 1 ? 'star' : 'stars'}, {labels[n - 1]}
            </span>
          </label>
        ))}
        <span className="star-input__label" aria-hidden="true">
          {labels[(hover || value) - 1] ?? 'Tap a star'}
        </span>
      </div>
      {error && <p className="field-error">{error}</p>}
    </fieldset>
  );
}

function ReviewForm({ productId, onPosted, onCancel }) {
  const { addReview } = useReviews();
  const [form, setForm] = useState({ name: '', area: '', rating: 0, text: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = {};
    if (form.name.trim().length < 2) found.name = 'Enter your name as you want it shown.';
    if (!form.rating) found.rating = 'Choose a rating from 1 to 5 stars.';
    if (form.text.trim().length < 10) found.text = 'Write at least a short sentence about your experience.';
    setErrors(found);
    if (Object.keys(found).length) return;
    addReview(productId, { name: form.name.trim(), area: form.area.trim(), rating: form.rating, text: form.text.trim() });
    onPosted();
  };

  const set = (key) => (e) => setForm((current) => ({ ...current, [key]: e.target.value }));

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      <h3>Write a review</h3>
      <StarInput value={form.rating} onChange={(rating) => setForm((c) => ({ ...c, rating }))} error={errors.rating} />
      <div className="form-grid">
        <div className={`field${errors.name ? ' field--error' : ''}`}>
          <label htmlFor="review-name">Your name</label>
          <input id="review-name" className="input" value={form.name} onChange={set('name')} placeholder="e.g. Mariam H." dir="auto" />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="review-area">
            Area <span className="optional">(optional)</span>
          </label>
          <input id="review-area" className="input" value={form.area} onChange={set('area')} placeholder="e.g. Maadi" dir="auto" />
        </div>
        <div className={`field span-2${errors.text ? ' field--error' : ''}`}>
          <label htmlFor="review-text">Your review</label>
          <textarea
            id="review-text"
            className="textarea"
            value={form.text}
            onChange={set('text')}
            placeholder="What did you like? How did it work for you?"
            dir="auto"
          />
          {errors.text && <p className="field-error">{errors.text}</p>}
        </div>
      </div>
      <div className="review-form__actions">
        <button type="submit" className="btn btn-forest">
          Post review
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ProductReviews({ product }) {
  const { reviewsFor, statsFor } = useReviews();
  const reviews = reviewsFor(product.id);
  const stats = statsFor(product.id);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [writing, setWriting] = useState(false);
  const [thanks, setThanks] = useState(false);
  const hasSamples = reviews.some((r) => r.sample);

  return (
    <section id="reviews" className="section reviews-section" aria-labelledby="reviews-heading">
      <div className="container reviews-layout">
        <div className="reviews-summary">
          <span className="eyebrow">Reviews</span>
          <h2 id="reviews-heading">What customers say</h2>
          {stats.count > 0 ? (
            <>
              <div className="reviews-summary__score">
                <strong>{stats.average.toFixed(1)}</strong>
                <div>
                  <Stars value={stats.average} size={20} />
                  <span>
                    Based on {formatNumber(stats.count)} {stats.count === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              </div>
              <ul className="dist" aria-label="Rating breakdown">
                {stats.distribution.map((n, i) => (
                  <li key={i}>
                    <span>{5 - i}</span>
                    <Icon name="star" size={13} className="star is-on" />
                    <span className="dist__bar">
                      <span style={{ width: `${stats.count ? (n / stats.count) * 100 : 0}%` }} />
                    </span>
                    <span className="dist__n">{n}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="reviews-summary__empty">No reviews yet. Be the first to share your experience.</p>
          )}
          {!writing && (
            <button
              type="button"
              className="btn btn-lime btn-block"
              onClick={() => {
                setWriting(true);
                setThanks(false);
              }}
            >
              <Icon name="chat" size={18} /> Write a review
            </button>
          )}
          {thanks && (
            <p className="reviews-summary__thanks" role="status">
              <Icon name="check" size={18} /> Thanks! Your review is posted.
            </p>
          )}
          {hasSamples && (
            <p className="reviews-summary__note">Reviews marked “Sample review” are examples, not customer reviews.</p>
          )}
        </div>

        <div className="reviews-main">
          {writing && (
            <ReviewForm
              productId={product.id}
              onCancel={() => setWriting(false)}
              onPosted={() => {
                setWriting(false);
                setThanks(true);
                setVisible((v) => v + 1);
              }}
            />
          )}
          {reviews.length > 0 && (
            <ul className="review-list">
              {reviews.slice(0, visible).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </ul>
          )}
          {visible < reviews.length && (
            <button type="button" className="btn btn-outline" onClick={() => setVisible(reviews.length)}>
              Show all {reviews.length} reviews
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
