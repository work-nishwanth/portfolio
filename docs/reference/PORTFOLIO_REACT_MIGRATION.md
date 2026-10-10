# Portfolio → React migration brief

**Source of truth:** `portfolio_motion_v9.html` (single file, ~82 KB, vanilla HTML/CSS/JS, layered v1→v9).
**Goal:** rebuild it 1:1 visually and behaviourally as a modern React app, with cleaner architecture, real 3D where the original faked it with CSS, and content that is easy to edit later.

> Agent: read the whole HTML file before writing code. Keep it open as the visual reference. Run it side by side with your build and compare section by section.

---

## 1. Recommended stack

Use the **latest stable** release of each package (check the official docs and `npm view <pkg> version`; do not rely on remembered versions).

| Concern | Choice | Why |
|---|---|---|
| Build / framework | **Vite + React + TypeScript** | The site is one page with heavy client-side motion. No SSR needed. Fast HMR. (Pick **Next.js App Router** instead only if a blog or CMS is planned. Then mark every animated component `"use client"`.) |
| Scroll-driven + timeline animation | **GSAP** + `@gsap/react` (`useGSAP`) + ScrollTrigger | Best-in-class for sequenced reveals, scroll scrubbing and the column-wipe transitions. GSAP and its plugins (incl. SplitText) are now free. |
| Smooth scroll | **Lenis** | Standard pairing with ScrollTrigger. Needed for the section-to-section feel. |
| UI / layout animation | **Motion** (`motion/react`, formerly Framer Motion) | Accordion strip (`layout`), dialog enter/exit (`AnimatePresence`), hover/tap, magnetic buttons. |
| 3D | **three + @react-three/fiber + @react-three/drei** | Replaces the CSS-3D "plate stack" and the canvas dust. Optional: postprocessing for glow. |
| Styling | **CSS Modules + a global `tokens.css`** (or Tailwind v4 if you prefer, with the same tokens as CSS variables) | The original uses many bespoke effects (masks, clip-paths, writing-mode, blend modes). Port these as plain CSS rather than fighting utility classes. |
| State | React state + one small context (`useProjects`, `useModal`) | No Redux/Zustand needed. |
| Fonts | `@fontsource/*` packages: Anton, Manrope, DM Mono, Instrument Serif | Self-hosted, no Google Fonts request. Prevents layout shift on the name-fitting logic. |
| Tooling | ESLint + Prettier, `vite-plugin-svgr` if SVGs are split out | |
| Deploy | Vercel or Netlify, canonical `https://yarranishwanth.tech/` | |

Do **not** add a component library (MUI, shadcn etc.). The design is fully custom.

---

## 2. Design tokens (copy verbatim into `src/styles/tokens.css`)

```css
:root{
  --bg:#050505; --surface:#111; --ink:#f6f5f2; --ink2:#b8b8b8; --muted:#9b9b9b; --faint:#6f6f6f;
  --warm:#ffab77; --cool:#86d5ff; --violet:#b083ec;
  --ease:cubic-bezier(.19,1,.22,1);
  --gutter:clamp(22px,5vw,88px);
  --pad:max(var(--gutter),calc((100vw - 1600px)/2));
}
```

Fonts and roles:
- **Anton** – display type (name, section "spot" headings, project titles, stats).
- **Instrument Serif** (italic) – emphasis words, roles, company names, statements.
- **Manrope** – body.
- **DM Mono** – uppercase `.label` text, buttons.

Global overlays: film-grain (SVG feTurbulence, 4.5 % opacity), vignette, 2 px gradient scroll-progress bar, 6-column faint grid lines per section.

---

## 3. Content to extract first (`src/content/`)

Move **all copy out of JSX** into typed files so later edits are trivial:

