import { useLocation, useNavigate } from 'react-router-dom';

// Scrolls to a section on the home page, navigating there first if needed.
export default function SectionLink({ section, className, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    const target = document.getElementById(section);
    if (pathname === '/' && target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: section } });
    }
  };

  return (
    <button type="button" className={`link-button ${className ?? ''}`} onClick={handleClick}>
      {children}
    </button>
  );
}
