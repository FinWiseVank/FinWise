import React from 'react'
import ReactDOM from 'react-dom/client'
import { Dashboard } from './components/Dashboard.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inicio" element={<div>Inicio</div>} />
        <Route path="/planificador" element={<div>Planificador</div>} />
        <Route path="/añadir-Metas" element={<div>Añadir Metas</div>} />
        <Route path="/añadir-Recordatorios" element={<div>Añadir Recordatorios</div>} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
