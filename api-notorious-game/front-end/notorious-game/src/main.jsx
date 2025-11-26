import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CadastroUsuario from './pages/cadastro_usuario'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CadastroUsuario />
  </StrictMode>,
)
