import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import api from '../../services/api'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Lixo from '../../assets/lixo.png'
import Lapis from '../../assets/lapis.png'

function GerenciarJogos() {
  const navigate = useNavigate()
  const [jogos, setJogos] = useState([])
  const [menuAberto, setMenuAberto] = useState(false)

  // Função para buscar jogos do Banco de Dados
  async function carregarJogos() {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get('/jogos', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setJogos(response.data)
    } catch (error) {
      console.error("Erro ao buscar jogos", error)
      alert("Erro ao carregar lista de jogos.")
    }
  }

  // Carrega assim que a tela abre
  useEffect(() => {
    carregarJogos()
  }, [])

  // Função de Excluir
  async function handleDelete(idJogo) {
    if (confirm("Tem certeza que deseja excluir este jogo?")) {
      const token = localStorage.getItem('token');
      try {
        await api.delete(`/jogos/${idJogo}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert("Jogo excluído com sucesso!")
        carregarJogos()
      } catch (error) {
        alert("Erro ao excluir jogo.")
      }
    }
  }
  // FUNÇÃO PARA SAIR DA CONTA
  function fazerLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className={styles['layout-admin']}>

      {/* HEADER */}
      <header className={styles['top-bar']}>
        <button className={styles['logo-area']} onClick={() => navigate('/home')}>
          <img src={LogoImg} alt="Logo" className={styles['logo-img']} />
        </button>
        <div className={styles['top-icons']}>

          {/* --- AQUI MUDA: Botão de Perfil com Menu --- */}
          <div className={styles['perfil-container']}>

            {/* O Botão agora só abre/fecha o menu, não faz logout direto */}
            <button
              className={styles['btn-icone']}
              onClick={() => setMenuAberto(!menuAberto)}
              title="Perfil"
            >
              <img src={Perfil} alt="Perfil" className={styles['icone-img']} />
            </button>

            {/* O Menu Pop-up (Só aparece se menuAberto for true) */}
            {menuAberto && (
              <div className={styles['dropdown-menu']}>
                {/* Aqui sim fica o botão de sair */}
                <button onClick={fazerLogout} className={styles['btn-sair']}>
                  Sair
                </button>
              </div>
            )}

          </div>

        </div>
      </header>

      {/* BOTOES TOPO (Com navegação) */}
      <div className={styles['container-botoes-topo']}>
        {/* Esquerda */}
        <button
          className={styles['btn-adicionar-jogo']}
          onClick={() => navigate('/jogos/novo')}
        >
          Adicionar Jogo
        </button>

        {/* Direita */}
        <button
          className={styles['btn-adicionar-categoria']}
          onClick={() => navigate('/categorias')}
        >
          Categorias
        </button>
      </div>

      {/* ÁREA DE CONTEÚDO */}
      <main className={styles['main-content']}>

        {/* LISTA DE JOGOS */}
        <div className={styles['black-container']}>

          {jogos.map(jogo => (
            <div key={jogo.idJogo} className={styles['card-cinza']}>
              <img
                src={jogo.urlImagem ? jogo.urlImagem : "https://placehold.co/100"}
                alt={jogo.nomeJogo}
                className={styles['img-jogo']}
              />

              <div className={styles['info-jogo']}>
                <h3>{jogo.nomeJogo}</h3>
                <p className={styles['preco']}>
                  R$ {Number(jogo.precoJogo).toFixed(2).replace('.', ',')}
                </p>
              </div>

              <div className={styles['acoes-jogo']}>
                <button
                  className={styles['btn-acao']}
                  onClick={() => navigate(`/jogos/editar/${jogo.idJogo}`)}
                >
                  <img src={Lapis} alt="Editar" className={styles['icone-acao']} />
                </button>
                <button
                  className={styles['btn-acao']}
                  onClick={() => handleDelete(jogo.idJogo)}
                >
                  <img src={Lixo} alt="Excluir" className={styles['icone-acao']} />
                </button>

              </div>

            </div>
          ))}

        </div>

      </main>
    </div>
  )
}

export default GerenciarJogos