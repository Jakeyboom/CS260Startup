import React from 'react';
import ReactDom from 'react-dom/client';
import App from './src/app';

const webApp = ReactDom.createRoot(document.getElementById('web-app'));
webApp.render(<App />);