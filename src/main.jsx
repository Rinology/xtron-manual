import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GuideProvider } from './context/GuideContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GuideProvider>
      <App />
    </GuideProvider>
  </React.StrictMode>,
)
