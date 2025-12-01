import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login_usuario'
import Home from './pages/home'
import GerenciarVendas from './pages/gerenciar_vendas'
import GerenciarUsuarios from './pages/gerenciar_usuarios'
import GerenciarJogos from './pages/gerenciar_jogos'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vendas" element={<GerenciarVendas />} />
        <Route path="/usuarios" element={<GerenciarUsuarios />} />
        <Route path="/jogos" element={<GerenciarJogos />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
