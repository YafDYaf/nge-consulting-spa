// Contenus éditoriaux du site, repris du design « D2 ».
// Les éléments entre crochets [ ] sont des informations à fournir ou valider par le cabinet.
import photoComptabilite from '../assets/photos/comptabilite.webp';
import photoFiscalite from '../assets/photos/fiscalite.webp';
import photoPaie from '../assets/photos/paie.webp';
import photoCreation from '../assets/photos/creation.webp';
import photoConseil from '../assets/photos/conseil.webp';
import photoTpe from '../assets/photos/tpe.webp';
import photoPme from '../assets/photos/direction-reunion.webp';

export const ORGS = ['Direction générale des impôts', 'CNSS', 'CNAMGS', 'ANPI-Gabon', 'SYSCOHADA révisé', 'Droit OHADA'];

export const DEADLINES = [
  { when: 'le 15', rule: 'de chaque mois', what: 'Déclarations sociales CNSS et retenues sur salaires.' },
  { when: '1er mars', rule: 'au plus tard', what: 'Patente : déclaration et paiement intégral de l’année.' },
  { when: '31 mars', rule: 'chaque année', what: 'Déclaration annuelle des salaires (DADS).' },
  { when: '+15 jours', rule: 'après chaque trimestre', what: 'Reversement de la retenue à la source sur loyers.' },
];

export type Situation = {
  label: string;
  text: string;
  service: string;
  cta: string;
  bg: string;
  fg: string;
  line: string;
};

export const SITUATIONS: Situation[] = [
  { label: 'Je lance mon entreprise', text: 'Choix de la forme juridique, statuts, dossier au guichet unique de l’ANPI : nous préparons votre démarrage et vos premières obligations.', service: 'création d’entreprise', cta: 'Présenter mon projet', bg: 'rgb(var(--c-sky))', fg: 'rgb(var(--c-navy))', line: 'rgb(var(--c-sky))' },
  { label: 'Mes comptes sont en retard', text: 'Pièces dispersées, banque non rapprochée, bilan qui approche : nous remettons votre comptabilité à jour, puis nous la tenons chaque mois.', service: 'comptabilité et suivi financier', cta: 'Remettre mes comptes à jour', bg: 'rgb(var(--c-navy))', fg: '#FFFFFF', line: 'rgb(var(--c-navy-edge))' },
  { label: 'J’ai peur d’oublier une échéance', text: 'TVA, patente, retenues, résultats : nous tenons votre calendrier fiscal et préparons chaque déclaration avant la date.', service: 'fiscalité et déclarations', cta: 'Faire le point sur mes échéances', bg: '#FFFFFF', fg: 'rgb(var(--c-navy))', line: '#FFFFFF' },
  { label: 'J’embauche', text: 'Contrats, bulletins, CNSS et CNAMGS : nous organisons votre paie pour qu’elle tombe juste, chaque mois.', service: 'paie et gestion sociale', cta: 'Organiser ma paie', bg: 'rgb(var(--c-ice))', fg: 'rgb(var(--c-navy))', line: 'rgb(var(--c-ice))' },
  { label: 'Je veux mieux piloter', text: 'Budget, trésorerie, marges : nous transformons vos comptes en quelques indicateurs que vous suivez chaque mois.', service: 'conseil et pilotage', cta: 'Parler de mes indicateurs', bg: 'rgb(var(--c-royal))', fg: '#FFFFFF', line: 'rgb(var(--c-royal))' },
];

export const EINVOICE_CHECKS = [
  'Mes factures de vente sortent d’un logiciel ou d’un dispositif homologué.',
  'Mes fournisseurs me remettent des factures normalisées.',
  'Je sais si mon entreprise relève de l’IS, de la TVA ou de l’impôt synthétique libératoire.',
  'Mes pièces sont classées et transmises chaque mois à mon comptable.',
];

export const METHOD = [
  { title: 'Nous écoutons', text: 'Votre activité, votre organisation actuelle et ce qui vous bloque.' },
  { title: 'Nous analysons', text: 'Les documents à réunir, les obligations qui vous concernent, les priorités.' },
  { title: 'Nous proposons', text: 'Un périmètre, un calendrier et des livrables écrits noir sur blanc.' },
  { title: 'Nous suivons', text: 'Chaque mois, avec un interlocuteur qui connaît votre dossier.' },
];

