import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import styles from './style.module.css'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function EditarVenda() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    idUsuario: "",
    dataVenda: "",
    statusVenda: "PAGO",
    produtos: []
  });

  const [novoIdJogo, setNovoIdJogo] = useState('')

  useEffect(() => {
    async function loadVenda() {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get(`/vendas/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const venda = response.data;

        setForm({
          idUsuario: venda.idUsuario || "ID não veio",
          dataVenda: venda.dataVenda,
          statusVenda: venda.statusVenda,
          produtos: venda.produtos || []
        });

      } catch (error) {
        alert("Erro ao carregar venda. Verifique o ID.");
        navigate('/vendas');
      }
    }
    loadVenda();
  }, [id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function adicionarJogo() {
    if (!novoIdJogo) return;

    setForm({
      ...form,
      produtos: [...form.produtos, { idJogo: Number(novoIdJogo) }]
    })
    setNovoIdJogo('')
  }

  function removerJogo(indexParaRemover) {
    const novaLista = form.produtos.filter((_, index) => index !== indexParaRemover)
    setForm({ ...form, produtos: novaLista })
  }

  async function salvarAlteracoes() {
    const token = localStorage.getItem('token');

    const body = {
      idUsuario: Number(form.idUsuario),
      dataVenda: form.dataVenda,
      statusVenda: form.statusVenda,
      produtos: form.produtos.map(produtos => ({ idJogo: produtos.idJogo }))
    };
    try {
      await api.put(`/vendas/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Venda atualizada com sucesso!");
      navigate('/vendas');
    } catch (error) {
      console.error("Erro no alteração", error);
      alert("Erro ao atualizar. Verifique a data e os IDs.");
    }
  }

  return (
    <div className={styles['layout-admin']}>

      {/* HEADER */}
      <header className={styles['top-bar']}>
        <button className={styles['logo-area']} onClick={() => navigate('/home')}>
          <img src={LogoImg} alt="Logo Notorious" className={styles['logo-img']} />
        </button>
        <div className={styles['top-icons']}>
          <button className={styles['btn-icone']}> <img src={Perfil} className={styles['icone-img']} /> </button>
        </div>
      </header>

      <main className={styles['main-content']}>

        {/* CONTAINER PRETO */}
        <div className={`${styles['black-container']} ${styles['cadastro-layout']}`}>

          {/* LADO ESQUERDO */}
          <div className={styles['form-esquerda']}>
            <h2 className={styles['titulo-amarelo']}>Dados da Venda #{id}</h2>

            <label className={styles['label-form']}>ID do Usuário</label>
            <input
              name="idUsuario"
              value={form.idUsuario}
              onChange={handleChange}
              placeholder="ID Usuário"
              className={styles['input-select']}
              type='long'
            />

            <label className={styles['label-form']}>Data da Venda</label>
            <input
              name="dataVenda"
              value={form.dataVenda}
              onChange={handleChange}
              placeholder="DD/MM/AAAA"
              className={styles['input-select']}
            />

            <label className={styles['label-form']}>Status da Venda</label>
            <select
              name="statusVenda"
              value={form.statusVenda}
              onChange={handleChange}
              className={styles['input-select']}
            >
              <option value="PENDENTE">PENDENTE</option>
              <option value="PAGO">PAGO</option>
              <option value="CANCELADO">CANCELADO</option>
            </select>
          </div>

          {/* RISCO DIVISOR */}
          <div className={styles['divisor-vertical']}></div>

          {/* LADO DIREITO */}
          <div className={styles['form-direita']} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <h2 className={styles['titulo-branco']}>IDs dos Jogos</h2>

            {/* Área de Adicionar Novo ID */}
            <div className={styles['add-jogo-container']}>
              <input
                type="long"
                placeholder="ID do Jogo"
                value={novoIdJogo}
                onChange={(e) => setNovoIdJogo(e.target.value)}
                className={styles['input-mini']}
              />
              <button
                type="button"
                onClick={adicionarJogo}
                className={styles['btn-add-mini']}
              >
                +
              </button>
            </div>

            {/* Lista dos IDs adicionados */}
            <div className={styles['lista-ids-jogos']}>
              {form.produtos && form.produtos.map((prod, index) => (
                <div key={index} className={styles['chip-jogo']}>
                  <span>{prod.nomeJogo ? prod.nomeJogo : `ID: ${prod.idJogo}`}</span>
                  <button
                    onClick={() => removerJogo(index)}
                    className={styles['btn-remove-mini']}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            {/* Botões de Salvar/Cancelar */}
            <div className={styles['grupo-botoes']} style={{ marginTop: 'auto', paddingTop: '30px' }}>
              <button className={styles['btn-cancelar']} onClick={() => navigate('/vendas')}>Cancelar</button>
              <button className={styles['btn-salvar']} onClick={salvarAlteracoes}>Salvar Alterações</button>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}

export default EditarVenda