- `projects.ts` – the 4 projects (Twiller, Brahmi AI, Medical AI, Data & ML). Fields: `id, title, category, summary, metric, role, stage, stack, status, problem, approach, result, learned, tags[], live?, repo?`, plus the SVG `art` for each (4 line-drawings in the `ART` array).
- `experience.ts` – 4 timeline steps (StoryTent internship, Full-stack builder, Applied AI & ML research, B.Tech 2027) with `{ label, ghostText, title, company, blurb, heightPct }` (`--hh` = 72/80/90/100 %).
- `skills.ts` – 4 groups (Languages, Frontend, Backend & Data, AI / Analytics).
- `stats.ts` – 2027 (static), 306K, 1M+, 4 (count-up).
- `site.ts` – name, email, GitHub, LinkedIn, ticker items, nav items, hero pillars (label, height %, delay, parallax factor).

Copy the text **exactly** from the HTML. Do not rewrite it.

---

## 4. What the page actually does (final v9 behaviour)

The file is layered, and later layers override earlier ones. **Port the final result, not the history.**

### 4.1 Global shell
1. **Loader**: 9 vertical columns, a 000→100 counter (1.5 s, ease-out cubic), gradient progress bar. When the counter and fonts are ready, the columns slide up (staggered from the centre outwards), then the app "boots" (adds `ready`, starts reveals). Skipped under `prefers-reduced-motion`.
2. **Header**: fixed, blurred. `NY.` mark, 5 nav links with active-section underline, "OPEN TO OPPORTUNITIES" pulsing dot, hamburger below 800 px (full-screen menu, locks body scroll, Esc closes).
3. **Scroll progress bar** at the top.
4. **Custom cursor** (fine pointers only): 36 px ring with eased follow, grows over links/buttons, becomes a filled "VIEW" disc over the active project panel.
5. **Magnetic buttons** (fine pointers): the button translates towards the pointer; fill-wipe on hover.
6. **Section transition**: clicking a nav link plays the 9-column **wipe** (columns scaleY in from the bottom, staggered, a big label such as "03 / 05 JOURNEY" shows, scroll jumps instantly while covered, then columns exit upwards). Total about 1.4 s, with a `busy` lock.
7. **Paged mode** (desktop): when `width > 900 && height >= 620 && hover:hover && !reduced-motion`, each section is exactly `100svh` with scroll-snap. Wheel and keyboard (↑ ↓ PgUp PgDn Space Home End) are hijacked to step one section at a time through the wipe (45 px wheel threshold, 2.3 s lock). Outside that mode, it is a normal scrolling page.
   - Implement as a `usePagedMode()` hook plus a `SectionNavigator` that owns the wheel/keyboard handlers.
   - Make the 2.3 s lock a constant. It is the most opinionated UX in the file, so expose it as a config value.
8. **Reveal system**: sections get `.visible` via IntersectionObserver (threshold .12). Children use `.reveal` (fade + 38 px rise), word-split headings (`.w/.wi` masked rise), and char-split headings.

### 4.2 Hero (`#home`)
- Background: radial glow, **90-particle dust canvas** (rising, parallax with pointer, tri-colour), **3 blurred swaying light beams** (blend-mode: screen).
- **Name "NISHWANTH YARRA"** in Anton, auto-fitted to the container width (measure at 100 px, scale to fit, re-fit on resize and on `document.fonts.ready`).
  - Two stacked copies: dark outlined `name-base` and bright `name-lit`. The lit layer is revealed by a **radial mask that follows the pointer**. With no pointer for 2.5 s it drifts on a sine path, and the lens radius starts huge and shrinks over 2.8 s as an intro.
  - Per-character entrance: translateY + rotateX(-95°) + blur → clear, staggered 72 ms. The lit layer also has a red/cyan chromatic split that resolves into a soft cyan glow.
