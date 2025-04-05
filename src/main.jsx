import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios';

//ruta base de backend
axios.defaults.baseURL = 'https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <React.StrictMode>
      
      <App />
      
    </React.StrictMode>
    <ToastContainer/>
  </>
)
