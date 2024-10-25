import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BasketProvider } from './Components/Context/BasketProvider.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BasketProvider>
      <App />
    </BasketProvider>
  </StrictMode>,
)
