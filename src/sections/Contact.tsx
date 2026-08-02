import { useState} from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

export const Contact = () => {
  // Gestion des états du formulaire
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulation d'envoi (attente de 2 secondes)
    setTimeout(() => {
      setFormStatus('success');
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* COLONNE GAUCHE : Infos */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Parlons de votre <span className="text-brand-primary">avenir</span>.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Vous avez un projet de création ? Besoin d'optimiser votre fiscalité ? 
                Nos experts sont disponibles pour un premier audit gratuit.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand-primary transition-colors">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Téléphone(s)</p>
                  <p className="text-xl font-bold">+241 11 76 29 55</p>
                  <p className="text-xl font-bold">+241 11 76 29 55</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand-primary transition-colors">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-xl font-bold">ngeconsulting.gabon@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand-primary transition-colors">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Bureaux</p>
                  <p className="text-xl font-bold">BP:13149 Nombakele, Libreville</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* COLONNE DROITE : Formulaire */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-10 text-brand-dark shadow-2xl"
          >
            {formStatus === 'success' ? (
              <div className="text-center py-12 space-y-4">
                <div className="flex justify-center">
                  <CheckCircle size={64} className="text-green-500 animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold">Message envoyé !</h3>
                <p className="text-gray-600">
                  Merci de nous avoir contactés. Un expert reviendra vers vous sous 24h.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-4 text-brand-primary font-bold hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Nom complet</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Jean Dupont" 
                      className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Email pro</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="jean@societe.com" 
                      className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Sujet</label>
                  <select className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:border-brand-primary">
                    <option>Demande de devis</option>
                    <option>Création d'entreprise</option>
                    <option>Rendez-vous conseil</option>
                    <option>Autre demande</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Message</label>
                  <textarea 
                    required 
                    rows={4} 
                    placeholder="Dites-nous en plus sur votre projet..." 
                    className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  ></textarea>
                </div>

                <button 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" /> Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};