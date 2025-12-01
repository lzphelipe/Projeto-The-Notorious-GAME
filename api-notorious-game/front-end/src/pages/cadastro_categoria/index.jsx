import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import styles from './style.module.css' 
import api from '../../services/api' 

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function CadastrarCategoria() {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    nomeCategoria: '',
    descricao: ''
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvarCategoria() {
    // Validação simples
    if (!form.nomeCategoria || !form.descricao) {
      alert("Preencha todos os campos!")
      return
    }

    const token = localStorage.getItem('token')

    try {
      // Envia para o Back-end
      await api.post('/categorias', form, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert("Categoria cadastrada com sucesso!")
      
      // Redireciona de volta para a tela de Gerenciar Jogos
      navigate('/jogos') 

    } catch (error) {
      console.error("Erro ao cadastrar categoria", error)
      alert("Erro ao cadastrar. Verifique o console.")
    }
  }

  return (
    <div className={styles['layout-admin']}>
      
      {/* HEADER */}
      <header className={styles['top-bar']}>
        <div className={styles['logo-area']} onClick={() => navigate('/home')}> 
            <img src={LogoImg} alt="Logo Notorious" className={styles['logo-img']} /> 
        </div>
        <div className={styles['top-icons']}>
          <button className={styles['btn-icone']} onClick={() => navigate('/')}> <img src={Perfil} className={styles['icone-img']} /> </button>
        </div>
      </header>

      <main className={styles['main-content']}>
        
        {/* O CONTAINER PRETO DIVIDIDO */}
        <div className={`${styles['black-container']} ${styles['cadastro-layout']}`}>
           
           {/* LADO ESQUERDO: O Formulário */}
           <div className={styles['form-esquerda']}>
              <label className={styles['label-form']}>Nome da Categoria</label>
              <input 
                className={styles['input-nome']} 
                placeholder="Nome" 
                name="nomeCategoria" 
                value={form.nomeCategoria} 
                onChange={handleChange} 
              />

              <label className={styles['label-form']}>Descrição</label>
              <input 
                className={styles['input-padrao']} 
                placeholder="Descrição" 
                name="descricao" 
                value={form.descricao} 
                onChange={handleChange} 
              />
           </div>

           {/* O RISCO NO MEIO */}
           <div className={styles['divisor-vertical']}></div>

           {/* LADO DIREITO: Texto e Botões */}
           <div className={styles['form-direita']}>
              <h2>Você deseja salvar essa categoria no banco de dados?</h2>
              
              <div className={styles['grupo-botoes']}>
                 <button 
                    className={styles['btn-cancelar']}
                    onClick={() => navigate('/jogos')} // Cancela e volta
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