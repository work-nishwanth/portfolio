# Case-study design reference

Reference inspected on 2026-10-30: `https://yarranishwanth.tech/case-study/twiller`.

The full-screen case-study view follows the reference's sticky header, back control and breadcrumbs, quick-switch tabs, Playfair Display title, italic headline, source/live actions, four fact cards, pipeline panel, full-width project preview, technology pills, two-column narrative rows, previous/next navigation, exploration cards, and floating navigation dock.

Inter, Outfit, and Playfair Display are self-hosted in `public/fonts/`, with their OFL licenses. Styling is scoped to `case-editorial` so the homepage and projects page retain their existing typography and layout. Metrics for the three published case studies are stored in `src/content/caseStudyFacts.ts`; other projects use descriptive facts rather than invented performance numbers.

The existing case hashes and native dialog remain in use. Quick-switch and previous/next controls update the case hash, reset reading position, and preserve browser history. Initial focus moves to the title, keyboard Escape closes the view, and focus returns to the triggering project. Body scrolling is locked while open. Theme state is shared with the main header, persisted, and synchronized across tabs. Reduced motion removes transitions and smooth reading scroll.

Real project screenshots and all imported narrative sections are preserved. Mobile layouts stack the narrative rows and fact cards and keep navigation accessible without horizontal overflow.
