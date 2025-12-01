import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './style.module.css' 
import api from '../../services/api'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function EditarUsuario() {
  const navigate = useNavigate()
  const { id } = useParams() // Pega o ID da rota
  
  const [form, setForm] = useState({
    nomeUsuario: '',
    cpf: '',
    email: '',
    senha: ''
  })

  // 1. CARREGAR DADOS DO USUÁRIO
  useEffect(() => {
    async function carregarDados() {
      const token = localStorage.getItem('token')
      try {
        const response = await api.get(`/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        // Preenche o formulário com os dados que vieram do banco
        setForm({
          nomeUsuario: response.data.nomeUsuario,
          cpf: response.data.cpf,
          email: response.data.email,
          senha: response.data.senha // Cuidado: Em sistemas reais, a senha não volta do banco!
        })

      } catch (error) {
        console.error("Erro ao buscar usuário", error)
        alert("Erro ao carregar dados do usuário.")
        navigate('/usuarios') 
      }
    }
    carregarDados()
  }, [id, navigate])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 2. SALVAR ALTERAÇÕES (PUT)
  async function editarUsuario() {
    if (!form.nomeUsuario || !form.email || !form.senha) {
      alert("Preencha os campos obrigatórios!")
      return
    }

    const token = localStorage.getItem('token')

    try {
      await api.put(`/usuarios/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert("Usuário atualizado com sucesso!")
      navigate('/usuarios') // Volta para a tabela

    } catch (error) {
      console.error("Erro ao atualizar usuário", error)
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
          <button className={styles['btn-icone']}> <img src={Perfil} className={styles['icone-img']} /> </button>
        </div>
      </header>

      <main className={styles['main-content']}>
        
        <div className={styles['black-container']}>
           
           {/* LADO ESQUERDO: Formulário */}
           <div className={styles['form-esquerda']}>
              
              {/* NOME (Destaque) */}
              <label className={styles['label-form']}>Nome Completo</label>
              <input 
                className={styles['input-nome']} 
                placeholder="Ex: Jorlan All day" 
                name="nomeUsuario" 
                value={form.nomeUsuario} 
                onChange={handleChange} 
              />

              {/* CPF e EMAIL */}
              <label className={styles['label-form']}>CPF</label>
              <input 
                className={styles['input-padrao']} 
                placeholder="000.000.000-00" 
                name="cpf" 
                value={form.cpf} 
                onChange={handleChange} 
                maxLength="14"
              />

              <label className={styles['label-form']}>E-mail</label>
              <input 
                className={styles['input-padrao']} 
                placeholder="exemplo@gmail.com" 
                name="email" 
                type="email"
                value={form.email} 
                onChange={handleChange} 
              />

              {/* SENHA */}
              <label className={styles['label-form']}>Senha</label>
              <input 
                className={styles['input-padrao']} 
                placeholder="Nova senha" 
                name="senha" 
                type="text" // Deixei text para ver o que digita, mas pode ser "password"
                value={form.senha} 
                onChange={handleChange} 
              />

           </div>

           <div className={styles['divisor-vertical']}></div>

           {/* LADO DIREITO */}
           <div className={styles['form-direita']}>
              <h2>Deseja salvar as alterações deste usuário?</h2>
              
              <div className={styles['grupo-botoes']}>
                 <button 
                    className={styles['btn-cancelar']}
                    onClick={() => navigate('/usuarios')} 
                 >
                    Cancelar
                 </button>
                 
                 <button 
                    className={styles['btn-salvar']}
                    onClick={editarUsuario} 
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

export default EditarUsuario