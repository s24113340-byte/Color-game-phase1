import React from 'react'
import { createRoot } from 'react-dom/client'
import ColorGameRoyale from '../app/ColorGameRoyale'
import './styles.css'

const root = createRoot(document.getElementById('root')!)
console.log('main.tsx loaded')
// Global error handlers to surface runtime issues as a visible overlay
function showFatalError(message: string) {
  try {
    const existing = document.getElementById('fatal-error-overlay');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.id = 'fatal-error-overlay';
    el.style.position = 'fixed';
    el.style.zIndex = '99999';
    el.style.left = '0';
    el.style.top = '0';
    el.style.right = '0';
    el.style.bottom = '0';
    el.style.background = 'rgba(0,0,0,0.85)';
    el.style.color = 'white';
    el.style.padding = '24px';
    el.style.fontFamily = 'monospace';
    el.innerText = `Fatal error:\n\n${message}`;
    document.body.appendChild(el);
  } catch (e) {
    // ignore
  }
}

window.addEventListener('error', (ev) => {
  console.error('Uncaught error', ev.error || ev.message, ev);
  showFatalError(String(ev.error || ev.message));
});

window.addEventListener('unhandledrejection', (ev) => {
  console.error('Unhandled rejection', ev.reason);
  showFatalError(String(ev.reason));
});

try {
  root.render(
    <React.StrictMode>
      <ColorGameRoyale />
    </React.StrictMode>
  );
} catch (err) {
  console.error('Render failed', err);
  showFatalError(String(err));
}
