import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './style.css'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Carrinho from '../../assets/carrinho-de-compras.png'

function Home() {

  const [jogos, setJogos] = useState([]) // Lista completa que veio do banco
  const [busca, setBusca] = useState('') // O que o usuário está digitando
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const perfilSalvo = localStorage.getItem('perfil');
    if (perfilSalvo === 'ADMIN') {
      setIsAdmin(true);
    }

    async function loadJogos() {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/jogos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setJogos(response.data)
      } catch (error) {
        console.error("Erro ao buscar jogos", error)
        if (error.response && error.response.status === 403) {
          alert("Sessão expirada!")
          localStorage.removeItem('token')
          navigate('/')
        }
      }
    }
    loadJogos()
  }, [])

  function fazerLogin() {
    localStorage.removeItem('token')
    navigate('/')
  }

  function fazerLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  // 3. FILTRO (Ajustado para o nome que vem do Java: 'nomeJogo')
  const jogosFiltrados = jogos.filter(jogo =>
    jogo.nomeJogo.toLowerCase().includes(busca.toLowerCase())
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

        {/* BARRA SUPERIOR */}
        <header className="top-bar">
          <button className="logo-area">
            <img src={LogoImg} alt="Logo Notorious" className="logo-img" />
          </button>

          <div className="top-icons">
            <button className='btn-icone'>
              <img src={Carrinho} alt="Carrinho" className="icone-img" />
            </button>

            {/* Adicionei o Logout no clique do Perfil */}
            <button className='btn-icone' onClick={fazerLogout} title="Sair / Logout">
              <img src={Perfil} alt="Perfil" className="icone-img" />
            </button>
          </div>
        </header>

        <div className="main-body">

          {/* CONTEÚDO PRINCIPAL */}
          <main className={isAdmin ? "content" : "content full-width"}>
            <div className="header-conteudo">
              <input
                type="text"
                placeholder="Pesquisar jogo..."
                className="barra-pesquisa"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>


            {/* AQUI É ONDE MOSTRAMOS OS JOGOS DE VERDADE */}
            <div className="grade-jogos">
              {jogosFiltrados.map(jogo => (
                <div key={jogo.idJogo} className="card-jogo">
                  {/* Imagem vinda do link do banco */}
                  <img src={jogo.urlImagem} alt={jogo.nomeJogo} className="img-jogo" />

                  <div className="info-jogo">
                    <h3>{jogo.nomeJogo}</h3>
                    <p className="categoria">{jogo.categoria.nomeCategoria}</p>
                    <p className="preco">R$ {jogo.precoJogo.toFixed(2)}</p>
                    <button className="btn-comprar">Comprar</button>
                  </div>
                </div>
              ))}
            </div>

          </main>

          {/* BARRA LATERAL */}
          {isAdmin && (
            <aside className="right-sidebar">
              <h3>Painel Admin</h3>
              <button
                className="empty-btn"
                onClick={() => navigate('/vendas')}
              >
                Gerenciar Vendas
              </button>
              <button
                className="empty-btn"
                onClick={() => navigate('/usuarios')}
              >
                Gerenciar Usuários
              </button>
              <button
                className="empty-btn"
                onClick={() => navigate('/jogos')}
              >
                Gerenciar Jogos
              </button>
            </aside>
          )}

        </div>
      </div>
    </div>
  )
}

export default Home