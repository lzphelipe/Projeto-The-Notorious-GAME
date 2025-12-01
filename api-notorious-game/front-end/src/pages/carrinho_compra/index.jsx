import { useState } from 'react'
import './style.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

const IconeLixo = () => <span>🗑️</span>
const IconeMais = () => <span>+</span>
const IconeMenos = () => <span>-</span>

function Carrinho() {
  
  // Dados fictícios do Carrinho
  const [itens, setItens] = useState([])

  // Função que calcula o TOTAL (Soma tudo)
  const total = itens.reduce((acc, item) => acc + (item.preco * item.qtd), 0)

  return (
    <div className="layout-admin">
      
      {/* HEADER */}
      <header className="top-bar">
        <button className="logo-area"> <img src={LogoImg} alt="Logo" className="logo-img" /> </button>
        <div className="top-icons">
          <button className='btn-icone'> <img src={Perfil} className="icone-img" /> </button>
        </div>
      </header>

      <main className="main-content-carrinho">
        
        <div className="container-carrinho">
            
            {/* LADO ESQUERDO: Lista de Produtos */}
            <div className="coluna-produtos">
                <h1 className="titulo-carrinho">Seu Carrinho ({itens.length} itens)</h1>
                
                <div className="lista-itens">
                    {itens.map(item => (
                        <div key={item.id} className="card-item-carrinho">
                            
                            {/* Imagem */}
                            <img src={item.imagem} alt={item.nome} className="img-item" />
                            
                            {/* Detalhes */}
                            <div className="info-item">
                                <h3>{item.nome}</h3>
                                <p className="plataforma">{item.plataforma}</p>
                            </div>

                            {/* Quantidade */}
                            <div className="qtd-controle">
                                <button className="btn-qtd"><IconeMenos /></button>
                                <span>{item.qtd}</span>
                                <button className="btn-qtd"><IconeMais /></button>
                            </div>

                            {/* Preço */}
                            <div className="preco-item">
                                <p>R$ {(item.preco * item.qtd).toFixed(2).replace('.', ',')}</p>
                            </div>

                            {/* Remover */}
                            <button className="btn-remover">
                                <IconeLixo />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* LADO DIREITO: Resumo do Pedido */}
            <div className="coluna-resumo">
                <div className="card-resumo">
                    <h2>Resumo do Pedido</h2>
                    
                    <div className="linha-resumo">
                        <span>Subtotal</span>
                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="linha-total">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>

                    <button className="btn-finalizar">
                        Finalizar Compra
                    </button>
                </div>
            </div>

        </div>

      </main>
    </div>
  )
}

export default Carrinho