- Statement in Instrument Serif: "Crafting *thoughtful* systems." plus the sub copy and 2 CTAs.
- **"Skyline" of 12 pillars** along the bottom, one per skill (PYTHON, JAVA, JS, TS, REACT, NEXT (lead, gradient top edge), NODE, EXPRESS, MONGODB, ML, CNN, OCR). Heights vary, they clip-reveal bottom-up with stagger, "breathe" (scaleY 1→1.03), parallax with pointer X, lift on hover, and a light sweep crosses on load. The whole skyline tilts in perspective with the pointer.
- Infinite **ticker** marquee at the bottom (Hyderabad UTC+5:30 · skills …).
- On scroll, hero copy fades and drifts up (`--hp`, `--hy`).

### 4.3 Work (`#work`)
- Giant outlined "WORK" word behind, parallaxing against pointer X.
- Heading "WORK MADE *real.*" uses the **"spot" effect** (same pointer-lens lit/base technique as the hero name, per heading, with an idle sine drift).
- **Horizontal accordion of 4 projects.** The active panel is `flex:6`, the others `flex:1`. Collapsed panels show a vertical Anton title. The active one reveals the category, big title, role/stage line, summary, metric (number counts up), a "VIEW CASE STUDY →" link, a line-art SVG that **draws itself** (stroke-dashoffset with per-path stagger) and a gradient top line that scales in.
- Hover (mouse, 70 ms debounce) or focus selects. Clicking the active panel opens the case study. A `01 / 04` counter and a GitHub link sit in the header. Below 520 px the strip becomes a vertical stack.
- Cursor-following radial highlight inside each panel.

### 4.4 About (`#about`)
- Anton heading "LOGIC IN EVERY LAYER. *Care in every detail.*", intro paragraph, 4 skill groups.
- Right: **isometric stack of 4 plates** (CSS 3D, rotateX 62°/rotateZ −38°, tilting with the pointer, floating). Hovering a skill group (or plate) lifts the matching plate, tints it cyan and highlights the group. Plates "lift" in on entry.
- Stats row with **count-up** triggered once at 60 % visibility.

### 4.5 Journey (`#experience`)
- Outlined "JOURNEY" backdrop, spot-lit heading.
- 4 columns of **increasing height** (72 → 100 %), bottom-aligned like a bar chart. They clip-reveal upward with stagger, lift on hover, and have a ghost outlined year/"R&D" numeral. A gradient line above scales with scroll progress. "Current focus" italic quote below (hidden when height < 820 px in paged mode).

### 4.6 Contact (`#contact`)
- Huge split-word headline "Have an idea? / *Let's make* / it work." (the middle line outlined), big concentric-ring background that rotates with scroll.
- Email link, **Copy email** button (clipboard API, "COPIED" feedback, graceful fallback), social links, back to top, © line.

### 4.7 Case-study modal
- Native `<dialog>` full screen. It opens with a **circular clip-path reveal originating at the click point**. It has focus restoration, Esc/backdrop/Close all closing, and **URL hash sync** (`#case-<id>`, with pushState and popstate so Back closes it and a deep-link opens it).
- Content: kicker, huge title, a self-drawing SVG illustration, fact grid (role/stage/stack/status), Problem / Approach / Result / What I learned, tags, Live site / GitHub buttons (hidden if absent), **Next project** (cycles, scrolls dialog to top, replaces hash).
- Body children stagger-fade in on every open or next.
- In React: keep the native `<dialog>` (best a11y and focus-trap for free) driven by `ref.showModal()`, animate with Motion or WAAPI. If you switch to a custom modal, you must replicate focus trap, scroll lock and `inert` on the background.

---

## 5. What to upgrade with real tech (and what NOT to change)

