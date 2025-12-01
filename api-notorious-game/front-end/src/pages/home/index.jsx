import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

import styles from './style.module.css'

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
    // Removi a div duplicada, deixei só uma com a classe container
    <div className={styles['layout-container']}>

      {/* BARRA SUPERIOR */}
      <header className={styles['top-bar']}>
        {/* Mudei de button para div para evitar bugs de layout na logo */}
        <div className={styles['logo-area']} onClick={() => navigate('/home')}>
          <img src={LogoImg} alt="Logo Notorious" className={styles['logo-img']} />
        </div>

        <div className={styles['top-icons']}>
          <button className={styles['btn-icone']}>
            <img src={Carrinho} alt="Carrinho" className={styles['icone-img']} />
          </button>

          <button className={styles['btn-icone']} onClick={fazerLogout} title="Sair">
            <img src={Perfil} alt="Perfil" className={styles['icone-img']} />
          </button>
        </div>
      </header>

      <div className={styles['main-body']}>

        {/* CONTEÚDO PRINCIPAL 
            Lógica: Se NÃO for admin, adiciona a classe full-width para ocupar 100%
        */}
        <main className={`${styles['content']} ${!isAdmin ? styles['full-width'] : ''}`}>

          <div className={styles['header-conteudo']}>
            <input
              type="text"
              placeholder="Pesquisar jogo..."
              className={styles['barra-pesquisa']}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className={styles['grade-jogos']}>
            {jogosFiltrados.map(jogo => (
              <div key={jogo.idJogo} className={styles['card-jogo']}>

                <img src={jogo.urlImagem} alt={jogo.nomeJogo} className={styles['img-jogo']} />

                <div className={styles['info-jogo']}>
                  <h3>{jogo.nomeJogo}</h3>
                  <p className={styles['categoria']}>{jogo.categoria.nomeCategoria}</p>
                  <p className={styles['preco']}>R$ {jogo.precoJogo.toFixed(2)}</p>
                  <button className={styles['btn-comprar']}>Comprar</button>
                </div>
              </div>
            ))}
          </div>

        </main>

        {/* BARRA LATERAL (Só aparece se for Admin) */}
        {isAdmin && (
          <aside className={styles['right-sidebar']}>
            <h3>Painel Admin</h3>
            <button
              className={styles['empty-btn']}
              onClick={() => navigate('/vendas')}
            >
              Gerenciar Vendas
            </button>
            <button
              className={styles['empty-btn']}
              onClick={() => navigate('/usuarios')}
            >
              Gerenciar Usuários
            </button>
            <button
              className={styles['empty-btn']}
              onClick={() => navigate('/jogos')}
            >
              Gerenciar Jogos
            </button>
          </aside>
        )}
      </div>
    </div>
  )
}

export default Home