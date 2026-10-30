# Landing-page motion

The homepage plays a single entrance sequence on mount: staggered name glyphs, introductory copy, call-to-action links, and a centre-out skyline rise. The final skyline pillars settle after approximately 2.2 seconds; existing ambient motion continues afterward.

Animation rules are scoped to `hero-animated` and gated behind `prefers-reduced-motion: no-preference`. Without motion, all text and controls are immediately visible. Keyboard-focused calls to action skip their entrance animation. The accessible name remains on the heading; decorative glyph spans are hidden from assistive technology through their parent layers.

Mouse movement updates skyline tilt and the name's light position through one requestAnimationFrame callback, without React state updates. Leaving the hero resets the effect; pending frames are cancelled on unmount. Touch and reduced-motion users do not receive this pointer effect.

Implemented in `src/components/hero/Hero.tsx` and `src/styles/hero-motion.css`, without additional dependencies. Verified in light/dark themes at desktop and mobile widths, including navigation, name fitting, pointer reset, and reduced-motion visibility.

## Hero spacing

The name is capped by both viewport height and a 152px maximum so it leaves breathing room on desktop. The hero keeps one filled primary action; Contact is a quieter text link. The moving technology ticker, repeated pillar labels, and duplicate mobile availability label are omitted. A shorter skyline occupies the bottom of the composition with a verified gap from the copy at phone, tablet, and short laptop sizes. Layout rules are scoped in `src/styles/hero-layout.css`; themes and entrance motion remain shared.
