import Icon from '../components/Icon.jsx';
import ProductArt from '../components/ProductArt.jsx';
import { getProduct } from '../data/products.js';

const STEPS = [
  {
    title: 'Pick products or book a service',
    text: 'Shop cleaning products by room, or book home cleaning, plumbing or AC maintenance and choose your day and time slot.',
  },
  {
    title: 'We deliver, or send a pro',
    text: 'Products arrive next day in Cairo and Giza. For services, a vetted technician calls to confirm, then visits on time.',
  },
  {
    title: 'Pay when it’s done',
    text: 'Pay cash or card on delivery or after the visit. Service work comes with a warranty, and refills save you up to 40%.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section section--mist" aria-labelledby="how-title">
      <div className="container steps">
        <div className="steps__visual" aria-hidden="true">
          <div className="box">
            <div className="box__products">
              <ProductArt product={getProduct('all-purpose-lemon')} decorative />
              <ProductArt product={getProduct('floor-pine-cedar')} decorative />
              <ProductArt product={getProduct('bathroom-eucalyptus')} decorative />
            </div>
            <div className="box__front">
              <span>nadeef</span>
              <small>Handle with care · This way up</small>
            </div>
          </div>
          <div className="float-chip float-chip--delivery">
            <span className="float-chip__icon">
              <Icon name="truck" size={20} />
            </span>
            <span>
              <strong>Order by 6 PM</strong>
              <span>Delivered tomorrow in Cairo</span>
            </span>
          </div>
        </div>

        <div className="steps__content">
          <span className="eyebrow">How it works</span>
          <h2 id="how-title">Products or a pro at your door in three steps</h2>
          <ol className="steps__list">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="steps__num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
