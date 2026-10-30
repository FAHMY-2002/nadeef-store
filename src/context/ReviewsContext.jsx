import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products.js';
import { SHOW_SAMPLE_REVIEWS, sampleReviews } from '../data/reviews.js';

const ReviewsContext = createContext(null);
const STORAGE_KEY = 'nadeef-reviews';

function loadReviews() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

export function summarize(list) {
  const count = list.length;
  const total = list.reduce((sum, review) => sum + review.rating, 0);
  return {
    count,
    average: count ? Math.round((total / count) * 10) / 10 : 0,
    distribution: [5, 4, 3, 2, 1].map((stars) => list.filter((r) => r.rating === stars).length),
  };
}

// Reviews customers write are saved in their browser for now.
// To share them with every visitor, save them to a database in addReview().
export function ReviewsProvider({ children }) {
  const [userReviews, setUserReviews] = useState(loadReviews);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userReviews));
    } catch {
      /* storage unavailable; reviews stay for this visit only */
    }
  }, [userReviews]);

  const addReview = useCallback((productId, review) => {
    const entry = {
      ...review,
      id: `${productId}-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      sample: false,
    };
    setUserReviews((current) => ({ ...current, [productId]: [entry, ...(current[productId] || [])] }));
  }, []);

  const value = useMemo(() => {
    const reviewsFor = (productId) => {
      const mine = (userReviews[productId] || []).map((r) => ({ ...r, mine: true }));
      const samples = SHOW_SAMPLE_REVIEWS ? sampleReviews[productId] || [] : [];
      return [...mine, ...samples].sort((a, b) => b.date.localeCompare(a.date));
    };
    const cache = new Map(products.map((p) => [p.id, summarize(reviewsFor(p.id))]));
    const statsFor = (productId) => cache.get(productId) ?? summarize(reviewsFor(productId));
    const overall = summarize(products.flatMap((p) => reviewsFor(p.id)));
    return { reviewsFor, statsFor, overall, addReview };
  }, [userReviews, addReview]);

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) throw new Error('useReviews must be used inside <ReviewsProvider>');
  return context;
}
