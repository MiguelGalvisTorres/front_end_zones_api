import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Datos from './Datos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Datos />
  </StrictMode>,
)
