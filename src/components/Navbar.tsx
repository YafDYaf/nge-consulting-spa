import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calculator } from 'lucide-react';

const navLinks = [
  { name: 'Accueil', href: '#home' },
  { name: 'Missions', href: '#missions' },
  { name: 'À propos', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effet pour changer le style de la barre au scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-brand-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Calculator className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-brand-dark tracking-tighter">
            N.G.E<span className="text-brand-primary">consulting</span>
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-brand-dark hover:text-brand-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-dark text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg transition-all"
          >
            Espace Client
          </motion.a>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden text-brand-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU ANIMÉ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-brand-dark hover:text-brand-primary"
                >
                  {link.name}
                </motion.a>
              ))}
              <button className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold">
                Consultation Gratuite
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};