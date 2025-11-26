import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CadastroUsuario from './pages/login_usuario'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CadastroUsuario />
  </StrictMode>,
)
