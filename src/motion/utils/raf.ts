/**
 * RAF (RequestAnimationFrame) utilities for batched, performant updates
 */

type RafCallback = (time: number) => void;

let rafId: number | null = null;
const callbacks = new Set<RafCallback>();

/**
 * Schedule a callback to run on the next animation frame.
 * Multiple calls within the same frame are batched.
 */
export function scheduleRaf(callback: RafCallback): void {
  callbacks.add(callback);
  if (rafId === null) {
    rafId = requestAnimationFrame(flush);
  }
}

/**
 * Cancel a scheduled RAF callback.
 */
export function cancelRaf(callback: RafCallback): void {
  callbacks.delete(callback);
  if (callbacks.size === 0 && rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function flush(time: number): void {
  rafId = null;
  const toCall = Array.from(callbacks);
  callbacks.clear();
  toCall.forEach((cb) => cb(time));
}

/**
 * Throttle a function to run at most once per animation frame.
 * Returns a function that, when called, schedules the original fn for the next frame.
 */
export function rafThrottle<T extends (...args: unknown[]) => void>(fn: T): T {
  let scheduled = false;
  let lastArgs: unknown[] | null = null;

  const throttled = ((...args: unknown[]) => {
    lastArgs = args;
    if (!scheduled) {
      scheduled = true;
      scheduleRaf(() => {
        scheduled = false;
        if (lastArgs) {
          fn(...lastArgs);
        }
      });
    }
  }) as T;

  return throttled;
}

/**
 * Debounce a function using RAF - runs after the specified number of frames
 * have passed without new calls.
 */
export function rafDebounce<T extends (...args: unknown[]) => void>(
  fn: T,
  frames = 1
): T {
  let frameCount = 0;
  let lastArgs: unknown[] | null = null;

  const debounced = ((...args: unknown[]) => {
    lastArgs = args;
    frameCount = frames;

    const tick = () => {
      frameCount--;
      if (frameCount > 0) {
        scheduleRaf(tick);
      } else if (lastArgs) {
        fn(...lastArgs);
      }
    };

    if (frameCount === frames) {
      scheduleRaf(tick);
    }
  }) as T;

  return debounced;
}

/**
 * Create a batched updater for CSS custom properties.
 * Updates are applied in a single RAF callback.
 */
export function createBatchedStyleUpdater(element: HTMLElement) {
  const updates = new Map<string, string>();

  const apply = () => {
    updates.forEach((value, property) => {
      element.style.setProperty(property, value);
    });
    updates.clear();
  };

  return {
    setProperty(property: string, value: string) {
      updates.set(property, value);
      if (updates.size === 1) {
        scheduleRaf(apply);
      }
    },
    flush: apply,
  };
}