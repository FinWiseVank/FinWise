<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Dashboard } from './components/Dashboard.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
<<<<<<< HEAD
import Login from './pages/login.jsx'
=======
>>>>>>> ba468cbfd0406083d919ab68f8194d0fb745d262
>>>>>>> master

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Login />
     
  </React.StrictMode>,
)
