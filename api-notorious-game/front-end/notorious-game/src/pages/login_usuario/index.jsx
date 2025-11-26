import { useState } from 'react'
import './style.css'
import api from '../../services/api'
import LogoImg from '../../assets/logo_notorious.png'

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function fazerLogin(event) {
    event.preventDefault();

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: email,
        senha: senha
      });

      alert("Login realizado com sucesso: " + response.data);

    } catch (error) {
      console.error(error);
      alert("Erro no login! Verifique email e senha.");
    }
  }

  return (
    <div className='container'>
      <img src={LogoImg} alt="Logo Notorious" className="logo-img" />

      <form>
        <h1>Login</h1>

        <input
          placeholder='E-mail'
          name='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder='Senha'
          name='senha'
          type='password'
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type='button' onClick={fazerLogin}> Entrar </button>
      </form>
    </div>
  )
}

export default Login // CORREÇÃO 6: Tirei a vírgula que tinha aqui no final