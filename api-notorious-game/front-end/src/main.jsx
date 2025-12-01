import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login_usuario'
import Home from './pages/home'
import CarrinhoCompra from './pages/carrinho_compra'
import GerenciarVendas from './pages/gerenciar_vendas'
import EditarVenda from './pages/editar_venda'
import CadastrarVenda from './pages/cadastro_venda'
import GerenciarUsuarios from './pages/gerenciar_usuarios'
import CadastroUsuario from './pages/cadastro_usuario'
import EditarUsuarios from './pages/editar_usuario'
import NovoUsuario from './pages/novo_usuario'
import GerenciarJogos from './pages/gerenciar_jogos'
import CadastroJogo from './pages/cadastro_jogo'
import EditarJogo from './pages/editar_jogo'
import CadastroCategoria from './pages/cadastro_categoria'
import GerenciarCategorias from './pages/gerenciar_categorias'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carrinho" element={<CarrinhoCompra />} />
        <Route path="/vendas" element={<GerenciarVendas />} />
        <Route path="/vendas/editar/:id" element={<EditarVenda />} />
        <Route path="/cadastro-venda" element={<CadastrarVenda />} />
        <Route path="/usuarios" element={<GerenciarUsuarios />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/usuario/editar/:id" element={<EditarUsuarios />} />
        <Route path="/novo-usuario" element={<NovoUsuario />} />
        <Route path="/jogos" element={<GerenciarJogos />} />
        <Route path="/jogos/novo" element={<CadastroJogo />} />
        <Route path="/jogos/editar/:id" element={<EditarJogo />} />
        <Route path="/categoria/nova" element={<CadastroCategoria />} />
        <Route path="/categorias" element={<GerenciarCategorias />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
