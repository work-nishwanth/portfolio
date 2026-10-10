# Portfolio

Personal portfolio web application for Nishwanth Yarra (Full-stack & AI Developer).

## Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Motion & Scroll**: GSAP + `@gsap/react` + ScrollTrigger, Lenis smooth scrolling, Motion (`motion/react`)
- **3D**: Three.js + `@react-three/fiber` + `@react-three/drei` (with responsive CSS fallback)
- **Typography**: Self-hosted `@fontsource` packages (Anton, Manrope, DM Mono, Instrument Serif)
- **Styling**: Vanilla CSS tokens and custom design system

## Scripts
- `npm run dev`: Start local Vite development server
- `npm run build`: Type-check and build production bundle
- `npm run lint`: Lint code with oxlint
- `npm run preview`: Preview production build locally

## Project Structure
```
src/
  content/            # Typed content files (projects, experience, skills, stats, site config, art)
  styles/             # Global tokens, grain overlay, and typography/layout rules
  hooks/              # Custom hooks (usePagedMode, etc.)
  components/
    layout/           # Header, navigation, ProgressBar
    hero/             # Hero banner, Skyline pillars, Ticker marquee, light beams
    work/             # Project accordion strip and panels
    about/            # Skill groups, plate stack, stats
    experience/       # Journey timeline steps
    contact/          # Contact CTA, email copy button, footer links
    case/             # Native <dialog> case study modal
```

## Adding a New Project
All copy and project records are decoupled from UI components. To add a project:
1. Open `src/content/projects.ts`.
2. Add a new object to the `projects` array adhering to the `Project` interface:
   ```ts
   {
     id: 'new-project-id',
     title: 'Project Title',
     category: 'CATEGORY / TAGLINE',
     summary: 'Brief description...',
     metric: 'KEY METRIC / HIGHLIGHT',
     role: 'Your Role',
     stage: 'Project Stage',
     stack: 'Tech Stack',
     status: 'Status',
     problem: 'Problem statement...',
     approach: 'Solution approach...',
     result: 'Outcomes and deliverables...',
     learned: 'Key learnings...',
     tags: ['React', 'TypeScript', 'Node.js'],
     live: 'https://example.com', // optional
     repo: 'https://github.com/...', // optional
     art: '<svg path definition...>' // or import from src/content/art.ts
   }
   ```
3. The project accordion strip, project counters, and case-study dialog will automatically incorporate the new entry.
