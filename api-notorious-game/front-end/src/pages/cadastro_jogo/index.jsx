import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import api from '../../services/api'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function CadastrarJogo() {
  const navigate = useNavigate()
  const [menuAberto, setMenuAberto] = useState(false)

  const [form, setForm] = useState({
    nomeJogo: '',
    nomeCategoria: '',
    desenvolvedoraJogo: '',
    precoJogo: '',
    urlImagem: ''
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvarJogo() {
    if (!form.nomeJogo || !form.precoJogo) {
      alert("Preencha pelo menos o Nome e o Preço!")
      return
    }

    const token = localStorage.getItem('token')
    const precoFormatado = form.precoJogo.toString().replace(',', '.')
    const objetoParaEnviar = {
      ...form,
      precoJogo: parseFloat(precoFormatado)
    }

    try {
      await api.post('/jogos', objetoParaEnviar, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert("Jogo cadastrado com sucesso!")
      navigate('/jogos')

    } catch (error) {
      console.error("Erro ao cadastrar jogo", error)
      alert("Erro ao cadastrar. Verifique os dados.")
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

          <div className={styles['form-esquerda']}>

            <label className={styles['label-form']}>Nome do Jogo</label>
            <input
              className={styles['input-nome']}
              placeholder="Ex: God of War"
              name="nomeJogo"
              value={form.nomeJogo}
              onChange={handleChange}
            />

            <div className={styles['linha-dupla']}>
              <div style={{ width: '100%' }}>
                <label className={styles['label-form']}>Categoria</label>
                <input
                  className={styles['input-medio']}
                  placeholder="Ex: Ação"
                  name="nomeCategoria"
                  value={form.nomeCategoria}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: '100%' }}>
                <label className={styles['label-form']}>Desenvolvedora</label>
                <input
                  className={styles['input-medio']}
                  placeholder="Ex: Santa Monica"
                  name="desenvolvedoraJogo"
                  value={form.desenvolvedoraJogo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <label className={styles['label-form']}>Preço (R$)</label>
            <input
              className={styles['input-preco']}
              placeholder="0.00"
              name="precoJogo"
              value={form.precoJogo}
              onChange={handleChange}
            />

            {/* IMAGEM */}
            <label className={styles['label-form']}>URL da Imagem</label>
            <input
              className={styles['input-padrao']}
              placeholder="https://..."
              name="urlImagem"
              value={form.urlImagem}
              onChange={handleChange}
            />
          </div>

          <div className={styles['divisor-vertical']}></div>

          <div className={styles['form-direita']}>
            <h2>Você deseja salvar esse jogo no banco de dados?</h2>

            <div className={styles['grupo-botoes']}>
              <button
                className={styles['btn-cancelar']}
                onClick={() => navigate('/jogos')}
              >
                Cancelar
              </button>

              <button
                className={styles['btn-salvar']}
                onClick={salvarJogo}
              >
                Salvar
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}

export default CadastrarJogo