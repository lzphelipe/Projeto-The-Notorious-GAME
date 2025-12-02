import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './style.module.css' 
import api from '../../services/api'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function EditarJogo() {
  const navigate = useNavigate()
  const { id } = useParams() 
  
  const [form, setForm] = useState({
    nomeJogo: '',
    nomeCategoria: '',
    desenvolvedoraJogo: '',
    precoJogo: '',
    urlImagem: '' 
  })

  // 1. CARREGAR DADOS (COM PROTEÇÃO CONTRA ERROS)
  useEffect(() => {
    async function carregarDados() {
      const token = localStorage.getItem('token')
      try {
        const response = await api.get(`/jogos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        const dados = response.data;

        setForm({
          nomeJogo: dados.nomeJogo || '',
          
          nomeCategoria: dados.categoria?.nomeCategoria || dados.nomeCategoria || '', 
          
          desenvolvedoraJogo: dados.desenvolvedoraJogo || '',
          precoJogo: dados.precoJogo || '',
          urlImagem: dados.urlImagem || ''
        })

      } catch (error) {
        console.error("Erro ao buscar jogo", error)
        alert("Erro ao carregar dados do jogo.")
        navigate('/jogos') 
      }
    }
    carregarDados()
  }, [id, navigate])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 2. SALVAR (PUT)
  async function editarJogo() {
    if (!form.nomeJogo || !form.precoJogo) {
      alert("Preencha os campos obrigatórios!")
      return
    }

    const token = localStorage.getItem('token')
    
    // Tratamento do preço
    let precoFormatado = form.precoJogo
    if (typeof form.precoJogo === 'string') {
        precoFormatado = parseFloat(form.precoJogo.replace(',', '.'))
    }

    // Monta o objeto EXATO que o Java espera
    const objetoParaEnviar = {
      nomeJogo: form.nomeJogo,
      nomeCategoria: form.nomeCategoria, // Garante que manda com o nome certo
      desenvolvedoraJogo: form.desenvolvedoraJogo,
      precoJogo: precoFormatado,
      urlImagem: form.urlImagem
    }

    try {
      await api.put(`/jogos/${id}`, objetoParaEnviar, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert("Jogo atualizado com sucesso!")
      navigate('/jogos') 

    } catch (error) {
      console.error("Erro ao atualizar jogo", error)
      alert("Erro ao atualizar. Verifique os dados.")
    }
  }

  return (
    <div className={styles['layout-admin']}>
      
      <header className={styles['top-bar']}>
        <div className={styles['logo-area']} onClick={() => navigate('/home')}> 
            <img src={LogoImg} alt="Logo Notorious" className={styles['logo-img']} /> 
        </div>
        <div className={styles['top-icons']}>
          <button className={styles['btn-icone']}> <img src={Perfil} className={styles['icone-img']} /> </button>
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
                  <div style={{width: '100%'}}>
                    <label className={styles['label-form']}>Categoria</label>
                    <input 
                      className={styles['input-medio']} 
                      placeholder="Ex: Ação" 
                      name="nomeCategoria" 
                      value={form.nomeCategoria} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div style={{width: '100%'}}>
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
                type="number" 
                value={form.precoJogo} 
                onChange={handleChange} 
              />

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
              <h2>Deseja salvar as alterações neste jogo?</h2>
              
              <div className={styles['grupo-botoes']}>
                 <button 
                    className={styles['btn-cancelar']}
                    onClick={() => navigate('/jogos')} 
                 >
                    Cancelar
                 </button>
                 
                 <button 
                    className={styles['btn-salvar']}
                    onClick={editarJogo} 
                 >
                    Salvar Alterações
                 </button>
              </div>
           </div>

        </div>

      </main>
    </div>
  )
}

export default EditarJogo