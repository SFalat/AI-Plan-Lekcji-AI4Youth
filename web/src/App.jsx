import { useState } from 'react';
import Router from './router/Router';
import { Toaster } from 'react-hot-toast';

// Point Eel web socket to the instance
export const eel = window.eel;
eel.set_host('ws://localhost:8080');

// Expose the `sayHelloJS` function to Python as `say_hello_js`
function sayHelloJS(x) {
  console.log('Hello from ' + x);
}
// WARN: must use window.eel to keep parse-able eel.expose{...}
window.eel.expose(sayHelloJS, 'say_hello_js');

// Test anonymous function when minimized. See https://github.com/samuelhwilliams/Eel/issues/363
function show_log(msg) {
  console.log(msg);
}
window.eel.expose(show_log, 'show_log');

// Test calling sayHelloJS, then call the corresponding Python function
sayHelloJS('Javascript World!');
eel.say_hello_py('Javascript World!');

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
