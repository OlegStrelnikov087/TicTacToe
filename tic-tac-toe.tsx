import { App } from '@app/app';
import React from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
