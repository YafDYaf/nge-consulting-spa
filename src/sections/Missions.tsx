import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import { Calculator, BarChart3, Users, Landmark, PieChart, Briefcase } from 'lucide-react';

const services = [
  { title: " Gestion Comptable Complète", icon: <Calculator />, desc: "Nous assurons le traitement intégral de votre comptabilité, de la saisie des données à l'élaboration des comptes de résultat et de bilan." },
  { title: "Optimisation Fiscale", icon: <Landmark />, desc: "Nous préparons et déposons vos déclarations fiscales en garantissant votre conformité tout en optimisant votre charge fiscale." },
  { title: "Gestion de la Paie", icon: <Users />, desc: "Nous gérons l'intégralité de votre processus de paie, des bulletins de salaire aux déclarations annuelles des salariés (DAS)." },
  { title: "Analyse Financière", icon: <Briefcase />, desc: "Nous analysons vos comptes généraux et établissons vos balances pour vous offrir une vision claire de votre santé financière." },
  { title: "Conseil et Assistance", icon: <BarChart3 />, desc: "Nous vous accompagnons au quotidien avec des conseils personnalisés pour optimiser la gestion administrative et financière de votre entreprise." },
  { title: " Gestion des Immobilisations", icon: <PieChart />, desc: "Nous assurons le suivi et le traitement de vos immobilisations pour une gestion patrimoniale optimale de vos actifs." },
];

export const Missions = () => (
  <section id="missions" className="py-24 bg-white px-4">
    <div className="max-w-7xl mx-auto">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-brand-dark mb-4">Nos Missions</h2>
        <div className="h-1.5 w-20 bg-brand-primary mx-auto rounded-full"></div>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {services.map((item, i) => (
          <motion.div 
            key={i}
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl bg-brand-light border border-gray-100 hover:border-brand-primary transition-colors cursor-default"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm mb-6">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);