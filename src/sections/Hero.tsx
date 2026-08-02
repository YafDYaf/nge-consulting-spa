import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import eropic from '../assets/ERO.jpg';

export const Hero = () => (
  <section id="home" className="pt-32 pb-20 px-4 overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="lg:w-1/2 space-y-6"
      >
        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-brand-dark">
          Votre succès <span className="text-brand-primary">commence par</span> une comptabilité maîtrisée.
        </h1>
        <p className="text-lg text-gray-600">
          Nous vous simplifions la gestion de votre entreprise. Du traitement comptable à la fiscalité, en passant par la paie, nous prenons en charge vos obligations administratives pour que vous puissiez vous concentrer sur l'essentiel : développer votre activité. Expertise locale, service personnalisé, résultats garantis.
        </p>
        <div className="flex flex-wrap gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-blue-200"
          >
            Démarrer un audit <ChevronRight size={20} />
          </motion.button>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <ShieldCheck className="text-green-500" size={18} /> Inscrit au tableau de l'Ordre
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="lg:w-1/2 relative"
      >
        <img 
          src={eropic}
          alt="Business meeting" 
          className="rounded-[2rem] shadow-2xl"
        />
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
          <p className="text-brand-primary font-bold text-2xl">+150</p>
          <p className="text-gray-500 text-sm">Clients satisfaits</p>
        </div>
      </motion.div>
    </div>
  </section>
);