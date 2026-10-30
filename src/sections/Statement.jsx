import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';

export default function Statement() {
  return (
    <section className="section statement" aria-labelledby="statement-title">
      <div className="container">
        <div className="statement__inner">
          <span className="eyebrow">Why Nadeef</span>
          <h2 id="statement-title" className="statement__text">
            We make cleaners from plants instead of harsh chemicals.{' '}
            <span>They cut grease, lift stains and leave a fresh scent, without the fumes.</span>
          </h2>
          <Link to="/shop" className="btn btn-outline">
            Explore the range <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
