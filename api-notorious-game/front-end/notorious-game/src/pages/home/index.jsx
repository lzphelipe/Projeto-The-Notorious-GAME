import { useState, useEffect } from 'react'
import './style.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Carrinho from '../../assets/carrinho-de-compras.png'

function Home() {

  const [jogos, setJogos] = useState([]) // Lista completa que veio do banco
  const [busca, setBusca] = useState('') // O que o usuário está digitando

  // A MÁGICA ACONTECE AQUI:
  // Criamos uma nova lista filtrada baseada no que foi digitado
  const jogosFiltrados = jogos.filter(jogo =>
    jogo.nome.toLowerCase().includes(busca.toLowerCase())
  )

  function BotaoLateral({ texto }) {
    return (
      <div className="empty-btn">
        {texto}
      </div>
    )
  }

  return (
    <div className="layout-container pagina-branca">
      <div className="layout-container">

        {/* 1. BARRA SUPERIOR (Corta tudo lá em cima) */}
        <header className="top-bar">
          {/* Lado Esquerdo (Pode deixar vazio ou por o nome do site) */}
          <button className="logo-area">
            <img src={LogoImg} alt="Logo Notorious" className="logo-img" />
          </button>

          {/* Lado Direito (Ícones pedidos) */}
          <div className="top-icons">
            <button className='btn-icone'> <img src={Carrinho} alt="Carrinho" className="icone-img" /> </button>
            <button className='btn-icone'> <img src={Perfil} alt="Perfil" className="icone-img" /> </button>
          </div>
        </header>

        {/* 2. CORPO DO SITE (Fica embaixo da barra superior) */}
        <div className="main-body">

          {/* A. Conteúdo Principal (Ocupa o espaço que sobrar) */}
          <main className="content">
            <div className="header-conteudo">

              {/* A BARRA DE PESQUISA */}
              <input
                type="text"
                placeholder="Pesquisar jogo..."
                className="barra-pesquisa"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </main>

          {/* B. BARRA LATERAL DIREITA */}
          <aside className="right-sidebar">
            <BotaoLateral texto="Gerenciar Vendas" />
            <BotaoLateral texto="Catálogo de Jogos" />
            <BotaoLateral texto="Gerenciar Usuários" />
          </aside>

        </div>
      </div>
    </div>
  )
}

export default Home