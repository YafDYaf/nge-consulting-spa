import { Calculator, Linkedin, Twitter, Facebook, Mail, Phone } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-brand-dark text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
      <div className="col-span-1 md:col-span-1 space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="text-brand-primary" size={24} />
          <span className="text-xl font-bold tracking-tighter">N.G.E Consulting</span>
        </div>
        <p className="text-gray-400 text-sm">
          Toujours disposez a mieux vous servir.
        </p>
        <div className="flex gap-4">
          <Linkedin className="hover:text-brand-primary cursor-pointer transition-colors" size={20} />
          <Twitter className="hover:text-brand-primary cursor-pointer transition-colors" size={20} />
          <Facebook className="hover:text-brand-primary cursor-pointer transition-colors" size={20} />
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-6">Liens rapides</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li><a href="#home" className="hover:text-white transition-colors">Accueil</a></li>
          <li><a href="#missions" className="hover:text-white transition-colors">Nos Missions</a></li>
          <li><a href="#about" className="hover:text-white transition-colors">À propos</a></li>
          <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-6">Services</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li>Comptabilite</li>
          <li>Conseil Fiscal</li>
          <li>Gestion Sociale</li>
          <li>Paie</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-6">Contact</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li className="flex items-center gap-3"><Phone size={16} /> 011 76 29 55</li>
          <li className="flex items-center gap-3"><Phone size={16} /> 011 76 29 55</li>
          <li className="flex items-center gap-3"><Mail size={16} /> ngeconsulting.gabon@gmail.com</li>
        </ul>
      </div>
    </div>
    <p className="text-center text-gray-500 text-xs mt-10 italic">
      CCC for N.G.E Consulting ©2026.
    </p>
  </footer>
); 