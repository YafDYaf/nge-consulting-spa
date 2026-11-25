import { ArrowButton, SplitTitle } from '../components/ui';
import { ParallaxBand, RevealWords, ScrollFillText } from '../components/effects';
import { useRdv } from '../components/rdv-context';
import { TEAM, VALUES } from '../data/content';
import teamPhoto from '../assets/photos/equipe-reunion.webp';

const X = 'px-[clamp(20px,5vw,72px)]';
const wrap = 'mx-auto max-w-site';

export default function Cabinet() {
  const { openRdv } = useRdv();
  return (
    <>
      {/* Photo d'illustration (Unsplash). [À remplacer] par une photo réelle de l'équipe au bureau. */}
      <ParallaxBand src={teamPhoto} alt="Réunion d’équipe autour d’une table dans un bureau lumineux" veil="bg-gradient-to-t from-navy via-navy/75 to-navy/30" className={`${X} pb-[clamp(39px,5.2vw,68px)] pt-[clamp(112px,14.3vw,208px)]`}>
        <div className={`${wrap} grid items-end gap-x-16 gap-y-6 lg:grid-cols-[1.4fr_1fr]`}>
          <SplitTitle strong="Un cabinet fondé" light="sur la clarté et la confiance." className="text-[clamp(35px,4.4vw,65px)] leading-[0.94]" />
          <p className="fade-d1 m-0 max-w-[480px] text-base text-mist">
            N.G.E Consulting accompagne les entreprises et les entrepreneurs dans leur gestion comptable, fiscale, sociale et administrative, depuis Libreville.
          </p>
        </div>
      </ParallaxBand>

      <section className={`bg-white ${X} py-[clamp(50px,6.5vw,94px)] text-navy`}>
        <div className={`${wrap} flex flex-col gap-[clamp(34px,3.9vw,57px)]`}>
          <ScrollFillText
            className="m-0 max-w-[1100px] text-[clamp(22px,2.6vw,38px)] font-bold leading-[1.14] tracking-[-0.03em]"
            text="Une entreprise bien accompagnée comprend ses obligations. Un dirigeant doit pouvoir organiser ses informations et disposer d’une vision claire de son activité : c’est autour de cette conviction que nous construisons chaque relation."
          />
          <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
            <div className="flex flex-col gap-4 border-t-2 border-navy pt-6">
              <h2 className="m-0 text-sm font-bold uppercase tracking-[0.2em] text-royal">Notre mission</h2>
              <p className="m-0 text-[clamp(19px,1.8vw,24px)] font-semibold leading-[1.25] tracking-[-0.015em]">
                Faciliter la gestion des entreprises par des solutions structurées, un accompagnement de proximité et des informations utiles à leurs décisions.
              </p>
            </div>
            <div className="flex flex-col gap-4 border-t-2 border-navy pt-6">
              <h2 className="m-0 text-sm font-bold uppercase tracking-[0.2em] text-royal">Notre vision</h2>
              <p className="m-0 text-[clamp(19px,1.8vw,24px)] font-semibold leading-[1.25] tracking-[-0.015em]">
                Des dirigeants gabonais qui disposent des outils et des conseils pour organiser et développer leur activité.
              </p>
            </div>
          </div>
          <p className="m-0 text-[15px] text-ink-muted">[Date de création, parcours des fondateurs et qualifications à compléter par le cabinet.]</p>
        </div>
      </section>

      <section className={`${X} py-[clamp(50px,6.5vw,94px)]`}>
        <div className={`${wrap} flex flex-col gap-[clamp(24px,3.2vw,38px)]`}>
          <RevealWords text="Cinq engagements, tenus au quotidien." className="m-0 text-[clamp(27px,2.9vw,42px)] font-extrabold leading-none tracking-tighter2" />
          <dl className="m-0 flex flex-col border-t border-navy-line">
            {VALUES.map((v) => (
              <div key={v.name} className="value-row grid items-baseline gap-x-12 gap-y-2 border-b border-navy-line py-[clamp(19px,2.4vw,29px)] md:grid-cols-[1.1fr_1fr]">
                <dt className="value-name outline-text text-[clamp(35px,4.4vw,65px)] font-heavy leading-none tracking-tightest">{v.name}</dt>
                <dd className="m-0 max-w-[520px] text-base text-mist">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`bg-ice ${X} py-[clamp(50px,6.5vw,94px)] text-navy`}>
        <div className={`${wrap} flex flex-col gap-[clamp(24px,3.2vw,38px)]`}>
          <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
            <RevealWords text="Les personnes qui suivent votre dossier." className="m-0 text-[clamp(27px,2.9vw,42px)] font-extrabold leading-none tracking-tighter2" />
            <p className="m-0 max-w-[400px] text-[15px] text-ink-muted">Portraits réels des collaborateurs à fournir. Une photo de banque d’images ne doit pas représenter un membre de l’équipe.</p>
          </div>
          <ul className="m-0 list-none border-t-2 border-navy p-0">
            {TEAM.map((m) => (
              <li key={m.role} className="grid items-baseline gap-x-10 gap-y-1 border-b border-rule-strong py-5 md:grid-cols-[1fr_1fr_1.2fr]">
                <span className="text-[clamp(19px,1.9vw,26px)] font-extrabold tracking-[-0.02em]">[Prénom Nom]</span>
                <span className="text-base font-semibold text-royal">{m.role}</span>
                <span className="text-[15px] text-ink-muted">[Parcours et qualifications, en une ligne]</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`bg-band ${X} py-[clamp(50px,6.5vw,94px)] text-on-band`}>
        <div className={`${wrap} flex flex-col gap-10`}>
          <p className="m-0 text-[clamp(35px,5.2vw,82px)] font-heavy leading-[0.92] tracking-tightest">
            Écouter. Comprendre.
            <br />
            <span className="outline-text">Proposer. Accompagner.</span>
          </p>
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
            <p className="m-0 max-w-[560px] text-base">Chaque mission commence par un échange pour comprendre votre situation et définir ensemble le bon périmètre d’intervention.</p>
            <ArrowButton tone="navy" onClick={openRdv}>Rencontrer notre équipe</ArrowButton>
          </div>
        </div>
      </section>
    </>
  );
}
