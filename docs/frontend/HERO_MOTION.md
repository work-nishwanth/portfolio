# Landing-page motion

The homepage plays a single entrance sequence on mount: staggered name glyphs, introductory copy, call-to-action links, and a centre-out skyline rise. The final skyline pillars settle after approximately 2.2 seconds; existing ambient motion continues afterward.

Animation rules are scoped to `hero-animated` and gated behind `prefers-reduced-motion: no-preference`. Without motion, all text and controls are immediately visible. Keyboard-focused calls to action skip their entrance animation. The accessible name remains on the heading; decorative glyph spans are hidden from assistive technology through their parent layers.

Mouse movement updates skyline tilt and the name's light position through one requestAnimationFrame callback, without React state updates. Leaving the hero resets the effect; pending frames are cancelled on unmount. Touch and reduced-motion users do not receive this pointer effect.

Implemented in `src/components/hero/Hero.tsx` and `src/styles/hero-motion.css`, without additional dependencies. Verified in light/dark themes at desktop and mobile widths, including navigation, name fitting, pointer reset, and reduced-motion visibility.
