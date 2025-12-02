import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import styles from './style.module.css' 

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Carrinho from '../../assets/carrinho-de-compras.png'

const IconeLixo = () => <span style={{ fontSize: '20px' }}>🗑️</span>
const IconeEditar = () => <span style={{ fontSize: '20px' }}>✏️</span>

function GerenciarCategorias() {
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const [busca, setBusca] = useState('')

  // 1. CARREGAR DO BANCO
  async function carregarCategorias() {
    const token = localStorage.getItem('token')
    try {
      const response = await api.get('/categorias', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCategorias(response.data)
    } catch (error) {
      console.error("Erro ao buscar categorias", error)
      alert("Erro ao carregar lista de categorias.")
    }
  }

  useEffect(() => {
    carregarCategorias()
  }, [])

  // 2. EXCLUIR CATEGORIA
  async function handleDelete(id) {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      const token = localStorage.getItem('token')
      try {
        await api.delete(`/categorias/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert("Categoria excluída com sucesso!")
        carregarCategorias()
      } catch (error) {
        alert("Erro ao excluir. Verifique se existem jogos vinculados a ela.")
      }
    }
  }

  return (
    <div className={styles['layout-admin']}>

      <header className={styles['top-bar']}>
        <div className={styles['logo-area']} onClick={() => navigate('/home')}>
          <img src={LogoImg} alt="Logo Notorious" className={styles['logo-img']} />
        </div>
        <div className={styles['top-icons']}>
          <button className={styles['btn-icone']}> <img src={Carrinho} className={styles['icone-img']} /> </button>
          <button className={styles['btn-icone']}> <img src={Perfil} className={styles['icone-img']} /> </button>
        </div>
      </header>

      <main className={styles['main-content-tabela']}>

        <div className={styles['container-tabela-larga']}>

          {/* CABEÇALHO: Busca + Botão Nova Categoria */}
          <div className={styles['header-conteudo']}>
            <input
              type="text"
              placeholder="Pesquisar categoria..."
              className={styles['barra-pesquisa']}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            <button 
              className={styles['btn-novo-usuario']} // Reutiliza a classe do botão preto e amarelo
              onClick={() => navigate('/categorias/nova')}
            >
              + Nova Categoria
            </button>
          </div>

          <table className={styles['tabela-usuarios']}>
            <thead>
              <tr>
                <th className={styles['texto-centro']}>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th className={styles['texto-centro']}>Editar</th>
                <th className={styles['texto-centro']}>Excluir</th>
              </tr>
            </thead>

            <tbody>
              {categorias.filter(categorias =>
                (categorias.nomeCategoria).toLowerCase().includes(busca.toLowerCase())
              ).map((categorias) => (
                <tr key={categorias.idCategoria}>
                  <td className={styles['texto-centro']}>{categorias.idCategoria}</td>
                  
                  <td>{categorias.nomeCategoria}</td>
                  <td>{categorias.descricao}</td>

                  <td className={styles['texto-centro']}>
                    <button className={styles['btn-editar-tabela']} onClick={() => navigate(`/categorias/editar/${categorias.idCategoria}`)}>
                      <IconeEditar />
                    </button>
                  </td>

                  <td className={styles['texto-centro']}>
                    <button className={styles['btn-excluir-tabela']} onClick={() => handleDelete(categorias.idCategoria)}>
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

export default GerenciarCategorias