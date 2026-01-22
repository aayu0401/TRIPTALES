import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Trips from './components/Trips';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Trips />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
