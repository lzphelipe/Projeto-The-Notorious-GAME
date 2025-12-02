import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import api from '../../services/api'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

const IconeLixo = () => <span style={{ fontSize: '20px' }}>🗑️</span>
const IconeEditar = () => <span style={{ fontSize: '20px' }}>✏️</span>

function GerenciarUsuarios() {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [busca, setBusca] = useState('')

  // 1. FUNÇÃO PARA BUSCAR DO BANCO DE DADOS
  async function carregarUsuarios() {
    const token = localStorage.getItem('token')
    try {
      const response = await api.get('/usuarios', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsuarios(response.data)
    } catch (error) {
      console.error("Erro ao buscar usuários", error)
      alert("Erro ao carregar lista de usuários.")
    }
  }

  // Carrega ao abrir a tela
  useEffect(() => {
    carregarUsuarios()
  }, [])

  // 2. FUNÇÃO DE EXCLUIR
  async function handleDelete(idUsuario) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      const token = localStorage.getItem('token')
      try {
        await api.delete(`/usuarios/${idUsuario}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Usuário excluído com sucesso!")
        carregarUsuarios();
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir usuário.");
      }
    }
  }

  function irParaEdicao(idUsuario) {
    navigate(`/usuarios/editar/${idUsuario}`);
  }

  return (
    <div className={styles['layout-admin']}>

      <header className={styles['top-bar']}>
        <div className={styles['logo-area']} onClick={() => navigate('/home')}>
          <img src={LogoImg} alt="Logo Notorious" className={styles['logo-img']} />
        </div>
        <div className={styles['top-icons']}>
          <button className={styles['btn-icone']} onClick={() => navigate('/')}> <img src={Perfil} className={styles['icone-img']} /> </button>
        </div>
      </header>

      <main className={styles['main-content-tabela']}>

        <div className={styles['container-tabela-larga']}>

          {/* CABEÇALHO DA TABELA (Busca + Botão Novo) */}
          <div className={styles['header-conteudo']}>

            <input
              type="text"
              placeholder="Pesquisar usuário..."
              className={styles['barra-pesquisa']}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            {/* BOTÃO NOVO USUÁRIO */}
            <button
              className={styles['btn-novo-usuario']}
              onClick={() => navigate('/usuarios/novo')}
            >
              + Novo Usuário
            </button>

          </div>

          <table className={styles['tabela-usuarios']}>
            <thead>
              <tr>
                <th className={styles['texto-centro']}>ID</th>
                <th>Nome Completo</th>
                <th>CPF</th>
                <th>E-Mail</th>
                <th className={styles['texto-centro']}>Senha</th>
                <th className={styles['texto-centro']}>Editar</th>
                <th className={styles['texto-centro']}>Excluir</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.filter(usuario =>
                usuario.perfil === 'CLIENTE' &&
                (usuario.nomeUsuario || usuario.nome || '').toLowerCase().includes(busca.toLowerCase())
              ).map((usuario) => (
                <tr key={usuario.idUsuario}>
                  <td className={styles['texto-centro']}>{usuario.idUsuario}</td>

                  {/* Tenta pegar nomeUsuario ou nome */}
                  <td>{usuario.nomeUsuario || usuario.nome}</td>

                  <td>{usuario.cpf}</td>
                  <td>{usuario.email}</td>
                  <td className={styles['texto-centro']}>**********</td>

                  {/* BOTÃO EDITAR */}
                  <td className={styles['texto-centro']}>
                    <button className={styles['btn-editar-tabela']} onClick={() => irParaEdicao(usuario.idUsuario)}>
                      <IconeEditar />
                    </button>
                  </td>

                  {/* BOTÃO EXCLUIR */}
                  <td className={styles['texto-centro']}>
                    <button className={styles['btn-excluir-tabela']} onClick={() => handleDelete(usuario.idUsuario)}>
                      <IconeLixo />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </main>
    </div>
  )
}

export default GerenciarUsuarios