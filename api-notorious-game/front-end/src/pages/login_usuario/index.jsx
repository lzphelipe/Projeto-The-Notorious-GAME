import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import api from '../../services/api'
import LogoImg from '../../assets/logo_notorious.png'

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  // Função para mudar de tela
  function irParaCadastro() {
    navigate('/cadastro'); // Certifique-se que essa rota existe no seu main.jsx
  }

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

      const token = response.data.token;
      const perfil = response.data.perfil;

      localStorage.setItem('token', token);
      localStorage.setItem('perfil', perfil);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      alert("Login realizado com sucesso!");
      navigate('/home');

    } catch (error) {
      console.error(error);
      alert("Erro no login! Verifique email e senha.");
    }
  }

  return (
    <div className={styles['container']}>

      <img src={LogoImg} alt="Logo Notorious" className={styles['logo-img']} />

      <form className={styles['form-login']}>
        <h1 className={styles['title']}>Login</h1>

        <input
          className={styles['input-login']}
          placeholder='E-mail'
          name='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles['input-login']}
          placeholder='Senha'
          name='senha'
          type='password'
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          type='button'
          onClick={fazerLogin}
          className={styles['btn-login']}
        >
          Entrar
        </button>

        <div className={styles['container-cadastro']}>
          <p>Não tem uma conta?</p>
          <button 
            type="button" 
            onClick={() => navigate ('/cadastro')} 
            className={styles['btn-link-cadastro']}
          >
            Cadastre-se
          </button>
        </div>

      </form>
    </div>
  )
}

export default Login