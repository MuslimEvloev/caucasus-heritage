import Hero from './Hero.jsx';
import SectionSelector from './SectionSelector.jsx';
import Footer from './Footer.jsx';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <SectionSelector />
      <Footer />
    </div>
  );
}