export const MISSION_STEPS = [
  { title: 'Analyse de votre activité', text: 'Votre organisation actuelle, vos outils et vos difficultés.' },
  { title: 'Liste des documents', text: 'Les pièces et informations nécessaires, et qui les transmet.' },
  { title: 'Proposition écrite', text: 'Les prestations, le calendrier et les honoraires.' },
  { title: 'Suivi et livrables', text: 'Les livrables convenus, transmis à chaque échéance.' },
];

// Témoignages à recueillir auprès de clients réels, avec leur accord écrit. Ne jamais en inventer.
export const REVIEWS = [
  { quote: '[Ce qu’a changé le suivi mensuel pour ce dirigeant, en deux phrases.]', name: '[Prénom Nom]', role: 'Gérant de PME, Libreville', initials: 'PN', bg: '#FFFFFF', fg: 'rgb(var(--c-navy))', mark: 'rgb(var(--c-sky))' },
  { quote: '[Comment s’est passée la création de la société, du premier rendez-vous à l’immatriculation.]', name: '[Prénom Nom]', role: 'Créatrice d’entreprise', initials: 'PN', bg: 'rgb(var(--c-sun))', fg: 'rgb(var(--c-navy))', mark: 'rgb(var(--c-navy))' },
  { quote: '[Ce que la reprise de la paie a simplifié au quotidien.]', name: '[Prénom Nom]', role: 'Directrice administrative', initials: 'PN', bg: 'rgb(var(--c-navy-800))', fg: '#FFFFFF', mark: 'rgb(var(--c-sun))' },
  { quote: '[Une échéance fiscale bien préparée, racontée par le client.]', name: '[Prénom Nom]', role: 'Commerçant, régime réel', initials: 'PN', bg: 'rgb(var(--c-ice))', fg: 'rgb(var(--c-navy))', mark: 'rgb(var(--c-royal))' },
];

export const FAQ = [
  { question: 'Travaillez-vous avec des entreprises qui n’existent pas encore ?', answer: 'Oui. Nous aidons les porteurs de projet à choisir leur forme juridique, à préparer le dossier pour le guichet unique de l’ANPI et à organiser leur gestion dès le premier mois.' },
  { question: 'Pouvez-vous prendre en charge notre paie et nos déclarations sociales ?', answer: 'Nous préparons les bulletins de salaire chaque mois et les éléments des déclarations CNSS et CNAMGS, à partir des variables que vous nous transmettez.' },
  { question: 'La facture électronique nous concerne-t-elle ?', answer: 'La loi de finances 2026 l’étend aux entreprises relevant de l’IS, des bénéfices professionnels, de la TVA ou de l’impôt synthétique libératoire. Nous vérifions votre situation lors d’un premier échange.' },
  { question: 'Comment se passe le premier rendez-vous ?', answer: 'Nous écoutons votre besoin, nous listons les documents utiles, puis nous vous adressons une proposition écrite avec le périmètre et le calendrier.' },
  { question: 'Combien coûte un accompagnement ?', answer: 'Les honoraires dépendent de votre activité, du volume de pièces et des missions confiées. Après le premier échange, nous vous remettons un devis écrit. [Grille indicative à confirmer par le cabinet.]' },
];

