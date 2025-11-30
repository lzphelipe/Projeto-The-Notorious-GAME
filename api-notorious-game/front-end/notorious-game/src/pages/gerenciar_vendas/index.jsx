import { useState } from 'react'
import './style.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

const IconeLixo = () => <span style={{ fontSize: '20px' }}>🗑️</span>
const IconeEditar = () => <span style={{ fontSize: '20px' }}>✏️</span>
const SetaBaixo = () => <span>▼</span>
const SetaCima = () => <span>▲</span>

function GerenciarVendas() {

  const [vendas, setVendas] = useState([
    {
      idVenda: 1,
      nomePessoa: "Sr. Cabeça de batata",
      dataVenda: "2025-07-25",
      precoTotal: 369.80,
      statusVenda: "PENDENTE",
      produtos: [
        { nomeJogo: "Grand Theft Auto V", precoPago: 69.90 },
        { nomeJogo: "FIFA 24", precoPago: 299.90 }
      ]
    },
    {
      idVenda: 2,
      nomePessoa: "Woody Toy",
      dataVenda: "2025-07-24",
      precoTotal: 120.00,
      statusVenda: "CONCLUIDO",
      produtos: [
        { nomeJogo: "Minecraft", precoPago: 120.00 }
      ]
    },
  ])

  const [busca, setBusca] = useState('')
  
  // ESTADO NOVO: Guarda o ID da linha que está aberta (null = nenhuma)
  const [linhaExpandida, setLinhaExpandida] = useState(null)

  // Função para abrir/fechar a linha
  const toggleLinha = (id) => {
    if (linhaExpandida === id) {
      setLinhaExpandida(null) 
    } else {
      setLinhaExpandida(id) 
    }
  }

  const formatarPreco = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  const formatarData = (data) => {
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
                      <button className="btn-editar-tabela">
                        <IconeEditar />
                      </button>
                    </td>

                    <td className="texto-centro">
                      <button className="btn-excluir-tabela">
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
                            {venda.produtos.map((prod, index) => (
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