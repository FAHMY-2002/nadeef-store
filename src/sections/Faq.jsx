import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, formatPrice } from '../utils/format.js';

const QUESTIONS = [
  {
    q: 'Where do you deliver, and how long does it take?',
    a: `We deliver across Egypt. Orders placed before 6 PM reach Cairo and Giza the next day; other governorates take 2 to 4 working days. Delivery is free on orders over ${formatPrice(FREE_DELIVERY_THRESHOLD)}, otherwise it costs ${formatPrice(DELIVERY_FEE)}.`,
  },
  {
    q: 'How do service visits work?',
    a: 'Choose a day and time slot at checkout. A vetted technician calls the day before to confirm, then arrives within your slot. Any parts are quoted before work starts, and you pay after the visit.',
  },
  {
    q: 'How can I pay?',
    a: 'Pay in cash or by card when your order arrives or after the visit. Couriers and technicians carry a card machine.',
  },
  {
    q: 'Are your products safe around kids and pets?',
    a: 'Our formulas are plant-based and free from chlorine, phosphates, ammonia and synthetic dyes. As with any cleaner, keep bottles out of reach of children and rinse surfaces that food or pets touch.',
  },
  {
    q: 'How do refills work?',
    a: 'Buy a bottle once, then order refill pouches. Pour the pouch into your empty bottle and recycle the pouch. A 1.5 L refill fills three 500 ml bottles.',
  },
  {
    q: 'Can I return a product?',
    a: 'Yes. Unopened products can be returned within 14 days. If something arrives damaged, message us within 48 hours and we’ll replace it.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="container faq">
        <div className="faq__intro">
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-title">Got questions? We’ve got answers</h2>
          <p>Can’t find what you’re looking for? Our team replies within a few hours, every day.</p>
          <div className="contact-card">
            <p>Talk to us</p>
            <strong>
              <Icon name="phone" size={18} /> +20 100 000 0000
            </strong>
            <strong>
              <Icon name="mail" size={18} /> hello@nadeef.example
            </strong>
          </div>
        </div>

        <div className="accordion">
          {QUESTIONS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className={`acc-item${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    className="acc-trigger"
                    id={`faq-q-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${index}`}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    {item.q}
                    <span className="acc-icon">
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${index}`} role="region" aria-labelledby={`faq-q-${index}`} className="acc-panel" aria-hidden={!isOpen}>
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
