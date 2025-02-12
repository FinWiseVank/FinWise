import React from 'react'
import ReactDOM from 'react-dom/client'
import { Dashboard } from './components/Dashboard.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Login />
     
  </React.StrictMode>,
)
