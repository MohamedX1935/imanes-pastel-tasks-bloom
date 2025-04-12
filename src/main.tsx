
import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';
import App from './App.tsx';
import './index.css';

// Wait for the device to be ready before rendering when on a native platform
const initialize = async () => {
  if (Capacitor.isNativePlatform()) {
    // Initialize any Capacitor plugins here if needed
    console.log('Running on native platform:', Capacitor.getPlatform());
  }

  createRoot(document.getElementById("root")!).render(<App />);
};

initialize();
