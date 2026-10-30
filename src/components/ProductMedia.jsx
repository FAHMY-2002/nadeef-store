import { useState } from 'react';
import ProductArt from './ProductArt.jsx';

// Builds a sized URL for an Unsplash photo id (free Unsplash licence, hotlinked as Unsplash recommends).
// To use your own photos, put a full URL in `image` instead of an id.
export function imageUrl(image, width = 800) {
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=72`;
}

// Shows the product photo, or the drawn packshot if there is no photo or it fails to load.
export default function ProductMedia({ product, width = 800, decorative = false, className }) {
  const [failed, setFailed] = useState(false);

  if (product.image && !failed) {
    return (
      <img
        className={`product-photo${className ? ` ${className}` : ''}`}
        src={imageUrl(product.image, width)}
        alt={decorative ? '' : product.name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }
  return <ProductArt product={product} decorative={decorative} className={className} />;
}