export type Service = {
  id: string;
  short: string;
  title: string;
  teaser: string;
  headline: string;
  intro: string;
  photo: string;
  photoAlt: string;
  groups: { title: string; items: string[] }[];
  who: string;
  cta: string;
  toConfirm?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: 'comptabilite', short: 'Comptabilité', title: 'Comptabilité & suivi financier',
    teaser: 'Tenue, révision et préparation des états financiers selon le SYSCOHADA. Des synthèses que vous pouvez lire et utiliser pour décider.',
    headline: 'Une comptabilité organisée pour une gestion plus sereine.',
    intro: 'La comptabilité ne se limite pas à l’enregistrement des opérations. C’est la source d’information qui vous permet de comprendre la situation de votre entreprise et de préparer vos décisions, dans le respect du SYSCOHADA.',
    photo: photoComptabilite, photoAlt: 'Comptable travaillant sur son ordinateur portable dans un bureau lumineux',
    groups: [
      { title: 'Tenue et organisation comptable', items: ['Collecte et classement des pièces justificatives', 'Enregistrement et suivi des opérations', 'Rapprochements bancaires', 'Suivi des comptes clients et fournisseurs'] },
      { title: 'Révision et clôture', items: ['Vérification de la cohérence des écritures', 'Préparation des opérations de clôture', 'États financiers selon le SYSCOHADA', 'Analyse des principaux soldes'] },
      { title: 'Suivi de gestion', items: ['Tableaux de suivi des charges et produits', 'Suivi des encaissements et décaissements', 'Synthèses financières et lecture des résultats'] },
    ],
    who: 'entrepreneurs, TPE, PME et sociétés qui veulent un suivi régulier.',
    cta: 'Demander un accompagnement comptable',
  },
  {
    id: 'fiscalite', short: 'Fiscalité', title: 'Fiscalité & déclarations',
    teaser: 'TVA, patente, impôt sur les résultats : préparés à l’avance, pas la veille.',
    headline: 'Anticipez vos obligations fiscales avec davantage de clarté.',
    intro: 'Nous préparons vos déclarations selon votre activité et votre régime d’imposition. Une fiscalité préparée, documentée et expliquée, plutôt que gérée la veille de l’échéance.',
    photo: photoFiscalite, photoAlt: 'Dirigeante relisant ses déclarations sur son ordinateur',
    groups: [
      { title: 'Suivi des obligations', items: ['Identification des échéances qui vous concernent', 'Organisation de votre calendrier fiscal', 'Vérification de la cohérence des informations'] },
      { title: 'Assistance déclarative', items: ['Préparation des éléments de TVA, si vous y êtes soumis', 'Préparation de la déclaration des résultats', 'Patente et autres obligations liées à votre régime', 'Mise en conformité avec la facture électronique (loi de finances 2026)'] },
      { title: 'Accompagnement', items: ['Explication de vos obligations, en clair', 'Préparation des justificatifs', 'Orientation vers un professionnel habilité si nécessaire'] },
    ],
    who: 'toute entreprise soumise à l’IS, à la TVA, aux bénéfices professionnels ou à l’impôt synthétique libératoire.',
    cta: 'Échanger sur mes obligations fiscales',
  },
  {
    id: 'paie', short: 'Paie et social', title: 'Paie & gestion sociale',
    teaser: 'Bulletins de salaire, CNSS, CNAMGS et suivi administratif de vos salariés.',
    headline: 'Une paie juste, chaque mois, pour vous et vos collaborateurs.',
    intro: 'La paie demande précision, confidentialité et régularité. Nous préparons vos bulletins et les informations de vos déclarations sociales à partir des variables que vous nous transmettez.',
    photo: photoPaie, photoAlt: 'Gestionnaire de paie souriante échangeant en visioconférence',
    groups: [
      { title: 'Préparation de la paie', items: ['Collecte des variables du mois', 'Préparation des bulletins de salaire', 'Suivi des rémunérations et éléments associés'] },
      { title: 'Suivi social', items: ['Informations des déclarations CNSS et CNAMGS', 'Formalités auprès des organismes sociaux', 'Suivi administratif et classement des pièces sociales'] },
      { title: 'Organisation de l’employeur', items: ['Calendrier de préparation de la paie', 'Circuit de transmission des informations', 'Liste des documents à conserver'] },
    ],
    who: 'employeurs, du premier salarié à l’équipe de plusieurs dizaines de personnes.',
    cta: 'Demander une solution de paie',
  },
  {
    id: 'creation', short: 'Création d’entreprise', title: 'Création d’entreprise',
    teaser: 'Statuts, dossier au guichet unique de l’ANPI et premiers outils de gestion.',
    headline: 'Donnez à votre projet les bonnes bases dès le départ.',
    intro: 'Forme juridique, statuts, dossier au guichet unique de l’ANPI, premières obligations : nous vous aidons à préparer chaque étape et à démarrer avec une gestion organisée.',
    photo: photoCreation, photoAlt: 'Jeune entrepreneur souriant, bras croisés, devant son établissement',
    groups: [
      { title: 'Préparation du projet', items: ['Compréhension de l’activité envisagée', 'Choix de la forme juridique', 'Préparation du dossier de constitution'] },
      { title: 'Formalités', items: ['Documents nécessaires à l’immatriculation', 'Démarches auprès du guichet unique de l’ANPI', 'Formalités fiscales et sociales initiales'] },
      { title: 'Premiers outils de gestion', items: ['Organisation documentaire', 'Classement des factures et justificatifs', 'Premiers tableaux de suivi financier'] },
    ],
    who: 'porteurs de projet, entrepreneurs individuels et associés qui créent une société.',
    cta: 'Présenter mon projet de création',
  },
  {
    id: 'conseil', short: 'Conseil et pilotage', title: 'Conseil & pilotage',
    teaser: 'Budgets, trésorerie et tableaux de bord, si votre activité le demande.',
    headline: 'Transformez vos informations financières en outils de décision.',
    intro: 'Développer son entreprise, c’est aussi suivre ses charges, anticiper sa trésorerie et comprendre ses résultats. Nous mettons en place les outils qui vous donnent la bonne information au bon moment.',
    photo: photoConseil, photoAlt: 'Conseiller souriant à son poste, un tableau de bord affiché sur sa tablette',
    groups: [
      { title: 'Outils de pilotage', items: ['Tableaux de bord de gestion', 'Budgets prévisionnels', 'Suivi de trésorerie'] },
      { title: 'Analyse', items: ['Analyse des charges et des résultats', 'Synthèses financières périodiques', 'Préparation de projets de développement'] },
    ],
    who: 'dirigeants de PME en croissance qui veulent piloter avec des chiffres fiables.',
    cta: 'Discuter de mes besoins de pilotage',
    toConfirm: true,
  },
];

