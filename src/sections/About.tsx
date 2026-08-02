import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import { CheckCircle2 } from 'lucide-react';
import Aboutpic from '../assets/ABOUT US.jpg';

export const About = () => (
  <section id="about" className="py-24 bg-white px-4">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-1/2"
      >
        <div className="relative">
          <img 
            src={Aboutpic}
            alt="Notre équipe" 
            className="rounded-[2.5rem] shadow-2xl relative z-10"
          />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-primary/10 rounded-full -z-0"></div>
        </div>
      </motion.div>

      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="lg:w-1/2 space-y-6"
      >
        <h2 className="text-4xl font-bold text-brand-dark leading-tight">
          Plus qu'un cabinet comptable, un <span className="text-brand-primary">partenaire de croissance.</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Fondé en 2007, N.G.E CONSULTING est votre partenaire de confiance pour une gestion comptable et administrative rigoureuse au Gabon. Forte d'une expertise reconnue, notre équipe accompagne les entreprises et les particuliers dans la maîtrise de leurs obligations comptables et fiscales. Nous offrons des solutions complètes allant du traitement de la comptabilité générale à l'élaboration des états financiers, en passant par la gestion de la paie et les déclarations fiscales. Notre approche personnalisée et notre maîtrise des réglementations locales nous permettent de vous garantir une conformité totale et une sérénité au quotidien. Chez NGE CONSULTING, nous croyons que la clarté financière est la clé de la croissance. C'est pourquoi nous mettons un point d'honneur à vous fournir des analyses précises et des conseils avisés pour optimiser votre gestion. Faites-nous confiance pour transformer vos contraintes administratives en opportunités de développement.
        </p>
        <ul className="space-y-4">
          {['Approche digitale & zéro papier', 'Conseil proactif et stratégique', 'Transparence totale des honoraires'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 font-semibold text-brand-dark">
              <CheckCircle2 className="text-brand-primary" size={20} /> {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);