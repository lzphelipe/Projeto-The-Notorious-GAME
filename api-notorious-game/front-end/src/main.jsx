import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login_usuario'
import CadastroUsuario from './pages/cadastro_usuario'
import Home from './pages/home'
import CarrinhoCompra from './pages/carrinho_compra'

import GerenciarVendas from './pages/gerenciar_vendas'
import CadastrarVenda from './pages/cadastro_venda'
import EditarVenda from './pages/editar_venda'

import GerenciarUsuarios from './pages/gerenciar_usuarios'
import NovoUsuario from './pages/novo_usuario'
import EditarUsuarios from './pages/editar_usuario'

import GerenciarJogos from './pages/gerenciar_jogos'
import CadastroJogo from './pages/cadastro_jogo'
import EditarJogo from './pages/editar_jogo'

import GerenciarCategorias from './pages/gerenciar_categorias'
import CadastroCategoria from './pages/cadastro_categoria'
import EditarCategoria from './pages/editar_categoria'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carrinho" element={<CarrinhoCompra />} />
        
        {/*Gerenciamento de vendas */}
        <Route path="/vendas" element={<GerenciarVendas />} />
        <Route path="/vendas/nova" element={<CadastrarVenda />} />
        <Route path="/vendas/editar/:id" element={<EditarVenda />} />

        {/*Gerenciamento de usuarios */}
        <Route path="/usuarios" element={<GerenciarUsuarios />} />
        <Route path="/usuarios/novo" element={<NovoUsuario />} />
        <Route path="/usuarios/editar/:id" element={<EditarUsuarios />} />
        
        {/*Gerenciamento de jogos */}
        <Route path="/jogos" element={<GerenciarJogos />} />
        <Route path="/jogos/novo" element={<CadastroJogo />} />
        <Route path="/jogos/editar/:id" element={<EditarJogo />} />

        {/*Gerenciamento de categorias */}
        <Route path="/categorias" element={<GerenciarCategorias />} />
        <Route path="/categorias/nova" element={<CadastroCategoria />} />
        <Route path="/categorias/editar/:id" element={<EditarCategoria />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
