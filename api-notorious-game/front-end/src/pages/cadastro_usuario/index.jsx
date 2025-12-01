import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import api from '../../services/api'
import LogoImg from '../../assets/logo_notorious.png'

function CadastroUsuario() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nomeUsuario: '',
    cpf: '',
    email: '',
    senha: '',
  })

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  async function cadastrarUsuario() {
    try {
      await api.post('/usuarios', formData)

      alert('Usuário cadastrado com sucesso!')

      setFormData({ nome: '', cpf: '', email: '', senha: '' })

      navigate('/')

    } catch (error) {
      console.error("Erro ao cadastrar:", error)
      alert('Erro ao cadastrar usuário. Verifique o console.')
    }
  }

  return (
    <div className={styles['container']}>

      <img
        src={LogoImg}
        alt="Logo Notorious"
        className={styles['logo-img']}
      />

      <form className={styles['form-cadastro']}>

        <h1 className={styles['title']}>Cadastro de Usuários</h1>

        <input
          className={styles['input-cadastro']}
          placeholder='Nome'
          name='nomeUsuario'
          type='text'
          value={formData.nomeUsuario}
          onChange={handleInputChange}
        />

        <input
          className={styles['input-cadastro']}
          placeholder='CPF'
          name='cpf'
          type='text'
          maxLength="14"
          value={formData.cpf}
          onChange={handleInputChange}
        />

        <input
          className={styles['input-cadastro']}
          placeholder='E-mail'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          className={styles['input-cadastro']}
          placeholder='Senha'
          name='senha'
          type='password'
          value={formData.senha}
          onChange={handleInputChange}
        />

        <button
          type='button'
          onClick={cadastrarUsuario}
          className={styles['btn-cadastro']}
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}

export default CadastroUsuario