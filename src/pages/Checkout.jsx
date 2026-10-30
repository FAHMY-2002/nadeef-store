import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ProductArt from '../components/ProductArt.jsx';
import { PromoForm, Totals } from '../components/OrderSummary.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/format.js';

const GOVERNORATES = [
  'Cairo', 'Giza', 'Alexandria', 'Qalyubia', 'Sharqia', 'Dakahlia', 'Gharbia', 'Monufia', 'Beheira',
  'Kafr El Sheikh', 'Damietta', 'Port Said', 'Ismailia', 'Suez', 'Faiyum', 'Beni Suef', 'Minya', 'Asyut',
  'Sohag', 'Qena', 'Luxor', 'Aswan', 'Red Sea', 'Matrouh', 'New Valley', 'North Sinai', 'South Sinai',
];

const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash on delivery', note: 'Pay the courier when your order arrives', icon: 'cash' },
  { id: 'card', label: 'Card on delivery', note: 'The courier brings a card machine', icon: 'card' },
];

const EMPTY_FORM = { fullName: '', phone: '', email: '', governorate: 'Cairo', area: '', address: '', notes: '', payment: 'cash' };

function validate(form) {
  const errors = {};
  if (form.fullName.trim().length < 3) errors.fullName = 'Enter your full name so the courier knows who to ask for.';
  if (!/^01[0125]\d{8}$/.test(form.phone.replace(/\s|-/g, '')))
    errors.phone = 'Enter an 11-digit Egyptian mobile number, like 01012345678.';
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address, or leave it empty.';
  if (!form.area.trim()) errors.area = 'Enter your area or district, like Maadi or Smouha.';
  if (form.address.trim().length < 8) errors.address = 'Add the street, building and apartment number.';
  return errors;
}

export const deliveryEstimate = (governorate) =>
  governorate === 'Cairo' || governorate === 'Giza' ? 'Tomorrow, if you order before 6 PM' : 'In 2 to 4 working days';

function Field({ id, label, error, optional, children }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id}>
        {label} {optional && <span className="optional">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Checkout() {
  const { lines, count, subtotal, discount, delivery, total, promoCode, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  if (lines.length === 0) {
    return (
      <section className="container cart-empty">
        <span className="empty-icon">
          <Icon name="bag" size={30} />
        </span>
        <h1>Nothing to check out yet</h1>
        <p>Your cart is empty. Add a few products and come back here.</p>
        <Link to="/shop" className="btn btn-forest btn-lg">
          Browse products <Icon name="arrowRight" size={18} />
        </Link>
      </section>
    );
  }

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const inputProps = (key) => ({
    id: key,
    value: form[key],
    onChange: update(key),
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    // This is where you would send the order to your backend.
    const order = {
      number: `NDF-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: form,
      lines: lines.map(({ product, qty }) => ({ id: product.id, name: product.name, scent: product.scent, qty, price: product.price })),
      subtotal,
      discount,
      delivery,
      total,
      promoCode,
      estimate: deliveryEstimate(form.governorate),
      placedAt: new Date().toISOString(),
    };
    clearCart();
    navigate('/order-success', { replace: true, state: { order } });
  };

  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/cart">Cart</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Checkout</span>
          </nav>
          <h1>Checkout</h1>
        </div>
      </section>

      <div className="container checkout-layout">
        <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="form-section">
            <legend>
              <span className="step-dot">1</span> Contact details
            </legend>
            <div className="form-grid">
              <Field id="fullName" label="Full name" error={errors.fullName}>
                <input className="input" autoComplete="name" placeholder="e.g. Mariam Hassan" {...inputProps('fullName')} />
              </Field>
              <Field id="phone" label="Mobile number" error={errors.phone}>
                <input className="input" type="tel" inputMode="tel" autoComplete="tel" placeholder="01012345678" {...inputProps('phone')} />
              </Field>
              <div className="span-2">
                <Field id="email" label="Email" optional error={errors.email}>
                  <input className="input" type="email" autoComplete="email" placeholder="For your order receipt" {...inputProps('email')} />
                </Field>
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>
              <span className="step-dot">2</span> Delivery address
            </legend>
            <div className="form-grid">
              <Field id="governorate" label="Governorate">
                <select className="select" {...inputProps('governorate')}>
                  {GOVERNORATES.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </Field>
              <Field id="area" label="Area / district" error={errors.area}>
                <input className="input" placeholder="e.g. Maadi" {...inputProps('area')} />
              </Field>
              <div className="span-2">
                <Field id="address" label="Street address" error={errors.address}>
                  <input className="input" autoComplete="street-address" placeholder="Street, building, floor, apartment" {...inputProps('address')} />
                </Field>
              </div>
              <div className="span-2">
                <Field id="notes" label="Notes for the courier" optional>
                  <textarea className="textarea" placeholder="Landmark, best time to call…" {...inputProps('notes')} />
                </Field>
              </div>
            </div>
            <p className="delivery-estimate">
              <Icon name="truck" size={18} /> Estimated delivery: <strong>{deliveryEstimate(form.governorate)}</strong>
            </p>
          </fieldset>

          <fieldset className="form-section">
            <legend>
              <span className="step-dot">3</span> Payment
            </legend>
            <div className="pay-options">
              {PAYMENT_METHODS.map((method) => (
                <label key={method.id} className="pay-option" htmlFor={`pay-${method.id}`}>
                  <input
                    id={`pay-${method.id}`}
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={form.payment === method.id}
                    onChange={update('payment')}
                  />
                  <span className="pay-option__icon">
                    <Icon name={method.icon} size={22} />
                  </span>
                  <span>
                    <strong>{method.label}</strong>
                    <span>{method.note}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <aside className="summary" aria-labelledby="checkout-summary-title">
          <h2 id="checkout-summary-title">
            Your order <span>({count})</span>
          </h2>
          <ul className="mini-lines">
            {lines.map(({ product, qty }) => (
              <li key={product.id} className="mini-line">
                <span className="mini-line__media" style={{ '--tint': product.tint }}>
                  <ProductArt product={product} decorative />
                  <span className="mini-line__qty">{qty}</span>
                </span>
                <span className="mini-line__name">
                  <strong>{product.name}</strong>
                  <span>{product.scent}</span>
                </span>
                <span className="mini-line__price">{formatPrice(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <PromoForm />
          <Totals />
          <button type="submit" form="checkout-form" className="btn btn-lime btn-lg btn-block">
            Place order · {formatPrice(total)}
          </button>
          <p className="summary__note">
            <Icon name="shield" size={16} /> No payment now. You pay when your order arrives.
          </p>
        </aside>
      </div>
    </>
  );
}
