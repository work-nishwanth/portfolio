import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../content/site';

export function CopyEmailButton() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handleCopy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setStatus('copied');
      timer.current = setTimeout(() => setStatus('idle'), 2200);
    } catch {
      setStatus('failed');
    }
  };

  return (
    <div className="contact-copy">
      <button type="button" className="contact-copy-button label" id="copy-email" onClick={handleCopy} aria-label="Copy email address">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{status === 'copied' ? <path d="m5 12 4 4L19 6" /> : <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4H4v12h4" /></>}</svg>
        {status === 'copied' ? 'COPIED' : 'COPY'}
      </button>
      <span className="contact-copy-status" role="status">{status === 'copied' ? 'Email copied.' : status === 'failed' ? 'Select and copy the email address.' : ''}</span>
    </div>
  );
}
