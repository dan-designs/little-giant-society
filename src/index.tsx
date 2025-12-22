import React from 'react';
import ReactDOM from 'react-dom/client';
import Website from './App';

// Filter out unavoidable 3rd-party warnings to keep the console clean
// This addresses warnings related to:
// 1. Givebutter/iFrameResizer internal deprecations and unmount cleanup race conditions
// 2. Three.js GLTFLoader missing min/max properties in provided 3D assets
const originalWarn = console.warn;
const originalLog = console.log;

const shouldSuppress = (msg: any) => {
  if (typeof msg !== 'string') return false;
  return (
    msg.includes('[iFrameSizer]') || 
    msg.includes('iFrameResizer') ||
    msg.includes('THREE.GLTFLoader: Missing min/max properties')
  );
};

console.warn = (...args: any[]) => {
  if (shouldSuppress(args[0])) return;
  originalWarn.apply(console, args);
};

console.log = (...args: any[]) => {
  if (shouldSuppress(args[0])) return;
  originalLog.apply(console, args);
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Website />
  </React.StrictMode>
);