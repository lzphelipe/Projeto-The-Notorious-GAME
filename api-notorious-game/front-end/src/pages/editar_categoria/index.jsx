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
  const [menuAberto, setMenuAberto] = useState(false)

  // 1. ESTADO CORRIGIDO PARA CATEGORIA
  const [form, setForm] = useState({
    nomeCategoria: '',
    descricao: ''
  });

  // 2. BUSCAR DADOS DA CATEGORIA
  useEffect(() => {
    async function loadCategoria() {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get(`/categorias/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const categoria = response.data;

        setForm({
          nomeCategoria: categoria.nomeCategoria,
          descricao: categoria.descricao
        });

      } catch (error) {
        console.error("Erro ao carregar categoria", error);
        alert("Erro ao carregar dados. Verifique o ID.");
        navigate('/categorias');
      }
    }
    loadCategoria();
  }, [id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 3. SALVAR ALTERAÇÕES (PUT)
  async function salvarAlteracoes() {
    if (!form.nomeCategoria || !form.descricao) {
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

  // FUNÇÃO PARA SAIR DA CONTA
  function fazerLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className={styles['layout-admin']}>

      {/* HEADER */}
      <header className={styles['top-bar']}>
        <button className={styles['logo-area']} onClick={() => navigate('/home')}>
          <img src={LogoImg} alt="Logo" className={styles['logo-img']} />
        </button>
        <div className={styles['top-icons']}>

          {/* --- AQUI MUDA: Botão de Perfil com Menu --- */}
          <div className={styles['perfil-container']}>

            {/* O Botão agora só abre/fecha o menu, não faz logout direto */}
            <button
              className={styles['btn-icone']}
              onClick={() => setMenuAberto(!menuAberto)}
              title="Perfil"
            >
              <img src={Perfil} alt="Perfil" className={styles['icone-img']} />
            </button>

            {/* O Menu Pop-up (Só aparece se menuAberto for true) */}
            {menuAberto && (
              <div className={styles['dropdown-menu']}>
                {/* Aqui sim fica o botão de sair */}
                <button onClick={fazerLogout} className={styles['btn-sair']}>
                  Sair
                </button>
              </div>
            )}

          </div>

        </div>
      </header>

      <main className={styles['main-content']}>

        {/* CONTAINER PRETO */}
        <div className={styles['black-container']}>

          {/* LADO ESQUERDO: Formulário */}
          <div className={styles['form-esquerda']}>
            <h2 className={styles['titulo-amarelo']}>Editar Categoria #{id}</h2>

            {/* LABEL + INPUT NOME */}
            <div className={styles['input-group']}>
              <label className={styles['label-form']}>Nome da Categoria</label>
              <input
                className={styles['input-box']} // Mudei a classe para ser menos redondo
                placeholder="Ex: RPG de Ação"
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
            </div>

            {/* LABEL + TEXTAREA DESCRIÇÃO */}
            <div className={styles['input-group']}>
              <label className={styles['label-form']}>Descrição</label>
              {/* TEXTAREA: Permite quebrar linha automaticamente */}
              <textarea
                className={styles['textarea-box']}
                placeholder="Escreva aqui uma descrição detalhada"
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                rows={5} // Altura inicial
              />
            </div>
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