import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';
import React from 'react';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    "Failed to find the root element. Did you forget to add a div with id 'root' to your HTML?",
  );
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
