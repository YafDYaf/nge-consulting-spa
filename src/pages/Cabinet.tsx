import { UserRound } from 'lucide-react';
import { ArrowButton, SplitTitle } from '../components/ui';
import { useRdv } from '../components/rdv-context';
import { TEAM, VALUES } from '../data/content';
import teamPhoto from '../assets/photos/equipe-reunion.webp';

const X = 'px-[clamp(20px,5vw,72px)]';
const h2 = 'm-0 text-[clamp(32px,3.8vw,52px)] font-extrabold leading-[1.02] tracking-tighter2';

export default function Cabinet() {
  const { openRdv } = useRdv();
  return (
    <>
      <section className={`bg-navy ${X} pt-[clamp(48px,7vw,88px)]`}>
        <div className="mx-auto flex max-w-site flex-col gap-[clamp(28px,4vw,48px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-end gap-x-16 gap-y-6">
            <SplitTitle strong="Un cabinet fondé" light="sur la clarté et la confiance." className="text-[clamp(42px,5.6vw,80px)]" />
            <p className="fade-d1 m-0 max-w-[480px] text-lg text-mist">
              N.G.E Consulting accompagne les entreprises et les entrepreneurs dans leur gestion comptable, fiscale, sociale et administrative, depuis Libreville.
            </p>
          </div>
          {/* Photo d'illustration (Unsplash). [À remplacer] par une photo réelle de l'équipe au bureau. */}
          <img
            src={teamPhoto}
            alt="Réunion d’équipe autour d’une table dans un bureau lumineux"
            width={1800}
            height={1200}
            fetchPriority="high"
            className="fade-d2 block aspect-[16/9] max-h-[520px] w-full rounded-t-panel object-cover"
          />
        </div>
      </section>

      <section className={`bg-white ${X} py-[clamp(56px,8vw,104px)] text-navy`}>
        <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-start gap-[clamp(32px,5vw,72px)]">
          <div className="flex flex-col gap-5">
            <h2 className={h2}>Une entreprise bien accompagnée comprend ses obligations.</h2>
            <p className="m-0 max-w-[560px] text-[17px] text-ink">
              Nous sommes convaincus qu’un dirigeant doit pouvoir comprendre ses obligations, organiser ses informations et disposer d’une vision claire de son activité.
            </p>
            <p className="m-0 max-w-[560px] text-[17px] text-ink">
              C’est autour de cette conviction que nous construisons chaque relation : des échanges compréhensibles, une méthode rigoureuse et des prestations adaptées à la réalité de votre entreprise.
            </p>
            <p className="m-0 text-[15px] text-ink-muted">[Date de création, parcours des fondateurs et qualifications à compléter par le cabinet.]</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-3.5">
            <div className="flex flex-col gap-3 rounded-card bg-sun p-[clamp(24px,3vw,34px)]">
              <h3 className="m-0 text-2xl font-extrabold tracking-[-0.02em]">Notre mission</h3>
              <p className="m-0 text-base">Faciliter la gestion des entreprises par des solutions structurées, un accompagnement de proximité et des informations utiles à leurs décisions.</p>
            </div>
            <div className="flex flex-col gap-3 rounded-card bg-ice p-[clamp(24px,3vw,34px)]">
              <h3 className="m-0 text-2xl font-extrabold tracking-[-0.02em]">Notre vision</h3>
              <p className="m-0 text-base">Des dirigeants gabonais qui disposent des outils et des conseils pour organiser et développer leur activité.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`bg-navy ${X} py-[clamp(56px,8vw,104px)]`}>
        <div className="mx-auto flex max-w-site flex-col gap-[clamp(28px,4vw,44px)]">
          <h2 className={h2}>Cinq engagements, tenus au quotidien.</h2>
          <dl className="m-0 flex flex-col border-t border-[#2E4663]">
            {VALUES.map((v) => (
              <div key={v.name} className="value-row grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-baseline gap-x-12 gap-y-2 border-b border-[#2E4663] py-[clamp(20px,2.6vw,30px)]">
                <dt className="value-name text-[clamp(36px,4.6vw,64px)] font-light leading-none tracking-[-0.04em]">{v.name}</dt>
                <dd className="m-0 max-w-[520px] text-[17px] text-mist">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`bg-white ${X} py-[clamp(56px,8vw,104px)] text-navy`}>
        <div className="mx-auto flex max-w-site flex-col gap-[clamp(28px,4vw,44px)]">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <h2 className={`${h2} max-w-[620px]`}>Les personnes qui suivent votre dossier.</h2>
            <p className="m-0 max-w-[400px] text-[15px] text-ink-muted">Portraits réels des collaborateurs à fournir. Une photo de banque d’images ne doit pas représenter un membre de l’équipe.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-5">
            {TEAM.map((m, i) => (
              <div key={m.role} className="flex flex-col gap-3.5">
                <div className={`flex aspect-[4/5] items-center justify-center rounded-card text-ink ${i % 2 ? 'bg-ice' : 'bg-ice-2'}`}>
                  <UserRound aria-hidden="true" size={44} strokeWidth={1.4} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[19px] font-extrabold">[Prénom Nom]</span>
                  <span className="text-[15px] font-semibold text-royal">{m.role}</span>
                  <span className="text-sm text-ink-muted">[Parcours et qualifications, en une ligne]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-[clamp(16px,3vw,40px)] pb-[clamp(56px,8vw,104px)] text-navy">
        <div className="mx-auto box-border flex max-w-wide flex-col gap-7 rounded-[36px] bg-ice p-[clamp(32px,6vw,80px)]">
          <p className="m-0 text-[clamp(36px,6vw,88px)] font-heavy leading-[0.98] tracking-tightest">
            Écouter. Comprendre.
            <br />
            <span className="font-light">Proposer. Accompagner.</span>
          </p>
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
            <p className="m-0 max-w-[560px] flex-[1_1_380px] text-lg text-ink">
              Chaque mission commence par un échange pour comprendre votre situation et définir ensemble le bon périmètre d’intervention.
            </p>
            <ArrowButton tone="navy" onClick={openRdv}>Rencontrer notre équipe</ArrowButton>
          </div>
        </div>
      </section>
    </>
  );
}
