export const FREE_DELIVERY_THRESHOLD = 600;
export const DELIVERY_FEE = 50;
export const PROMO = { code: 'NADEEF15', rate: 0.15 };

const numberFormat = new Intl.NumberFormat('en-US');

export function formatPrice(value) {
  return `EGP ${numberFormat.format(Math.round(value))}`;
}

export function formatNumber(value) {
  return numberFormat.format(value);
}

export function discountPercent(product) {
  if (!product.oldPrice) return 0;
  return Math.round((1 - product.price / product.oldPrice) * 100);
}
