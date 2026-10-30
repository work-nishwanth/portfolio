import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';
const eventName = 'portfolio-theme-change';
const getTheme = (): Theme => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f3ee' : '#050505');
  try { localStorage.setItem('portfolio-theme', theme); } catch { /* Keep the theme for this session. */ }
  window.dispatchEvent(new Event(eventName));
}
function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === 'portfolio-theme' && (event.newValue === 'light' || event.newValue === 'dark')) {
      document.documentElement.dataset.theme = event.newValue;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', event.newValue === 'light' ? '#f5f3ee' : '#050505');
      onChange();
    }
  };
  window.addEventListener(eventName, onChange);
  window.addEventListener('storage', onStorage);
  return () => { window.removeEventListener(eventName, onChange); window.removeEventListener('storage', onStorage); };
}
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark' as Theme);
  return { theme, toggleTheme: () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark') };
}
