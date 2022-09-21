import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

// Point Eel web socket to the instance
export const eel = window.eel
eel.set_host( 'ws://localhost:8080' )

// Expose the `sayHelloJS` function to Python as `say_hello_js`
function sayHelloJS( x ) {
  console.log( 'Hello from ' + x )
}
// WARN: must use window.eel to keep parse-able eel.expose{...}
window.eel.expose( sayHelloJS, 'say_hello_js' )

// Test anonymous function when minimized. See https://github.com/samuelhwilliams/Eel/issues/363
function show_log(msg) {
  console.log(msg)
}
window.eel.expose(show_log, 'show_log')

// Test calling sayHelloJS, then call the corresponding Python function
sayHelloJS( 'Javascript World!' )
eel.say_hello_py( 'Javascript World!' )

// Set the default path. Would be a text input, but this is a basic example after all
const defPath = '~'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const sendToPython = () => {
    eel.say_hello_py(inputValue)
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <input type="text" defaultValue={inputValue} onChange={e => {setInputValue(e.target.value)}} />
        <button onClick={sendToPython}>
          Send to python
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
