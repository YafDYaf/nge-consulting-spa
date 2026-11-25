import { Link } from 'react-router-dom';
import { SplitTitle } from '../components/ui';

export default function NotFound() {
  return (
    <section className="bg-navy px-[clamp(20px,5vw,72px)] py-[clamp(50px,6.5vw,91px)]">
      <div className="mx-auto flex max-w-site flex-col gap-8">
        <SplitTitle strong="Cette page n’existe pas." light="Vos chiffres, eux, sont bien là." className="text-[clamp(32px,3.7vw,52px)]" />
        <Link to="/" className="inline-flex min-h-[58px] items-center self-start rounded-full bg-sun px-7 text-base font-bold text-on-sun no-underline">
          Revenir à l’accueil
        </Link>
      </div>
    </section>
  );
}
