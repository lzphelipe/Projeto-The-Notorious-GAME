import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './style.module.css'
import api from '../../services/api'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function EditarUsuario() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nomeUsuario: '',
    cpf: '',
    email: '',
    senha: ''
  });

  // 1. CARREGAR DADOS DO USUÁRIO
  useEffect(() => {
    async function loadUsuario() {
      const token = localStorage.getItem('token')
      try {
        const response = await api.get(`/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const usuario = response.data;

        setForm({
          nomeUsuario: usuario.nomeUsuario || "",
          cpf: usuario.cpf || "",
          email: usuario.email || "",
          senha: "" 
        });

      } catch (error) {
        alert("Erro ao carregar dados do usuário.")
        navigate('/usuarios')
      }
    }
    loadUsuario();
  }, [id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 2. SALVAR ALTERAÇÕES (PUT)
  async function editarUsuario() {
    if (!form.nomeUsuario || !form.email) {
      alert("Nome e E-mail são obrigatórios!");
      return
    }

    const token = localStorage.getItem('token')

    const body = {
      nomeUsuario: form.nomeUsuario,
      cpf: form.cpf,
      email: form.email,
      senha: form.senha ? form.senha : null 
    }

    try {
      await api.put(`/usuarios/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert("Usuário atualizado com sucesso!")
      navigate('/usuarios')

    } catch (error) {
      console.error("Erro ao atualizar", error)
      alert("Erro ao atualizar. Verifique se o email/CPF já existem.")
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
            <label className={styles['label-form']}>Nova Senha (Opcional)</label>
            <input
              className={styles['input-padrao']}
              placeholder="Deixe em branco para manter a atual"
              name="senha"
              type="text"
              value={form.senha}
              onChange={handleChange}
            />

          </div>

          <div className={styles['divisor-vertical']}></div>

          {/* LADO DIREITO */}
          <div className={styles['form-direita']}>
            <h2>Deseja salvar as alterações?</h2>

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