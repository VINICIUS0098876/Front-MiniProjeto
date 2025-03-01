// src/App.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Cadastro from './pages/cadastro/index'
import Login from './pages/login/index2'
import Home from './pages/home/index3'
import Perfil from './pages/perfil/perfil.jsx'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