export const VALUES = [
  { name: 'Rigueur', text: 'Une attention constante à la qualité des informations, au respect des échéances et au suivi des dossiers.' },
  { name: 'Confidentialité', text: 'Les informations de votre entreprise et de vos salariés sont traitées avec discrétion.' },
  { name: 'Proximité', text: 'Des échanges réguliers et une compréhension réelle de votre activité.' },
  { name: 'Clarté', text: 'Des démarches et des résultats expliqués simplement, sans jargon inutile.' },
  { name: 'Responsabilité', text: 'Nous intervenons dans le cadre des missions convenues, de nos compétences et de nos obligations professionnelles.' },
];

export const TEAM = [
  { role: '[Fonction : direction du cabinet]' },
  { role: '[Fonction : comptabilité]' },
  { role: '[Fonction : fiscalité]' },
  { role: '[Fonction : paie et social]' },
];

export const PROFILES = [
  { title: 'Créateurs d’entreprise', question: 'Vous souhaitez démarrer votre activité et comprendre les étapes essentielles ?', text: 'Nous vous aidons à préparer votre projet, organiser vos formalités et anticiper vos premières obligations de gestion.', items: ['Choix de la forme juridique et statuts', 'Dossier au guichet unique de l’ANPI', 'Organisation de votre gestion dès le premier mois'], cta: 'Je lance mon entreprise', photo: photoCreation, photoAlt: 'Jeune entrepreneur devant son établissement', bg: 'rgb(var(--c-sky))' },
  { title: 'TPE et petites entreprises', question: 'Vous gérez de nombreuses tâches au quotidien et manquez de temps pour votre activité ?', text: 'Structurez votre comptabilité, préparez vos échéances et organisez le suivi administratif de votre entreprise.', items: ['Tenue comptable et rapprochements bancaires', 'Calendrier fiscal et déclarations', 'Paie de vos premiers salariés'], cta: 'Organiser ma gestion', photo: photoTpe, photoAlt: 'Gérante de petite entreprise souriante à son bureau, carnet et ordinateur ouverts', bg: 'rgb(var(--c-ice))' },
  { title: 'PME et entreprises en croissance', question: 'Votre organisation se développe et vos besoins de gestion deviennent plus importants ?', text: 'Améliorez la structuration de vos processus comptables, sociaux et financiers avec un accompagnement adapté.', items: ['Révision et états financiers SYSCOHADA', 'Paie et déclarations CNSS et CNAMGS', 'Tableaux de bord, budgets et trésorerie'], cta: 'Accompagner ma croissance', photo: photoPme, photoAlt: 'Dirigeant animant une réunion avec son équipe autour d’une table', bg: 'rgb(var(--c-sun))' },
];

export const ADVICE_BY_NEED = [
  { title: 'Comptabilité & suivi financier', text: 'une tenue mensuelle et une synthèse claire de vos résultats.' },
  { title: 'Fiscalité & déclarations', text: 'un calendrier fiscal tenu pour vous et des déclarations préparées à l’avance.' },
  { title: 'Paie & gestion sociale', text: 'des bulletins justes chaque mois et des déclarations CNSS et CNAMGS suivies.' },
  { title: 'Création d’entreprise', text: 'un accompagnement du choix des statuts jusqu’aux premières déclarations.' },
  { title: 'Conseil & pilotage', text: 'des tableaux de bord et un suivi de trésorerie pour décider avec des chiffres fiables.' },
];

export const GUIDES = [
  { title: 'Calendrier fiscal et social de la PME', meta: 'PDF, une page, à produire par le cabinet' },
  { title: 'Check-list : préparer son rendez-vous comptable', meta: 'PDF, deux pages, à produire par le cabinet' },
  { title: 'Créer sa société : le dossier à réunir', meta: 'PDF, deux pages, à produire par le cabinet' },
];
