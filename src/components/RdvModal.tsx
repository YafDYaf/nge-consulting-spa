import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { inputCls } from './form-styles';

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MODES = ['Au cabinet, Nombakélé', 'En visioconférence', 'Par téléphone'];
// [À confirmer] : horaires réels du cabinet. Les créneaux pris sont simulés tant qu'aucun agenda n'est branché.
const SLOTS = ['8 h 30', '10 h 00', '11 h 30', '14 h 00', '15 h 30', '17 h 00'];

const smallInput = inputCls.replace('min-h-[50px]', 'min-h-12').replace('rounded-[14px]', 'rounded-xl');
const fieldLabel = 'flex flex-col gap-1.5 text-sm font-bold';

export function RdvModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const max = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 60);
    return d;
  }, [today]);

  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [sel, setSel] = useState<Date | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [mode, setMode] = useState(0);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');

  const reset = () => {
    setStep(1);
    setSel(null);
    setSlot(null);
    setName('');
  };
  const close = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const first = new Date(view.y, view.m, 1);
  const lead = (first.getDay() + 6) % 7;
  const dim = new Date(view.y, view.m + 1, 0).getDate();
  const atStart = view.y === today.getFullYear() && view.m === today.getMonth();
  const atEnd = view.y > max.getFullYear() || (view.y === max.getFullYear() && view.m >= max.getMonth());
  const go = (delta: number) => {
    const n = new Date(view.y, view.m + delta, 1);
    setView({ y: n.getFullYear(), m: n.getMonth() });
  };

  const dayLong = sel ? `${DAYS[sel.getDay()]} ${sel.getDate()} ${MONTHS[sel.getMonth()]}` : '';
  const slotLong = sel && slot !== null ? `${dayLong} à ${SLOTS[slot]}` : dayLong;
  const ready = !!sel && slot !== null;
  const firstName = name.trim().split(' ')[0];

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-veil items-start justify-center overflow-y-auto bg-[rgba(8,20,36,0.66)] px-3 py-[clamp(16px,5vh,56px)] text-navy backdrop-blur-[6px]"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="rdv-titre" className="w-[min(1040px,100%)] animate-modal overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_rgba(2,10,22,0.5)]">
        <div className="flex items-center justify-between gap-4 bg-navy px-[clamp(20px,3vw,32px)] py-[22px] text-white">
          <div className="flex flex-col gap-0.5">
            <h2 id="rdv-titre" className="m-0 text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.02em]">Prendre rendez-vous</h2>
            <span className="text-sm text-mist-2">
              {step === 1 ? 'Étape 1 sur 2 : choisissez un créneau' : step === 2 ? 'Étape 2 sur 2 : vos coordonnées' : 'C’est noté'}
            </span>
          </div>
          <button ref={closeRef} type="button" onClick={close} aria-label="Fermer" className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full border-[1.5px] border-navy-edge bg-transparent text-white">
            <X aria-hidden="true" size={18} strokeWidth={2.2} />
          </button>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))]">
            <div className="flex flex-col gap-4 border-r border-[#E1E9F1] p-[clamp(20px,3vw,32px)]">
              <div className="flex items-center justify-between gap-3">
                <button type="button" onClick={() => go(-1)} disabled={atStart} aria-label="Mois précédent" className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-[#D5DEE8] bg-white disabled:opacity-35">
                  <ChevronLeft aria-hidden="true" size={16} strokeWidth={2.4} />
                </button>
                <span className="text-[19px] font-extrabold capitalize" aria-live="polite">{MONTHS[view.m]} {view.y}</span>
                <button type="button" onClick={() => go(1)} disabled={atEnd} aria-label="Mois suivant" className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-[#D5DEE8] bg-white disabled:opacity-35">
                  <ChevronRight aria-hidden="true" size={16} strokeWidth={2.4} />
                </button>
              </div>
              <div aria-hidden="true" className="grid grid-cols-7 gap-1 text-center text-[13px] font-bold text-ink-muted">
                {['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'].map((d) => <span key={d}>{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: lead }, (_, i) => <span key={`l${i}`} />)}
                {Array.from({ length: dim }, (_, i) => {
                  const d = i + 1;
                  const date = new Date(view.y, view.m, d);
                  const wd = date.getDay();
                  const avail = date > today && wd !== 0 && wd !== 6 && date <= max;
                  const on = !!sel && sel.getTime() === date.getTime();
                  return (
                    <button
                      key={d}
                      type="button"
                      disabled={!avail}
                      aria-pressed={on}
                      aria-label={`${DAYS[wd]} ${d} ${MONTHS[view.m]}${avail ? '' : ', indisponible'}`}
                      onClick={() => {
                        setSel(date);
                        setSlot(null);
                      }}
                      className={`aspect-square min-h-10 rounded-xl border-0 text-[15px] transition-[background-color,color,transform] duration-200 ${
                        on ? 'bg-navy font-bold text-sun' : avail ? 'bg-ice font-bold text-navy hover:scale-[1.06]' : 'bg-transparent font-normal text-[#9AAABB]'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
              <p className="m-0 text-[13px] text-ink-muted">Rendez-vous du lundi au vendredi. Horaires du cabinet à confirmer.</p>
            </div>

            <div className="flex flex-col gap-[22px] p-[clamp(20px,3vw,32px)]">
              <div className="flex flex-col gap-2.5">
                <span className="text-base font-extrabold">Format du rendez-vous</span>
                <div className="flex flex-wrap gap-2">
                  {MODES.map((m, i) => (
                    <button key={m} type="button" aria-pressed={i === mode} onClick={() => setMode(i)} className={`min-h-11 rounded-full border-[1.5px] px-4 text-sm font-bold ${i === mode ? 'border-navy bg-navy text-white' : 'border-field bg-white text-navy'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="text-base font-extrabold">{sel ? `Créneaux du ${dayLong}` : 'Créneaux disponibles'}</span>
                {sel ? (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2">
                    {SLOTS.map((l, i) => {
                      const taken = (sel.getDate() + i) % 4 === 0;
                      const on = slot === i;
                      return (
                        <button
                          key={l}
                          type="button"
                          disabled={taken}
                          aria-pressed={on}
                          onClick={() => setSlot(i)}
                          className={`min-h-12 rounded-[14px] border-[1.5px] text-[15px] font-bold ${
                            on ? 'border-sun bg-sun text-navy' : taken ? 'border-[#E1E9F1] bg-[#F4F7FA] text-[#8A9AAB] line-through' : 'border-field bg-white text-navy'
                          }`}
                        >
                          {l}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="m-0 rounded-2xl bg-[#F1F6FA] p-[18px] text-[15px] text-ink">Choisissez d’abord un jour dans le calendrier.</p>
                )}
              </div>
              <div className="mt-auto flex flex-col gap-3.5 border-t border-[#E1E9F1] pt-[18px]">
                <span className="text-[15px] text-ink">
                  {ready ? `Votre créneau : ${slotLong}, ${MODES[mode].toLowerCase()}.` : 'Aucun créneau choisi pour l’instant.'}
                </span>
                <button type="button" disabled={!ready} onClick={() => setStep(2)} className="min-h-14 rounded-full border-0 bg-sun text-base font-extrabold text-navy disabled:opacity-45">
                  Continuer
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <form
            className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))]"
            onSubmit={(e) => {
              e.preventDefault();
              // [À brancher] : envoi vers un service de formulaires ou un agenda (Formspree, Cal.com, API du cabinet…).
              setStep(3);
            }}
          >
            <div className="flex flex-col gap-3.5 bg-[#F1F6FA] p-[clamp(20px,3vw,32px)]">
              <span className="text-sm font-bold text-ink-muted">Votre créneau</span>
              <span className="text-[26px] font-extrabold leading-[1.15] tracking-[-0.02em]">{slotLong}</span>
              <span className="text-base text-ink">{MODES[mode]}</span>
              <button type="button" onClick={() => setStep(1)} className="min-h-11 self-start border-0 bg-transparent p-0 text-[15px] font-bold text-royal underline underline-offset-4">
                Changer de créneau
              </button>
            </div>
            <div className="flex flex-col gap-3.5 p-[clamp(20px,3vw,32px)]">
              <label className={fieldLabel}>
                Nom et prénom
                <input required type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={smallInput} />
              </label>
              <label className={fieldLabel}>
                Entreprise (si elle existe)
                <input type="text" autoComplete="organization" className={smallInput} />
              </label>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5">
                <label className={fieldLabel}>
                  Téléphone ou WhatsApp
                  <input required type="tel" autoComplete="tel" placeholder="+241" className={smallInput} />
                </label>
                <label className={fieldLabel}>
                  E-mail
                  <input type="email" autoComplete="email" className={smallInput} />
                </label>
              </div>
              <label className={fieldLabel}>
                Votre besoin principal
                <select className={smallInput}>
                  <option>Comptabilité</option>
                  <option>Fiscalité et déclarations</option>
                  <option>Paie et gestion sociale</option>
                  <option>Création d’entreprise</option>
                  <option>Conseil et pilotage</option>
                  <option>Je ne sais pas encore</option>
                </select>
              </label>
              <label className={fieldLabel}>
                Quelques mots sur votre situation (facultatif)
                <textarea rows={3} className={`${smallInput} resize-y py-3`} />
              </label>
              <label className="flex items-start gap-2.5 text-[13px] text-ink">
                <input required type="checkbox" className="mt-px h-5 w-5 flex-none accent-navy" />
                J’accepte que N.G.E Consulting utilise ces informations pour me recontacter.
              </label>
              <button type="submit" className="min-h-14 rounded-full border-0 bg-sun text-base font-extrabold text-navy">
                Envoyer la demande
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-4 px-[clamp(20px,4vw,48px)] py-[clamp(36px,6vw,64px)] text-center">
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-sun">
              <Check aria-hidden="true" size={34} strokeWidth={2.4} />
            </span>
            <h3 className="m-0 text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.1] tracking-[-0.025em]">
              Demande envoyée{firstName ? `, ${firstName}` : ''}
            </h3>
            <p className="m-0 max-w-[520px] text-[17px] text-ink">
              Nous avons bien noté le créneau du {slotLong}, {MODES[mode].toLowerCase()}. Le cabinet vous le confirme par téléphone ou WhatsApp sous un jour ouvré.
            </p>
            <button type="button" onClick={close} className="min-h-[52px] rounded-full border-0 bg-navy px-7 text-base font-bold text-white">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
