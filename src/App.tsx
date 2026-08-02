import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Missions } from './sections/Missions';
import { About } from './sections/About';
import { Contact } from './sections/Contact'; // <--- Import du nouveau composant

export default function App() {
  return (
    <div className="min-h-screen bg-brand-light">
      <Navbar />
      
      <main>
        <Hero />
        <Missions />
        <About />
        <Contact /> {/* <--- Utilisation du composant */}
      </main>

      <Footer />
    </div>
  );
}