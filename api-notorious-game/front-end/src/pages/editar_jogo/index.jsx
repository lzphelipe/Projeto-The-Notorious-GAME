import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom' // useParams para pegar o ID da URL
import styles from './style.module.css' 
import api from '../../services/api'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Carrinho from '../../assets/carrinho-de-compras.png'

function EditarJogo() {
  const navigate = useNavigate()
  const { id } = useParams() // Pega o ID que veio na rota
  
  const [form, setForm] = useState({
    nomeJogo: '',
    nomeCategoria: '',
    desenvolvedoraJogo: '',
    precoJogo: '',
    urlImagem: '' 
  })

  // 1. CARREGAR DADOS AO ABRIR A TELA
  useEffect(() => {
    async function carregarDados() {
      const token = localStorage.getItem('token')
      try {
        const response = await api.get(`/jogos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        // Preenche o formulário com os dados que vieram do banco
        setForm({
          nomeJogo: response.data.nomeJogo,
          nomeCategoria: response.data.nomeCategoria.nomeCategoria || response.data.nomeCategoria, // Ajuste conforme seu backend retorna
          desenvolvedoraJogo: response.data.desenvolvedoraJogo,
          precoJogo: response.data.precoJogo,
          urlImagem: response.data.urlImagem
        })

      } catch (error) {
        console.error("Erro ao buscar jogo", error)
        alert("Erro ao carregar dados do jogo.")
        navigate('/jogos') // Se der erro, volta pra lista
      }
    }
    carregarDados()
  }, [id, navigate])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 2. FUNÇÃO DE ATUALIZAR (PUT)
  async function editarJogo() {
    if (!form.nomeJogo || !form.precoJogo) {
      alert("Preencha os campos obrigatórios!")
      return
    }

    const token = localStorage.getItem('token')
    
    // Tratamento do preço (caso seja string com vírgula ou número)
    let precoFormatado = form.precoJogo
    if (typeof form.precoJogo === 'string') {
        precoFormatado = parseFloat(form.precoJogo.replace(',', '.'))
    }

    const objetoParaEnviar = {
      ...form,
      precoJogo: precoFormatado
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
      
      {/* HEADER */}
      <header className={styles['top-bar']}>
        <div className={styles['logo-area']} onClick={() => navigate('/home')}> 
            <img src={LogoImg} alt="Logo Notorious" className={styles['logo-img']} /> 
        </div>
        <div className={styles['top-icons']}>
          <button className={styles['btn-icone']}> <img src={Carrinho} className={styles['icone-img']} /> </button>
          <button className={styles['btn-icone']}> <img src={Perfil} className={styles['icone-img']} /> </button>
        </div>
      </header>

      <main className={styles['main-content']}>
        
        <div className={styles['black-container']}>
           
           {/* LADO ESQUERDO: Formulário */}
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

           {/* LADO DIREITO */}
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