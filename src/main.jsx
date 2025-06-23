import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Make sure this path is correct
import './index.css' // Assuming you have a basic CSS file for Tailwind or global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)