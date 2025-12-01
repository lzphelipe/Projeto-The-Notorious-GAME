import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import styles from './style.module.css'

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
  const navigate = useNavigate()

  async function carregarVendas() {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get('/vendas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVendas(response.data);
    } catch (error) {
      console.error("Erro ao buscar vendas", error);
    }
  }

  useEffect(() => {
    carregarVendas();
  }, [])

  async function handleDelete(idVenda) {
    if (confirm("Tem certeza que deseja excluir/cancelar esta venda?")) {
      const token = localStorage.getItem('token');
      try {
        await api.delete(`/vendas/${idVenda}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Venda excluída/cancelada!");
        carregarVendas();
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir venda.");
      }
    }
  }

  function irParaEdicao(idVenda) {
    navigate(`/vendas/editar/${idVenda}`);
  }

  const toggleLinha = (id) => {
    if (linhaExpandida === id) {
      setLinhaExpandida(null)
    } else {
      setLinhaExpandida(id)
    }
  }

  const formatarPreco = (valor) => {
    if (valor === undefined || valor == null) return "R$ 0,00";
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  const formatarData = (data) => {
    if (!data) return "-";
    // Se já vier formatada ou não tiver traço, retorna direto
    if (!data.includes('-')) return data;
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className={styles['layout-admin']}>

      <header className={styles['top-bar']}>
        <button className={styles['logo-area']} onClick={() => navigate('/home')}>
          <img src={LogoImg} alt="Logo Notorious" className={styles['logo-img']} />
        </button>
        <div className={styles['top-icons']}>
          <button className={styles['btn-icone']}> <img src={Perfil} className={styles['icone-img']} /> </button>
        </div>
      </header>

      <main className={styles['main-content-tabela']}>

        <div className={styles['container-tabela-larga']}>

          <div className={styles['header-conteudo']}>
            <input
              type="text"
              placeholder="Pesquisar cliente..."
              className={styles['barra-pesquisa']}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <table className={styles['tabela-usuarios']}>
            <thead>
              <tr>
                <th className={styles['texto-centro']}>ID</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Valor Total</th>
                <th className={styles['texto-centro']}>Status</th>
                <th className={styles['texto-centro']}>Editar</th>
                <th className={styles['texto-centro']}>Excluir</th>
                <th className={styles['texto-centro']}>Ver</th>
              </tr>
            </thead>

            <tbody>
              {vendas.filter(venda =>
                venda.nomePessoa.toLowerCase().includes(busca.toLowerCase())
              ).map((venda) => (
                <>
                  {/* LINHA PRINCIPAL */}
                  <tr
                    key={venda.idVenda}
                    className={linhaExpandida === venda.idVenda ? styles['linha-ativa'] : ""}
                  >
                    <td className={styles['texto-centro']}>{venda.idVenda}</td>
                    <td>{venda.nomePessoa}</td>
                    <td>{formatarData(venda.dataVenda)}</td>
                    <td style={{ fontWeight: 'bold' }}>{formatarPreco(venda.precoTotal)}</td>

                    <td className={styles['texto-centro']}>
                      {/* Lógica para combinar a classe base do badge com a cor específica */}
                      <span className={`${styles['status-badge']} ${styles[venda.statusVenda.toLowerCase()]}`}>
                        {venda.statusVenda}
                      </span>
                    </td>

                    {/* Botão EDITAR */}
                    <td className={styles['texto-centro']}>
                      <button className={styles['btn-editar-tabela']} onClick={() => irParaEdicao(venda.idVenda)}>
                        <IconeEditar />
                      </button>
                    </td>

                    {/* Botão EXCLUIR */}
                    <td className={styles['texto-centro']}>
                      <button className={styles['btn-excluir-tabela']} onClick={() => handleDelete(venda.idVenda)}>
                        <IconeLixo />
                      </button>
                    </td>

                    {/* Botão da SETINHA */}
                    <td className={styles['texto-centro']}>
                      <button
                        className={styles['btn-setinha']}
                        onClick={() => toggleLinha(venda.idVenda)}
                      >
                        {linhaExpandida === venda.idVenda ? <SetaCima /> : <SetaBaixo />}
                      </button>
                    </td>
                  </tr>

                  {/* LINHA DE DETALHES */}
                  {linhaExpandida === venda.idVenda && (
                    <tr className={styles['linha-detalhes']}>
                      <td colSpan="8">
                        <div className={styles['detalhes-container']}>
                          <h4>Itens do Pedido:</h4>
                          <ul>
                            {venda.produtos && venda.produtos.map((prod, index) => (
                              <li key={index}>
                                {/* Verifica se o objeto tem nomeJogo, senão tenta adaptar */}
                                <span>{prod.nomeJogo || "Produto sem nome"}</span>
                                <strong>{formatarPreco(prod.precoPago || prod.precoJogo)}</strong>
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