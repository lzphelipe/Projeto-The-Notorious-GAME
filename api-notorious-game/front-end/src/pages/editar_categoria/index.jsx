import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import styles from './style.module.css'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Carrinho from '../../assets/carrinho-de-compras.png'

function EditarCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. ESTADO CORRIGIDO PARA CATEGORIA
  const [form, setForm] = useState({
    nome: "", // ou nomeCategoria, dependendo do seu DTO
    descricao: ""
  });

  // 2. BUSCAR DADOS DA CATEGORIA
  useEffect(() => {
    async function loadCategoria() {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get(`/categorias/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Ajuste aqui se o seu back retornar 'nomeCategoria'
        const data = response.data;
        setForm({
          nome: data.nome || data.nomeCategoria || "",
          descricao: data.descricao || ""
        });

      } catch (error) {
        console.error("Erro ao carregar categoria", error);
        alert("Erro ao carregar dados. Verifique o ID.");
        navigate('/categorias'); // Volta pra lista certa
      }
    }
    loadCategoria();
  }, [id, navigate])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 3. SALVAR ALTERAÇÕES (PUT)
  async function salvarAlteracoes() {
    if (!form.nome || !form.descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const token = localStorage.getItem('token');

    try {
      await api.put(`/categorias/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Categoria atualizada com sucesso!");
      navigate('/categorias'); // Volta para Gerenciar Categorias

    } catch (error) {
      console.error("Erro na alteração", error);
      alert("Erro ao atualizar. Verifique os dados.");
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

        {/* CONTAINER PRETO */}
        <div className={styles['black-container']}>

          {/* LADO ESQUERDO: Formulário */}
          <div className={styles['form-esquerda']}>
            <h2 className={styles['titulo-amarelo']}>Editar Categoria #{id}</h2>

            <label className={styles['label-form']}>Nome da Categoria</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex: RPG"
              className={styles['input-nome']} // Usei o estilo maior para destaque
            />

            <label className={styles['label-form']}>Descrição</label>
            <input
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Descrição breve..."
              className={styles['input-select']} // Usei estilo padrão
            />
          </div>

          {/* RISCO DIVISOR */}
          <div className={styles['divisor-vertical']}></div>

          {/* LADO DIREITO: Confirmação */}
          <div className={styles['form-direita']}>
            <h2 className={styles['titulo-branco']}>Deseja salvar as alterações?</h2>

            <div className={styles['grupo-botoes']}>
              <button 
                className={styles['btn-cancelar']} 
                onClick={() => navigate('/categorias')}
              >
                Cancelar
              </button>
              
              <button 
                className={styles['btn-salvar']} 
                onClick={salvarAlteracoes}
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

export default EditarCategoria