export interface SkillGroup {
  id: number;
  label: string;
  skills: string;
}

export const skillGroups: SkillGroup[] = [
  {
    id: 0,
    label: 'LANGUAGES',
    skills: 'Python · Java · JavaScript · TypeScript'
  },
  {
    id: 1,
    label: 'FRONTEND',
    skills: 'React · Next.js · HTML · CSS'
  },
  {
    id: 2,
    label: 'BACKEND & DATA',
    skills: 'Node.js · Express · APIs · MongoDB'
  },
  {
    id: 3,
    label: 'AI / ANALYTICS',
    skills: 'Machine Learning · CNN · OCR · UMLS · Tableau'
  }
];
