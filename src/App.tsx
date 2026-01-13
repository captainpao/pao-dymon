import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './views/Home'
import { CounterPage } from './views/sandbox/CounterPage'
import { ResponsiveGrid } from './views/sandbox/ResponsiveGrid'
import { IconsSearch } from './views/sandbox/IconsSearch'
import { DataVisualisation } from './views/sandbox/DataVisualisation'
import { SamplePage } from './views/sandbox/SamplePage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/responsive-grid" element={<ResponsiveGrid />} />
        <Route path="/icons-search" element={<IconsSearch />} />
        <Route path="/data-visualisation" element={<DataVisualisation />} />
        <Route path="/sample-page" element={<SamplePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
