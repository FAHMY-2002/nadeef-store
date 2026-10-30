import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Jump to the top on every page change, or to a section when a link asks for one
// (e.g. navigate('/', { state: { scrollTo: 'faq' } })).
export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const target = state?.scrollTo && document.getElementById(state.scrollTo);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, state]);

  return null;
}
