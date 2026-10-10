import { projectArtSvg } from './art';

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  metric: string;
  role: string;
  stage: string;
  stack: string;
  status: string;
  problem: string;
  approach: string;
  result: string;
  learned: string;
  tags: string[];
  live?: string;
  repo?: string;
  art: string;
}

export const projects: Project[] = [
  {
    id: 'twiller',
    title: 'Twiller',
    category: 'FULL STACK / SOCIAL',
    summary: 'An X-inspired social application with feeds, accounts, conversations and complex product flows.',
    metric: 'WEB APPLICATION / FULL STACK',
    role: 'Full-stack developer',
    stage: 'Independent project',
    stack: 'Next.js · React · Node.js · MongoDB',
    status: 'Active development',
    problem: 'Social products require more than a polished feed. Authentication, ownership, messaging, recovery flows and UI state must work together reliably.',
    approach: 'Built responsive React/Next.js interfaces and Node.js backend flows for posting, profile management, user identity and messaging.',
    result: 'Core product features and local acceptance checks have been implemented. This is ongoing work; production acceptance remains a separate step.',
    learned: 'Secure server-side ownership, predictable state and thorough regression testing are essential to interactive products.',
    tags: ['Next.js', 'React', 'Node.js', 'MongoDB'],
    live: 'https://twiller-ruby.vercel.app/',
    repo: 'https://github.com/Nishwanth2809',
    art: projectArtSvg[0]
  },
  {
    id: 'brahmi',
    title: 'Brahmi AI',
    category: 'RESEARCH / COMPUTER VISION',
    summary: 'AI-based Brahmi script recognition and translation research using deep learning and synthetic training data.',
    metric: '306,000 IMAGES / 34 CLASSES',
    role: 'AI/ML researcher',
    stage: 'Academic research',
    stack: 'Python · CNN · Computer vision',
    status: 'Research project',
    problem: 'Historical scripts have limited accessible labeled data, and character shapes can vary across sources.',
    approach: 'Prepared a synthetic dataset of 306,000 images spanning 34 classes, with augmentation for Brahmi character recognition experiments.',
    result: 'Created a structured experimental dataset and model-development workflow. The dataset count is not a claimed production accuracy metric.',
    learned: 'Data design and evaluation rigor influence recognition models as much as architecture choices.',
    tags: ['Python', 'CNN', 'Data augmentation', 'Research'],
    repo: 'https://github.com/Nishwanth2809',
    art: projectArtSvg[1]
  },
  {
    id: 'medical',
    title: 'Medical AI',
    category: 'APPLIED AI / PRODUCT',
    summary: 'A medical report explainer prototype translating complex report language into accessible summaries.',
    metric: 'OCR / REPORT PROCESSING / UMLS',
    role: 'Full-stack & AI developer',
    stage: 'Prototype',
    stack: 'Node.js · Express · OCR · UMLS',
    status: 'Prototype',
    problem: 'Many medical reports contain terminology and scanned content that are hard for non-specialists to interpret.',
    approach: 'Built a report upload and extraction workflow, terminology enrichment through UMLS, and human-readable explanation and guidance sections.',
    result: 'Implemented a report-analysis prototype; the output is informational and must not replace professional medical interpretation.',
    learned: 'High-stakes interfaces need careful wording, traceable processing and clear limits on automated interpretation.',
    tags: ['Express', 'OCR', 'UMLS', 'Document parsing'],
    repo: 'https://github.com/Nishwanth2809',
    art: projectArtSvg[2]
  },
  {
    id: 'analytics',
    title: 'Data & ML',
    category: 'DATA / ANALYTICS',
    summary: 'Large-scale transaction processing, churn prediction and analytics dashboards.',
    metric: '1M+ TRANSACTION RECORDS PROCESSED',
    role: 'Data & ML developer',
    stage: 'Independent projects',
    stack: 'Python · ML · Tableau',
    status: 'Portfolio projects',
    problem: 'Raw operational records need reliable preprocessing and effective visualization before useful decisions can be made.',
    approach: 'Built a Python data pipeline processing over one million transaction records, developed a customer churn model and produced Tableau views.',
    result: 'Completed data-processing, modeling and visualization deliverables. Performance metrics are not presented without verified evaluation data.',
    learned: 'Clear data definitions and honest metrics matter more than impressive-looking charts.',
    tags: ['Python', 'Machine learning', 'Tableau', 'Data engineering'],
    repo: 'https://github.com/Nishwanth2809',
    art: projectArtSvg[3]
  }
];
