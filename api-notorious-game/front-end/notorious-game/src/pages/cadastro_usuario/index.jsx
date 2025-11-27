import { useState } from 'react'
import './style.css'
import api from '../../services/api'
import LogoImg from '../../assets/logo_notorious.png'

function CadastroUsuario() {
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

      setFormData({ nome: '', cpf: '', email: '', senha: ''})

    } catch (error) {
      console.error("Erro ao cadastrar:", error)
      alert('Erro ao cadastrar usuário. Verifique o console.')
    }
  }

  return (
    <div className='container'>
      
      <img src={LogoImg} alt="Logo Notorious" className="logo-img" />

      <form>
        <h1>Cadastro de Usuários</h1>
        <input
          placeholder='Nome'
          name='nomeUsuario'
          type='text'
          value={formData.nomeUsuario}
          onChange={handleInputChange}
        />

        <input
          placeholder='CPF'
          name='cpf'
          type='text'
          maxLength="14"
          value={formData.cpf}
          onChange={handleInputChange}
        />

        <input
          placeholder='E-mail'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          placeholder='Senha'
          name='senha'
          type='password'
          value={formData.senha}
          onChange={handleInputChange}
        />

        <button type='button' onClick={cadastrarUsuario}>
          Cadastrar
        </button>
      </form>
    </div>
  )
}

export default CadastroUsuario