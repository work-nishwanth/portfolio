export interface TimelineStep {
  index: number;
  label: string;
  ghostText: string;
  title: string;
  titleHtml?: string;
  company: string;
  blurb: string;
  heightPct: string;
}

export const experienceSteps: TimelineStep[] = [
  {
    index: 0,
    label: '2026 / INTERNSHIP',
    ghostText: '2026',
    title: 'Software Development',
    titleHtml: 'Software<br>Development',
    company: 'StoryTent',
    blurb: 'Worked on production web and mobile app flows, portfolio integration, and deployment-related changes.',
    heightPct: '72%'
  },
  {
    index: 1,
    label: '2026 / PRODUCT',
    ghostText: '2026',
    title: 'Full-stack Builder',
    titleHtml: 'Full-stack<br>Builder',
    company: 'Independent projects',
    blurb: 'Developed social product features, backend services, authentication and interface systems.',
    heightPct: '80%'
  },
  {
    index: 2,
    label: 'ACADEMIC RESEARCH',
    ghostText: 'R&D',
    title: 'Applied AI & ML',
    titleHtml: 'Applied<br>AI & ML',
    company: 'Brahmi recognition research',
    blurb: 'Worked with a synthetic 306,000-image, 34-class character dataset and CNN-based experiments.',
    heightPct: '90%'
  },
  {
    index: 3,
    label: 'EXPECTED 2027',
    ghostText: '2027',
    title: 'B.Tech Computer Science',
    titleHtml: 'B.Tech<br>Computer Science',
    company: 'AI & Machine Learning',
    blurb: 'Building the foundations for reliable software engineering and applied intelligent systems.',
    heightPct: '100%'
  }
];

export const currentFocus = {
  label: 'CURRENT FOCUS',
  blurb: 'Improving full-stack product craftsmanship, building AI-enabled workflows, and learning from real deployment constraints.'
};
