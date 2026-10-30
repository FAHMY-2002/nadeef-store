import Hero from '../sections/Hero.jsx';
import ValueMarquee from '../sections/ValueMarquee.jsx';
import Statement from '../sections/Statement.jsx';
import Bento from '../sections/Bento.jsx';
import Categories from '../sections/Categories.jsx';
import BestSellers from '../sections/BestSellers.jsx';
import HowItWorks from '../sections/HowItWorks.jsx';
import Promo from '../sections/Promo.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import Faq from '../sections/Faq.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <ValueMarquee />
      <Statement />
      <Bento />
      <Categories />
      <BestSellers />
      <HowItWorks />
      <Promo />
      <Testimonials />
      <Faq />
    </>
  );
}
