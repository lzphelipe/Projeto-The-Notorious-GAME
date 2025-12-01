import { useState } from 'react'
import './style.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Carrinho from '../../assets/carrinho-de-compras.png'

function EditarVenda() {

  // Estado inicial simulando os dados que vieram do JSON da imagem
  const [form, setForm] = useState({
    idUsuario: "2",
    dataVenda: "25/07/2025", // Formato texto conforme sua imagem
    statusVenda: "PENDENTE",
    produtos: [
      { idJogo: 3 },
      { idJogo: 4 }
    ]
  })

  // Estado para controlar o input de adicionar novo jogo
  const [novoIdJogo, setNovoIdJogo] = useState('')

  // Atualiza campos normais (Usuario, Data, Status)
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Adiciona um ID de jogo na lista
  function adicionarJogo() {
    if (!novoIdJogo) return; // Não adiciona vazio

    setForm({
      ...form,
      produtos: [...form.produtos, { idJogo: Number(novoIdJogo) }]
    })
    setNovoIdJogo('') // Limpa o campo
  }

  // Remove um jogo da lista
  function removerJogo(indexParaRemover) {
    const novaLista = form.produtos.filter((_, index) => index !== indexParaRemover)
    setForm({ ...form, produtos: novaLista })
  }

  return (
    <div className="layout-admin">

      {/* HEADER */}
      <header className="top-bar">
        <button className="logo-area"> <img src={LogoImg} alt="Logo Notorious" className="logo-img" /> </button>
        <div className="top-icons">
          <button className='btn-icone'> <img src={Perfil} className="icone-img" /> </button>
        </div>
      </header>

      <main className="main-content">

        {/* CONTAINER PRETO (Mesmo estilo do CadastrarJogo) */}
        <div className="black-container cadastro-layout">

          {/* LADO ESQUERDO: Dados Gerais */}
          <div className="form-esquerda">
            <h2 style={{ color: '#FFBE00', marginBottom: '20px' }}>Dados da Venda</h2>

            <label className="label-form">ID do Usuário</label>
            <input
              name="idUsuario"
              value={form.idUsuario}
              onChange={handleChange}
              placeholder="ID Usuário"
            />

            <label className="label-form">Data da Venda</label>
            <input
              name="dataVenda"
              value={form.dataVenda}
              onChange={handleChange}
              placeholder="DD/MM/AAAA"
            />

            <label className="label-form">Status da Venda</label>
            <select
              name="statusVenda"
              value={form.statusVenda}
              onChange={handleChange}
              className="input-select"
            >
              <option value="PENDENTE">PENDENTE</option>
              <option value="CONCLUIDO">PAGO</option>
              <option value="CANCELADO">CANCELADO</option>
            </select>
          </div>

          {/* RISCO DIVISOR */}
          <div className="divisor-vertical"></div>

          {/* LADO DIREITO: Gerenciar Produtos (IDs) */}
          <div className="form-direita" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>IDs dos Jogos</h2>

            {/* Área de Adicionar Novo ID */}
            <div className="add-jogo-container">
              <input
                type="long"
                placeholder="ID do Jogo"
                value={novoIdJogo}
                onChange={(e) => setNovoIdJogo(e.target.value)}
                className="input-mini"
              />
              <button type="button" onClick={adicionarJogo} className="btn-add-mini">+</button>
            </div>

            {/* Lista dos IDs adicionados */}
            <div className="lista-ids-jogos">
              {form.produtos.map((prod, index) => (
                <div key={index} className="chip-jogo">
                  <span>ID Jogo: <strong>{prod.idJogo}</strong></span>
                  <button onClick={() => removerJogo(index)} className="btn-remove-mini">x</button>
                </div>
              ))}
            </div>

            {/* Botões de Salvar/Cancelar */}
            <div className="grupo-botoes" style={{ marginTop: 'auto', paddingTop: '30px' }}>
              <button className="btn-cancelar">Cancelar</button>
              <button className="btn-salvar">Salvar Alterações</button>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}

export default EditarVenda