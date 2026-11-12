import { ArrowButton, CheckItem, SplitTitle } from '../components/ui';
import { useRdv } from '../components/rdv-context';
import { MISSION_STEPS, SERVICES } from '../data/content';
import logo from '../assets/logo-nge.png';

const X = 'px-[clamp(20px,5vw,72px)]';

export default function Expertises() {
  const { openRdv } = useRdv();
  return (
    <>
      <section className={`relative overflow-hidden bg-navy ${X} pb-[clamp(48px,6vw,80px)] pt-[clamp(48px,7vw,88px)]`}>
        <img src={logo} alt="" aria-hidden="true" className="absolute -bottom-[110px] -right-[120px] h-[360px] w-[420px] object-contain opacity-[0.18]" />
        <div className="relative mx-auto flex max-w-site flex-col gap-[clamp(24px,3vw,36px)]">
          <SplitTitle strong="Cinq métiers," light="un seul interlocuteur." className="max-w-[900px] text-[clamp(44px,6vw,84px)]" />
          <p className="fade-d1 m-0 max-w-[620px] text-[19px] text-mist">
            Vos comptes, vos impôts, vos salariés et vos projets suivis par la même équipe. Choisissez une expertise pour voir ce que nous faisons concrètement.
          </p>
          <nav aria-label="Aller à une expertise" className="fade-d2 flex flex-wrap gap-2.5">
            {SERVICES.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-[46px] items-center rounded-full border-[1.5px] border-navy-edge px-5 text-[15px] font-semibold text-white no-underline transition-colors hover:border-sun hover:text-sun">
                {s.short}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {SERVICES.map((s, i) => {
        const ice = i % 2 === 1;
        return (
          <section key={s.id} id={s.id} className={`scroll-mt-20 ${ice ? 'bg-ice' : 'bg-white'} ${X} py-[clamp(56px,8vw,104px)] text-navy`}>
            <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-start gap-[clamp(32px,5vw,64px)]">
              <div className="flex flex-col gap-[22px]">
                <h2 className="m-0 text-[clamp(34px,4vw,54px)] font-extrabold leading-none tracking-tighter2">{s.title}</h2>
                <p className="m-0 max-w-[560px] text-[clamp(19px,1.8vw,23px)] font-medium leading-[1.4]">{s.headline}</p>
                <p className="m-0 max-w-[560px] text-[17px] text-ink">{s.intro}</p>
                <img
                  src={s.photo}
                  alt={s.photoAlt}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={800}
                  className="aspect-[3/2] w-full rounded-card object-cover"
                />
              </div>
              <div className="flex flex-col gap-3.5">
                {s.groups.map((g) => (
                  <div key={g.title} className={`flex flex-col gap-3 rounded-3xl border p-[clamp(22px,2.6vw,30px)] ${ice ? 'border-[#CFE0EC] bg-white' : 'border-[#E1E9F1] bg-ice-pale'}`}>
                    <h3 className="m-0 text-[21px] font-extrabold tracking-[-0.015em]">{g.title}</h3>
                    <ul className="m-0 flex list-none flex-col gap-2 p-0 text-ink">
                      {g.items.map((it) => <CheckItem key={it}>{it}</CheckItem>)}
                    </ul>
                  </div>
                ))}
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3.5 pt-2">
                  <span className="max-w-[360px] text-[15px] text-ink">
                    <strong className="text-navy">Pour qui :</strong> {s.who}
                  </span>
                  <ArrowButton tone="navy" size="md" onClick={openRdv}>{s.cta}</ArrowButton>
                </div>
                {s.toConfirm && <p className="m-0 text-[13px] text-ink-muted">Offre proposée dans le cahier de contenu, à publier seulement si le cabinet la confirme.</p>}
              </div>
            </div>
          </section>
        );
      })}

      <section className={`bg-navy ${X} py-[clamp(56px,8vw,104px)]`}>
        <div className="mx-auto flex max-w-site flex-col gap-[clamp(36px,5vw,56px)]">
          <h2 className="m-0 max-w-[760px] text-[clamp(34px,4vw,56px)] font-extrabold leading-none tracking-tighter2">Comment se déroule une mission.</h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-8 p-0">
            {MISSION_STEPS.map((m, i) => (
              <li key={m.title} className="flex flex-col gap-3.5">
                <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-sun text-xl font-extrabold text-navy">{i + 1}</span>
                <h3 className="m-0 text-[21px] font-extrabold">{m.title}</h3>
                <span className="text-base text-mist">{m.text}</span>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-[28px] bg-sun p-[clamp(24px,4vw,40px)] text-navy">
            <span className="flex-[1_1_420px] text-[clamp(24px,2.6vw,34px)] font-extrabold leading-[1.1] tracking-[-0.025em]">
              Vous hésitez entre plusieurs expertises ? Parlons-en trente minutes.
            </span>
            <ArrowButton tone="navy" onClick={openRdv}>Prendre rendez-vous</ArrowButton>
          </div>
        </div>
      </section>
    </>
  );
}
