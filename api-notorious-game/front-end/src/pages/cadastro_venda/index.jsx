import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import api from '../../services/api'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Carrinho from '../../assets/carrinho-de-compras.png'

function CadastrarVenda() {
  const [menuAberto, setMenuAberto] = useState(false)
  const navigate = useNavigate()

  // Estado para o ID do Usuário
  const [idUsuario, setIdUsuario] = useState('')

  // Estado para a lista de produtos (array de objetos {idJogo: 1})
  const [produtos, setProdutos] = useState([])

  // Estado temporário para o input de adicionar jogo
  const [novoIdJogo, setNovoIdJogo] = useState('')

  // Adiciona um jogo na lista visual
  function adicionarJogo() {
    if (!novoIdJogo) return;

    // Adiciona ao array mantendo o formato que o JSON pede
    setProdutos([...produtos, { idJogo: Number(novoIdJogo) }])
    setNovoIdJogo('') // Limpa o input
  }

  // Remove um jogo da lista visual
  function removerJogo(indexParaRemover) {
    const novaLista = produtos.filter((_, index) => index !== indexParaRemover)
    setProdutos(novaLista)
  }

  async function salvarVenda() {
    // Validação básica
    if (!idUsuario || produtos.length === 0) {
      alert("Preencha o ID do Usuário e adicione pelo menos um jogo!")
      return
    }

    const token = localStorage.getItem('token')

    // Monta o objeto final igual ao seu print do JSON
    const objetoParaEnviar = {
      idUsuario: Number(idUsuario),
      produtos: produtos
    }

    try {
      await api.post('/vendas', objetoParaEnviar, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert("Venda cadastrada com sucesso!")
      navigate('/vendas') // Volta para a lista de vendas

    } catch (error) {
      console.error("Erro ao cadastrar venda", error)
      alert("Erro ao cadastrar. Verifique os IDs informados.")
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

      <main className={styles['main-content']}>

        <div className={styles['black-container']}>

          {/* LADO ESQUERDO: Formulário de Venda */}
          <div className={styles['form-esquerda']}>

            {/* ID DO USUÁRIO */}
            <label className={styles['label-form']}>ID do Cliente (Usuário)</label>
            <input
              className={styles['input-padrao']}
              placeholder="Ex: 5"
              type="number"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
            />

            {/* ÁREA DE ADICIONAR JOGOS */}
            <label className={styles['label-form']}>Adicionar Jogos (ID)</label>

            <div className={styles['add-jogo-wrapper']}>
              <input
                className={styles['input-mini']}
                placeholder="ID Jogo"
                type="number"
                value={novoIdJogo}
                onChange={(e) => setNovoIdJogo(e.target.value)}
              />
              <button
                type="button"
                className={styles['btn-add-mini']}
                onClick={adicionarJogo}
              >
                +
              </button>
            </div>

            {/* LISTA VISUAL DOS JOGOS ADICIONADOS */}
            <div className={styles['lista-chips']}>
              {produtos.length === 0 && <span style={{ color: '#666', fontStyle: 'italic' }}>Nenhum jogo adicionado</span>}

              {produtos.map((prod, index) => (
                <div key={index} className={styles['chip-jogo']}>
                  <span>ID: {prod.idJogo}</span>
                  <button onClick={() => removerJogo(index)} className={styles['btn-remove-chip']}>x</button>
                </div>
              ))}
            </div>

          </div>

          {/* RISCO NO MEIO */}
          <div className={styles['divisor-vertical']}></div>

          {/* LADO DIREITO: Confirmação */}
          <div className={styles['form-direita']}>
            <h2>Deseja finalizar o cadastro desta venda?</h2>

            <div className={styles['grupo-botoes']}>
              <button
                className={styles['btn-cancelar']}
                onClick={() => navigate('/vendas')}
              >
                Cancelar
              </button>

              <button
                className={styles['btn-salvar']}
                onClick={salvarVenda}
              >
                Cadastrar
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}

export default CadastrarVenda