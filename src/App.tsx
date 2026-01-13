import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Counter } from './features/counter/Counter'
import './App.css'

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-primary'>Asia Unlocked</h1>
        <p>Welcome to this Vite + React + TypeScript + Redux + React Router app!</p>
        <nav>
          <Link to="/counter" className="App-link">
            Go to Counter Page
          </Link>
        </nav>
      </header>
    </div>
  )
}

function CounterPage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-primary'>Counter Example</h1>
        <Counter />
        <nav>
          <Link to="/" className="App-link">
            Back to Home
          </Link>
        </nav>
      </header>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<CounterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
