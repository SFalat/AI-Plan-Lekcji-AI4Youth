import { useState } from 'react';
import Router from './router/Router';
import { Toaster } from 'react-hot-toast';

// Point Eel web socket to the instance
export const eel = window.eel;
eel.set_host('ws://localhost:8080');

// Test anonymous function when minimized. See https://github.com/samuelhwilliams/Eel/issues/363
function show_log(msg) {
  console.log(msg);
}
window.eel.expose(show_log, 'show_log');

const toasterAttributes = {
  position: 'bottom-right',
  toastOptions: {
    style: {
      background: 'hsl(202, 15%, 15%)',
      color: '#fff',
      boxShadow: '0px 0px 1rem rgba(0, 0, 0, 0.25)',
    },
  },
};

function App() {
  return (
    <div className="App">
      <Router />
      <Toaster {...toasterAttributes} />
    </div>
  );
}

export default App;
