import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import styles from './style.module.css' 
import api from '../../services/api'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function CadastrarUsuario() {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    nomeUsuario: '',
    cpf: '',
    email: '',
    senha: ''
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvarUsuario() {
    // 1. Validação básica
    if (!form.nomeUsuario || !form.email || !form.senha || !form.cpf) {
      alert("Por favor, preencha todos os campos!")
      return
    }

    const token = localStorage.getItem('token')

    try {
      await api.post('/usuarios', form, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert("Usuário cadastrado com sucesso!")
      navigate('/usuarios') // Volta para a lista de usuários

    } catch (error) {
      console.error("Erro ao cadastrar usuário", error)
      alert("Erro ao cadastrar. Verifique os dados (CPF ou Email podem já existir).")
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
              
              {/* NOME (Grande e Destacado) */}
              <label className={styles['label-form']}>Nome Completo</label>
              <input 
                className={styles['input-nome']} 
                placeholder="Ex: João da Silva" 
                name="nomeUsuario" 
                value={form.nomeUsuario} 
                onChange={handleChange} 
              />

              {/* EMAIL */}
              <label className={styles['label-form']}>E-mail</label>
              <input 
                className={styles['input-padrao']} 
                placeholder="exemplo@email.com" 
                name="email" 
                type="email"
                value={form.email} 
                onChange={handleChange} 
              />

              {/* LINHA DUPLA (CPF e Senha) */}
              <div className={styles['linha-dupla']}>
                  <div style={{width: '100%'}}>
                    <label className={styles['label-form']}>CPF</label>
                    <input 
                      className={styles['input-medio']} 
                      placeholder="000.000.000-00" 
                      name="cpf" 
                      maxLength="14"
                      value={form.cpf} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div style={{width: '100%'}}>
                    <label className={styles['label-form']}>Senha</label>
                    <input 
                      className={styles['input-medio']} 
                      placeholder="******" 
                      name="senha" 
                      type="password"
                      value={form.senha} 
                      onChange={handleChange} 
                    />
                  </div>
              </div>

           </div>

           {/* RISCO NO MEIO */}
           <div className={styles['divisor-vertical']}></div>

           {/* LADO DIREITO: Confirmação */}
           <div className={styles['form-direita']}>
              <h2>Deseja cadastrar este novo usuário no sistema?</h2>
              
              <div className={styles['grupo-botoes']}>
                 <button 
                    className={styles['btn-cancelar']}
                    onClick={() => navigate('/usuarios')} // Cancela e volta
                 >
                    Cancelar
                 </button>
                 
                 <button 
                    className={styles['btn-salvar']}
                    onClick={salvarUsuario} 
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

export default CadastrarUsuario