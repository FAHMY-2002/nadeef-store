import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { categories, countInCategory } from '../data/products.js';

export default function Categories() {
  return (
    <section id="categories" className="section on-dark categories" aria-labelledby="categories-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow">Shop &amp; book</span>
            <h2 id="categories-title">Everything your home needs, in one place</h2>
          </div>
          <p>Book a cleaner, a plumber or an AC technician, or stock up on cleaning products for every room.</p>
        </div>
        <div className="cat-grid">
          {categories.map((category) => {
            const count = countInCategory(category.id);
            return (
              <Link key={category.id} to={`/shop?cat=${category.id}`} className="cat-card">
                <span className="cat-card__icon">
                  <Icon name={category.icon} size={26} />
                </span>
                <h3>{category.name}</h3>
                <p>{category.blurb}</p>
                <span className="cat-card__foot">
                  {count} {count === 1 ? 'item' : 'items'}
                  <Icon name="arrowUpRight" size={18} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
