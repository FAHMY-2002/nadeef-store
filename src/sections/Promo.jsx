import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { PROMO } from '../utils/format.js';

const PERKS = ['Works on everything, refills included', 'Next-day delivery in Cairo and Giza', 'Cash or card on delivery', 'Free returns within 14 days'];

export default function Promo() {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  const copyCode = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    navigator.clipboard?.writeText(PROMO.code).then(done, () => {
      // Clipboard can be blocked; select the code so it can be copied by hand.
      const range = document.createRange();
      range.selectNodeContents(codeRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    });
  };

  return (
    <section className="section" aria-labelledby="promo-title">
      <div className="container">
        <div className="promo on-dark">
          <div className="promo__main">
            <span className="pill pill--lime">
              <Icon name="tag" size={16} /> First order offer
            </span>
            <h2 id="promo-title">Get 15% off your first order</h2>
            <p>Add the code at checkout and the discount comes off your whole basket.</p>
            <div className="promo__code">
              <code ref={codeRef}>{PROMO.code}</code>
              <button type="button" onClick={copyCode}>
                <Icon name={copied ? 'check' : 'copy'} size={16} />
                {copied ? 'Copied' : 'Copy code'}
              </button>
            </div>
          </div>
          <div className="promo__side">
            <ul className="check-list">
              {PERKS.map((perk) => (
                <li key={perk}>
                  <span className="check">
                    <Icon name="check" size={16} strokeWidth={2.4} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <Link to="/shop" className="btn btn-lime btn-lg">
              Start shopping
              <span className="btn__icon">
                <Icon name="arrowUpRight" size={16} strokeWidth={2.2} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
