export interface NavItem {
  id: string;
  label: string;
  wipeLabelNumber: string;
  wipeLabelTitle: string;
}

export interface HeroPillar {
  tag: string;
  height: string;
  delay: number;
  parallax: number;
  isLead?: boolean;
}

export const siteConfig = {
  name: 'Nishwanth Yarra',
  mark: 'NY.',
  title: 'Nishwanth Yarra — Full-stack & AI Developer',
  email: 'nishwanthyarra@gmail.com',
  github: 'https://github.com/Nishwanth2809',
  linkedin: 'https://linkedin.com/in/yarranishwanth',
  availability: 'OPEN TO OPPORTUNITIES',
  location: 'Hyderabad, India',
  copyright: '© 2026 NISHWANTH YARRA',

  hero: {
    kicker: 'FULL-STACK & AI DEVELOPER',
    portfolioYear: 'PORTFOLIO / 2026',
    statementHtml: 'Crafting <em>thoughtful</em> systems<span style="color:var(--warm)">.</span>',
    sub: 'I build polished web products and intelligent tools—connecting strong engineering with useful, intuitive experiences.',
    ctaWork: 'EXPLORE WORK',
    ctaContact: 'GET IN TOUCH'
  },

  work: {
    kicker: '01 / SELECTED WORK',
    headingHtml: 'WORK MADE <em>real.</em>',
    sub: 'Explore full-stack products, machine-learning research and practical AI tools.'
  },

  about: {
    kicker: '02 / PERSON & PRACTICE',
    headingHtml: 'LOGIC IN EVERY LAYER.<br><em>Care in every detail.</em>',
    bioHtml: "I'm <em>Nishwanth</em>, a Computer Science student specializing in AI & Machine Learning, based in Hyderabad. I enjoy building end-to-end software — from interface details to backend reliability and applied ML."
  },

  experience: {
    kicker: '03 / EXPERIENCE & EDUCATION',
    headingHtml: 'THE JOURNEY <em>so far.</em>',
    sub: 'A combination of real product development, self-driven projects and research work.'
  },

  contact: {
    kicker: '04 / START SOMETHING',
    headingLine1: 'Have an idea?',
    headingLine2: "Let's make",
    headingLine3: 'it work.'
  }
};

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', wipeLabelNumber: '01 / 05', wipeLabelTitle: 'Home' },
  { id: 'work', label: 'Work', wipeLabelNumber: '02 / 05', wipeLabelTitle: 'Work' },
  { id: 'about', label: 'About', wipeLabelNumber: '03 / 05', wipeLabelTitle: 'About' },
  { id: 'experience', label: 'Journey', wipeLabelNumber: '04 / 05', wipeLabelTitle: 'Journey' },
  { id: 'contact', label: 'Contact', wipeLabelNumber: '05 / 05', wipeLabelTitle: 'Contact' }
];

export const tickerItems: string[] = [
  'HYDERABAD, INDIA / UTC+5:30',
  'PYTHON',
  'JAVA',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'REACT',
  'NEXT.JS',
  'NODE.JS',
  'MONGODB',
  'CNN',
  'OCR',
  'UMLS',
  'TABLEAU'
];

export const heroPillars: HeroPillar[] = [
  { tag: 'PYTHON', height: '34%', delay: 6, parallax: -16.5 },
  { tag: 'JAVA', height: '48%', delay: 4, parallax: -13.5 },
  { tag: 'JS', height: '42%', delay: 4, parallax: -10.5 },
  { tag: 'TS', height: '64%', delay: 2, parallax: -7.5 },
  { tag: 'REACT', height: '56%', delay: 2, parallax: -4.5 },
  { tag: 'NEXT', height: '90%', delay: 0, parallax: -1.5, isLead: true },
  { tag: 'NODE', height: '70%', delay: 0, parallax: 1.5 },
  { tag: 'EXPRESS', height: '82%', delay: 2, parallax: 4.5 },
  { tag: 'MONGODB', height: '52%', delay: 2, parallax: 7.5 },
  { tag: 'ML', height: '66%', delay: 4, parallax: 10.5 },
  { tag: 'CNN', height: '44%', delay: 4, parallax: 13.5 },
  { tag: 'OCR', height: '58%', delay: 6, parallax: 16.5 }
];
