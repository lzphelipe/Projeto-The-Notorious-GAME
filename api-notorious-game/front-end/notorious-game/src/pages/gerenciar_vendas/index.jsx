import { useState, useEffect } from 'react'
import './style.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

const IconeLixo = () => <span style={{ fontSize: '20px' }}>🗑️</span>
const IconeEditar = () => <span style={{ fontSize: '20px' }}>✏️</span>
const SetaBaixo = () => <span>▼</span>
const SetaCima = () => <span>▲</span>

function GerenciarVendas() {

  const [vendas, setVendas] = useState([])
  const [busca, setBusca] = useState('')
  const [linhaExpandida, setLinhaExpandida] = useState(null)

  async function carregarVendas() {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get('/vendas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVendas(response.data);
    } catch (error) {
      console.error("Erro ao buscar vendas", error);
      alert("Erro ao carregar vendas. Verifique se você é ADMIN.");
    }
  }

  useEffect(() => {
    carregarVendas();
  }, [])

  async function handleDelete(idVenda) {
    if (confirm("Tem certeza que deseja excluir/cancelar esta venda?")) {
      const token = localStorage.getItem('token');
      try {
        await api.delete(`/venda/${idVenda}`, {
          headers: { Authorization: `Bearer ${token}`}
        });
        alert("Venda excluída/cancelada!");
        carregarVendas();
      } catch (error) {
        alert("Erro ao excluir venda.");   
      }
    }
  }

  async function handleUpdate(idVenda) {
    const novoStatus = prompt("Digite o novo status (PAGO, PENDENTE, CANCELADO):");
    if (novoStatus) {
      const token = localStorage.getItem('token');
      try {
        await api.put(`/venda/${idVenda}`,
        {
          statusVenda: novoStatus.toUpperCase()
        },
        {
          headers: { Authorization: `Bearer ${token}`}
        });
        alert("Status atualizado!");
        carregarVendas();
      } catch (error) {
        alert("Erro ao atualizar. Verifique se o status é válido.");
      }
    }
  }

  // Função para abrir/fechar a linha
  const toggleLinha = (id) => {
    if (linhaExpandida === id) {
      setLinhaExpandida(null) 
    } else {
      setLinhaExpandida(id) 
    }
  }

  const formatarPreco = (valor) => {
    if(valor === undefined || valor == null) return "R$ 0,00";
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  const formatarData = (data) => {
    if(!data) return "-";
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className="layout-admin">

      <header className="top-bar">
        <button className="logo-area">
          <img src={LogoImg} alt="Logo Notorious" className="logo-img" />
        </button>
        <div className="top-icons">
          <button className='btn-icone'> <img src={Perfil} className="icone-img" /> </button>
        </div>
      </header>

      <main className="main-content-tabela">

        <div className="container-tabela-larga">

          <div className="header-conteudo">
            <input
              type="text"
              placeholder="Pesquisar cliente..."
              className="barra-pesquisa"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <table className="tabela-usuarios">
            <thead>
              <tr>
                <th className="texto-centro">ID</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Valor Total</th>
                <th className="texto-centro">Status</th>
                <th className="texto-centro">Editar</th>
                <th className="texto-centro">Excluir</th>
                <th className="texto-centro">Ver</th> {/* Coluna da Setinha */}
              </tr>
            </thead>

            <tbody>
              {vendas.filter(venda =>
                venda.nomePessoa.toLowerCase().includes(busca.toLowerCase())
              ).map((venda) => (
                <>
                  {/* LINHA PRINCIPAL */}
                  <tr key={venda.idVenda} className={linhaExpandida === venda.idVenda ? "linha-ativa" : ""}>
                    <td className="texto-centro">{venda.idVenda}</td>
                    <td>{venda.nomePessoa}</td>
                    <td>{formatarData(venda.dataVenda)}</td>
                    <td style={{fontWeight: 'bold'}}>{formatarPreco(venda.precoTotal)}</td>
                    
                    <td className="texto-centro">
                      <span className={`status-badge ${venda.statusVenda.toLowerCase()}`}>
                        {venda.statusVenda}
                      </span>
                    </td>

                    {/* Botão EDITAR (Agora no lugar dos detalhes) */}
                    <td className="texto-centro">
                      <button className="btn-editar-tabela" onClick={() => handleUpdate(venda.idVenda)}>
                        <IconeEditar />
                      </button>
                    </td>

                    <td className="texto-centro">
                      <button className="btn-excluir-tabela" onClick={() => handleDelete(venda.idVenda)}>
                        <IconeLixo />
                      </button>
                    </td>

                    {/* Botão da SETINHA (Toggle) */}
                    <td className="texto-centro">
                      <button 
                        className="btn-setinha" 
                        onClick={() => toggleLinha(venda.idVenda)}
                      >
                        {linhaExpandida === venda.idVenda ? <SetaCima /> : <SetaBaixo />}
                      </button>
                    </td>
                  </tr>

                  {/* LINHA DE DETALHES (Só aparece se o ID bater) */}
                  {linhaExpandida === venda.idVenda && (
                    <tr className="linha-detalhes">
                      {/* colSpan="8" faz essa célula ocupar a largura toda da tabela */}
                      <td colSpan="8">
                        <div className="detalhes-container">
                          <h4>Itens do Pedido:</h4>
                          <ul>
                            {venda.produtos && venda.produtos.map((prod, index) => (
                              <li key={index}>
                                <span>{prod.nomeJogo}</span>
                                <strong>{formatarPreco(prod.precoPago)}</strong>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>

        </div>

      </main>
    </div>
  )
}

export default GerenciarVendas