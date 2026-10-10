export interface StatItem {
  id: string;
  value: string;
  target?: number;
  suffix?: string;
  isCountUp: boolean;
  label: string;
}

export const statsData: StatItem[] = [
  {
    id: 'graduation',
    value: '2027',
    isCountUp: false,
    label: 'Expected graduation'
  },
  {
    id: 'images',
    value: '306K',
    target: 306,
    suffix: 'K',
    isCountUp: true,
    label: 'Training images'
  },
  {
    id: 'records',
    value: '1M+',
    target: 1,
    suffix: 'M+',
    isCountUp: true,
    label: 'Records processed'
  },
  {
    id: 'projects',
    value: '4',
    target: 4,
    suffix: '',
    isCountUp: true,
    label: 'Featured projects'
  }
];
