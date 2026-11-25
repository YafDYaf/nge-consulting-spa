// Contenus de l'accueil « édition de Noël » (design « D2 — Édition de Noël »).
// Les éléments entre crochets [ ] sont à fournir ou valider par le cabinet.
import type { Situation } from './content';

export const NOEL_DEADLINES = [
  { when: '31 déc.', rule: 'clôture de l’exercice', what: 'Inventaire des stocks et arrêté des comptes, pour les exercices calés sur l’année civile.' },
  { when: '15 janv.', rule: 'première échéance de l’année', what: 'Déclarations sociales de décembre, primes de fin d’année comprises.' },
  { when: '1er mars', rule: 'au plus tard', what: 'Patente : déclaration et paiement intégral de l’année.' },
  { when: '31 mars', rule: 'chaque année', what: 'Déclaration annuelle des salaires (DADS).' },
];

const v = (name: string) => `rgb(var(--c-${name}))`;

export const NOEL_SITUATIONS: Situation[] = [
  { label: 'Je clôture mon exercice', text: 'Inventaire, rapprochements, écritures de fin d’année : nous préparons votre clôture du 31 décembre pour des états financiers prêts à temps.', service: 'comptabilité et suivi financier', cta: 'Préparer ma clôture', bg: '#FFFFFF', fg: v('navy'), line: '#FFFFFF' },
  { label: 'Je verse des primes de fin d’année', text: 'Gratifications, treizième mois, cotisations : nous intégrons vos primes dans la paie de décembre et préparons les déclarations de janvier.', service: 'paie et gestion sociale', cta: 'Organiser ma paie de décembre', bg: v('navy'), fg: '#FFFFFF', line: v('navy-edge') },
  { label: 'Je lance mon entreprise en janvier', text: 'Choix de la forme juridique, statuts, dossier au guichet unique de l’ANPI : préparez votre création pendant les fêtes, démarrez à la rentrée.', service: 'création d’entreprise', cta: 'Présenter mon projet', bg: v('sky'), fg: v('navy'), line: v('sky') },
  { label: 'Je prépare mes échéances', text: 'Patente, déclarations sociales, résultats : nous tenons votre calendrier de la nouvelle année et préparons chaque déclaration avant la date.', service: 'fiscalité et déclarations', cta: 'Faire le point sur mes échéances', bg: v('band'), fg: v('on-band'), line: v('band') },
  { label: 'Je bâtis mon budget', text: 'Budget prévisionnel, trésorerie, indicateurs : nous vous aidons à construire l’année qui vient avec des chiffres fiables.', service: 'conseil et pilotage', cta: 'Préparer mon budget', bg: v('royal'), fg: '#FFFFFF', line: v('royal') },
];

export const NOEL_CHECKS = [
  'Le stock est compté et valorisé au 31 décembre.',
  'Les relevés bancaires de décembre sont rapprochés.',
  'Les primes et gratifications de fin d’année sont prévues dans la paie de décembre.',
  'Les factures de l’année sont classées et transmises au cabinet.',
];

export const NOEL_VERDICTS: [string, string, string] = [
  'Tout est prêt. Vous pouvez fermer le bureau l’esprit tranquille.',
  'Presque prêt. Il reste quelques points à régler avant les fêtes.',
  'Pas encore prêt ? Prenons trente minutes avant les fêtes pour faire le point.',
];

export const NOEL_LETTER = {
  greeting: 'Chers clients, chers partenaires,',
  paragraphs: [
    'Cette année encore, vous nous avez confié vos chiffres, vos projets et parfois vos inquiétudes. Nous mesurons la confiance que cela représente.',
    'À vos côtés, nous avons créé des entreprises, tenu des échéances et préparé des bilans. Derrière chaque dossier, il y a des femmes et des hommes qui font vivre l’économie gabonaise. C’est pour eux que nous travaillons.',
    'En ce temps de fêtes, toute l’équipe de N.G.E Consulting vous souhaite un joyeux Noël, entouré de ceux qui comptent, et une nouvelle année sereine et prospère. Nous serons là en janvier pour la suite : clôtures, déclarations et nouveaux projets.',
  ],
  signature: '[Prénom Nom]',
  role: 'Direction du cabinet, au nom de toute l’équipe',
};

export const NOEL_FAQ = [
  { question: 'Le cabinet est-il ouvert pendant les fêtes ?', answer: 'Oui. Une permanence est assurée pendant toute la période des fêtes. [Dates et horaires de fin d’année à confirmer par le cabinet.] Vous pouvez aussi réserver dès maintenant un rendez-vous pour janvier.' },
  { question: 'Que faut-il préparer pour la clôture du 31 décembre ?', answer: 'L’inventaire des stocks, les relevés bancaires de décembre, les factures non encore transmises et la liste des immobilisations acquises dans l’année. Nous vous envoyons la liste complète adaptée à votre activité.' },
  { question: 'Comment traiter les primes de fin d’année dans la paie ?', answer: 'Elles s’ajoutent au salaire de décembre et entrent dans l’assiette des cotisations sociales. Transmettez-nous les montants avant la préparation de la paie, nous intégrons tout dans les bulletins et les déclarations de janvier.' },
  { question: 'La facture électronique nous concerne-t-elle ?', answer: 'La loi de finances 2026 l’étend aux entreprises relevant de l’IS, des bénéfices professionnels, de la TVA ou de l’impôt synthétique libératoire. Nous vérifions votre situation lors d’un premier échange.' },
  { question: 'Combien coûte un accompagnement ?', answer: 'Les honoraires dépendent de votre activité, du volume de pièces et des missions confiées. Après le premier échange, nous vous remettons un devis écrit. [Grille indicative à confirmer par le cabinet.]' },
];

/** Articles existants les plus utiles en fin d'année. */
export const NOEL_READS = ['comprendre-les-etats-financiers-syscohada', 'paie-obligations-cnss-cnamgs-employeurs', 'preparer-son-calendrier-fiscal'];
