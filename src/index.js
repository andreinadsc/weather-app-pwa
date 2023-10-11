import React from 'react';
import ReactDOM from 'react-dom/client';
import { register as registerServiceWorker } from './serviceWorkerRegistration';
import WeatherProvider from './context/WeatherProvider';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WeatherProvider>
      <App />
    </WeatherProvider>
);

registerServiceWorker();