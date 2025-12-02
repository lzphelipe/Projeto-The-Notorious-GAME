import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import api from '../../services/api'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function CadastrarCategoria() {
  const [menuAberto, setMenuAberto] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nomeCategoria: '',
    descricao: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvarCategoria() {
    // Validação simples
    if (!form.nomeCategoria || !form.descricao) {
      alert("Preencha todos os campos!")
      return;
    }

    const token = localStorage.getItem('token')

    try {
      await api.post('/categorias', form, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert("Categoria cadastrada com sucesso!")

      navigate('/categorias')

    } catch (error) {
      console.error("Erro ao cadastrar categoria", error)
      alert("Erro ao cadastrar. Verifique o console.")
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

        {/* O CONTAINER PRETO DIVIDIDO */}
        <div className={`${styles['black-container']} ${styles['cadastro-layout']}`}>

          {/* LADO ESQUERDO: O Formulário */}
          <div className={styles['form-esquerda']}>
            {/* LABEL + INPUT NOME */}
            <div className={styles['input-group']}>
              <label className={styles['label-form']}>Nome da Categoria</label>
              <input
                className={styles['input-box']} // Mudei a classe para ser menos redondo
                placeholder="Ex: RPG de Ação"
                name="nomeCategoria"
                value={form.nomeCategoria}
                onChange={handleChange}
              />
            </div>

            {/* LABEL + TEXTAREA DESCRIÇÃO */}
            <div className={styles['input-group']}>
              <label className={styles['label-form']}>Descrição</label>
              {/* TEXTAREA: Permite quebrar linha automaticamente */}
              <textarea
                className={styles['textarea-box']}
                placeholder="Escreva aqui uma descrição detalhada"
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                rows={5} // Altura inicial
              />
            </div>
          </div>

          {/* O RISCO NO MEIO */}
          <div className={styles['divisor-vertical']}></div>

          {/* LADO DIREITO: Texto e Botões */}
          <div className={styles['form-direita']}>
            <h2>Você deseja salvar essa categoria no banco de dados?</h2>

            <div className={styles['grupo-botoes']}>
              <button
                className={styles['btn-cancelar']}
                onClick={() => navigate('/categorias')}
              >
                Cancelar
              </button>

              <button
                className={styles['btn-salvar']}
                onClick={salvarCategoria}
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

export default CadastrarCategoria