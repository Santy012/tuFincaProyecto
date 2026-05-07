import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import AppRoutes from './routes/AppRoutes'
import { GlobalProvider } from './context/GlobalContext'
import ReactGA from 'react-ga4'

ReactGA.initialize('G-TY2WF9J7KV')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
        <AppRoutes />
    </GlobalProvider>
  </StrictMode>,
)
