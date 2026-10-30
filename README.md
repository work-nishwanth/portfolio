# Portfolio

Nishwanth Yarra’s portfolio, built with React 19, TypeScript, and Vite.

## Features

- Architectural hero, selected-work accordion, About, Journey, and a correspondence-inspired Contact section.
- A dedicated `/projects/` page with all 11 projects and real screenshots or project outputs.
- Full-screen case studies with sticky navigation, project tabs, fact cards, pipeline steps, readable narrative sections, and previous/next navigation.
- Light/dark themes with saved preferences and shared theme controls.
- Responsive layouts, reduced-motion support, keyboard-accessible dialogs, and email copying with feedback.

## Run locally

Use Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
```

The portfolio does not require a backend or environment variables. Project previews are checked-in assets; the original project applications do not need to run.

## Commands

```sh
npm run build     # Type-check and create dist/
npm run preview   # Preview the production build
npm run lint      # Run oxlint
```

## Pages and deployment

Vite builds two HTML entry points:

- `/` — homepage (`index.html`)
- `/projects/` — complete collection (`projects/index.html`)

Publish the generated `dist/` directory on a static host that serves directory index files. Case studies use hashes such as `/projects/#case-twiller`, so case links do not need a separate server rewrite.

## Source layout

```text
src/
  components/
    hero/            Hero typography, skyline, ticker, and beams
    work/            Selected-project strip
    projects/        Complete collection and screenshot previews
    about/           Biography, toolkit, and stats
    experience/      Journey timeline
    contact/         Letter-style email CTA and copy feedback
    case/            Case-study reading view
    layout/          Header, navigation, and progress indicator
  content/           Typed site content, project records, preview assets, and fact cards
  hooks/             Theme, paged layout, and utility hooks
  styles/            Shared tokens and scoped page styles
public/
  project-previews/   Real project screenshots and output images
  fonts/             Self-hosted display fonts
projects/index.html  Projects-page build entry
```

## Update projects

1. Edit `src/content/projects.ts`. Every project provides its stable ID, title, category, summary, role, stage, stack, status, overview, highlights, and tags. Live and repository links are optional.
2. Add real images under `public/project-previews/` and map the project ID in `src/content/projectPreviews.ts`. Supply a separate dark capture only when the source application supports it.
3. For a full case study, populate the optional `caseStudy` record with its headline, overview, contribution, problem, architecture, challenges, decisions, results, limitations, workflow steps, and output.
4. Add factual case-study cards in `src/content/caseStudyFacts.ts` when available. Other projects use descriptive cards automatically.

The collection and project count use the shared project array. The homepage shows the first four projects. Keep project IDs stable to preserve existing case links.

Content and design provenance are documented in `docs/frontend/`. The Text to Speech entry retains the legacy `voice-chat-ai` ID for link compatibility. Apps without a native dark mode retain their original screenshot colors inside a themed frame.

Generated capture output, build output, dependencies, and local PowerPoint work are excluded from Git.