### Upgrade
| Original (faked) | React version |
|---|---|
| About: CSS-3D plate stack | **R3F scene**: 4 `RoundedBox`/plane plates, damped pointer-tilt with `useFrame`, hover lift via springs, subtle emissive on the active plate. Keep the labels as `Html` or `Text` from drei. Add an HTML fallback for no-WebGL and reduced-motion. |
| Hero: 2D canvas dust | **R3F `Points`** (or keep a lightweight 2D canvas if you want zero 3D weight on the hero). If using R3F, share a single `<Canvas>` only where needed. Do not create one per section. |
| Hero skyline: perspective-tilted divs | Either keep as DOM (perfectly good) or optionally render as instanced boxes in 3D with the same heights/labels. **Default: keep DOM**, because it is crisp and accessible. |
| Name/headline "spot" lens | Keep the **CSS mask** technique, but drive `--lx/--ly/--lr` from one shared `usePointerLens(ref)` hook backed by `gsap.ticker` or `useFrame`, not N separate rAF loops. |
| Manual rAF/IntersectionObserver/WAAPI | `useGSAP` + ScrollTrigger (reveals, progress, counters), Motion for state-driven UI. |
| Wipe transition | A GSAP timeline in a `<PageTransition>` component using a context `navigateTo(sectionId)`. |

### Do not change
- Visuals, copy, colours, type, spacing, the 9-column rhythm.
- Native `<dialog>` semantics, hash deep-linking, `prefers-reduced-motion` support, keyboard navigation, visible focus ring (`2px var(--cool)`).
- Tab titles, meta tags, OG tags, favicon, canonical URL (copy the `<head>` from the HTML into `index.html`).

---

## 6. Suggested structure

```
src/
  main.tsx
  App.tsx
  content/            projects.ts experience.ts skills.ts stats.ts site.ts art.ts
  styles/             tokens.css global.css grain.css
  components/
    layout/           Loader Header MobileMenu ProgressBar Cursor PageTransition SectionNavigator
    ui/               Button(Magnetic) Label SplitText SpotHeading CountUp Reveal DrawSvg
    hero/             Hero NameLens DustField Beams Skyline Ticker
    work/             Work ProjectStrip ProjectPanel
    about/            About SkillGroups PlateStack3D (+ PlateStackFallback) Stats
    experience/       Experience TimelineStep
    contact/          Contact CopyEmailButton
    case/             CaseStudyDialog
  hooks/              usePagedMode usePointer usePointerLens useReducedMotion useInView useHashModal useActiveSection useFinePointer
  lib/                gsap.ts (register plugins once) lenis.ts
```

---

## 7. Port notes and traps in the original

1. **Dead code**: the file contains CSS/JS for earlier versions that v9 hides or overrides. Do **not** port: `.arch`/`.pillar` (hidden), `.work-feature` + `.project-diagram` (display:none, but `select()` still writes to them), `.visual-code` (hidden, replaced by SVG art), `.strip-num`, `.gn` (hidden, but `.gy` is used), the `.orbit*` styles (About now uses the plate stack), the old `.loader` single-panel styles.
2. **Monkey-patched functions**: `select` and `fillCase` are re-assigned 3×. Consolidate each into one function/state transition (`selectProject(i)` sets state; animations are effects).
3. **Layout depends on viewport mode.** Many `html.paged` rules shrink type using `vh`. Port them as a `data-paged` attribute on `<html>` set by `usePagedMode`, and keep those CSS rules.
4. **SSR/hydration**: if using Next.js, the pointer, matchMedia and `document.fonts` logic must run only in effects.
5. **Fit-to-width name**: needs fonts loaded and re-measure on resize. Use `ResizeObserver`.
6. **Counter text** (`306,000 IMAGES / 34 CLASSES`) counts the first number only. Preserve that.
7. **Stats**: "2027" is static, the other three count up once.
8. **Resize/cleanup**: every listener, ticker and ScrollTrigger must be cleaned up (`useGSAP` scope handles most of it). React StrictMode double-mounts in dev, so effects must be idempotent.
9. **Wheel hijack** needs `{ passive:false }` and must be disabled while the modal or mobile menu is open.
10. Do not invent metrics or claims. The original is deliberately careful ("not a claimed production accuracy metric"). Keep that tone in copy.

