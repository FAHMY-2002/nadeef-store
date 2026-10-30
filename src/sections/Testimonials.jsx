import { Stars } from '../components/Rating.jsx';

// Placeholder reviews for the template. Replace them with real customer reviews.
const REVIEWS = [
  {
    title: 'My kitchen has never smelled this good',
    text: 'The degreaser took the grease off my range hood in one wipe. No headache from the smell either, which is a first.',
    name: 'Mariam H.',
    place: 'New Cairo',
    product: 'Kitchen Degreaser',
    initials: 'MH',
    color: '#F5D45E',
  },
  {
    title: 'Safe with a toddler around',
    text: 'We switched everything after our son started crawling. The floor cleaner works well and I don’t worry when he plays on the floor.',
    name: 'Ahmed K.',
    place: 'Sheikh Zayed',
    product: 'Floor Cleaner',
    initials: 'AK',
    color: '#8EC5EA',
  },
  {
    title: 'Refills make it an easy choice',
    text: 'I keep the same bottles and order refill pouches every month. Delivery is quick and the price beats the supermarket brands.',
    name: 'Salma N.',
    place: 'Alexandria',
    product: 'Dish Soap Refill',
    initials: 'SN',
    color: '#F2B5AA',
  },
];

export default function Testimonials() {
  return (
    <section className="section section--mist" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <span className="eyebrow">Reviews</span>
            <h2 id="reviews-title">Loved in homes across Egypt</h2>
          </div>
          <div className="rating-summary">
            <strong>4.9</strong>
            <div>
              <Stars value={5} size={18} />
              <span>From 8,700+ verified reviews</span>
            </div>
          </div>
        </div>
        <div className="reviews">
          {REVIEWS.map((review) => (
            <figure key={review.name} className="review">
              <Stars value={5} />
              <blockquote>
                <h3>{review.title}</h3>
                <p>{review.text}</p>
              </blockquote>
              <span className="review__product">Bought: {review.product}</span>
              <figcaption className="review__author">
                <span className="review__avatar" style={{ background: review.color }} aria-hidden="true">
                  {review.initials}
                </span>
                <span>
                  <strong>{review.name}</strong>
                  <span>{review.place}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
