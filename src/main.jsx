
import App from './App.jsx'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Dashboard } from './components/Dashboard.jsx'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Dashboard />
    </Router>
    <App />
  </React.StrictMode>,
)