---

## 8. Accessibility, performance, quality bars

- `prefers-reduced-motion`: no loader, no wipe, no pointer lens, no particles/beams, no paged mode, static final states. Same content visible.
- No-JS and no-WebGL fallbacks should still show readable content.
- Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`), headings with `aria-label` where text is split into spans (the original sets `aria-label` and hides the split copy with `aria-hidden`).
- Buttons are `<button>`, links are `<a>`, 44 px minimum touch targets, focus-visible ring.
- Animate only `transform`, `opacity`, `clip-path`, `mask` position. Avoid layout thrash in loops. Pause rAF/tickers when the tab is hidden or the section is off-screen.
- One shared WebGL canvas budget, DPR capped at 2, lazy-load the R3F chunk for About (`React.lazy` + `Suspense`).
- Targets: Lighthouse Performance ≥ 90 on desktop, CLS ≈ 0, no console errors, works on latest Chrome, Safari, Firefox and mobile Safari/Chrome.
- Breakpoints to match: 1100, 800, 520 px, and the paged-mode conditions above.

---

## 9. Build plan (do in order, verify each phase against the HTML)

1. Scaffold Vite + React + TS, install deps, self-host fonts, add tokens, global grain/vignette/progress, and port `<head>` meta.
2. Extract all content into `src/content/*`.
3. Static layout of every section (no animation), responsive, matching the HTML at 1440, 1024, 768 and 390 px.
4. Header, mobile menu, active-section tracking, progress bar.
5. Core motion primitives: `Reveal`, `SplitText`, `CountUp`, `DrawSvg`, `MagneticButton`, `Cursor`, Lenis + GSAP wiring.
6. Hero: name fit + lens, dust, beams, skyline, ticker.
7. Work: accordion strip + panel animations + counter.
8. About: skill/plate hover linking, R3F plate stack (with fallback), stats.
9. Journey and Contact.
10. Case-study dialog with clip-path reveal and hash routing.
11. Loader, wipe transition, paged-mode navigation.
12. Reduced-motion pass, a11y pass (keyboard, screen-reader labels), performance pass, cross-browser check.
13. Deploy preview and compare with the original side by side.

---

## 10. Prompt to paste into the agent

```
I'm attaching portfolio_motion_v9.html, the finished design reference for my portfolio, plus PORTFOLIO_REACT_MIGRATION.md.

Rebuild it as a React + TypeScript app (Vite) following the migration brief exactly:
stack, folder structure, content extraction, behaviour spec, and build plan.

Rules:
- Match the HTML visually and behaviourally 1:1. Do not redesign or rewrite copy.
- Port only the final (v9) behaviour; skip the dead code listed in section 7.
- Use GSAP + ScrollTrigger + Lenis for scroll/timeline motion, Motion for UI state animation,
  and React Three Fiber for the About-section 3D plate stack (with a CSS fallback).
- All text content lives in src/content/*.ts so I can edit it later without touching components.
- Honour prefers-reduced-motion, keyboard navigation, native <dialog> a11y and hash deep-links.
- Work phase by phase. After each phase, run the app, compare it with the HTML at
  1440/1024/768/390 px, and list any differences before moving on.
- Use the latest stable versions of all packages and check their current docs rather than relying on memory.

Start with phases 1–3 and show me the result before continuing.
```

---

## 11. Handling later changes

Because content and tokens are separated:
- **Copy/projects/experience changes** → edit `src/content/*.ts` only.
- **Colour/type changes** → `tokens.css`.
- **New project** → add an object to `projects.ts` plus a line-art SVG in `art.ts`. The strip, counter ("01 / 0N") and case-study dialog are data-driven, so make sure the hard-coded "04" in the original becomes `projects.length`.
- **New section** → add a `<Section>` component and an entry in `site.ts` nav items. The wipe label, nav tracking and paged navigation should all derive from that list.
