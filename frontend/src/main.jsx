import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import AppRoutes from './routes/AppRoutes'
import { GlobalProvider } from './context/GlobalContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
        <AppRoutes />
    </GlobalProvider>
  </StrictMode>,
)
