import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import ModulePage from './pages/ModulePage.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/module/:moduleId" element={<ModulePage />} />
      </Routes>
    </>
  )
}
