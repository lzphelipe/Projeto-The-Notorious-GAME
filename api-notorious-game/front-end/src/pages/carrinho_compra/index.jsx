import { useState } from 'react'
import styles from './style.module.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

const IconeLixo = () => <span>🗑️</span>
const IconeMais = () => <span>+</span>
const IconeMenos = () => <span>-</span>

function Carrinho() {
  
  const [itens, setItens] = useState([])

  const total = itens.reduce((acc, item) => acc + (item.preco * item.qtd), 0)

  return (
    <div className={styles['layout-admin']}>
      
      {/* HEADER */}
      <header className={styles['top-bar']}>
        <button className={styles['logo-area']}> 
            <img src={LogoImg} alt="Logo" className={styles['logo-img']} /> 
        </button>
        <div className={styles['top-icons']}>
          <button className={styles['btn-icone']}> <img src={Perfil} className={styles['icone-img']} /> </button>
        </div>
      </header>

      <main className={styles['main-content-carrinho']}>
        
        <div className={styles['container-carrinho']}>
            
            {/* LADO ESQUERDO: Lista de Produtos */}
            <div className={styles['coluna-produtos']}>
                <h1 className={styles['titulo-carrinho']}>Seu Carrinho ({itens.length} itens)</h1>
                
                <div className={styles['lista-itens']}>
                    {itens.map(item => (
                        <div key={item.id} className={styles['card-item-carrinho']}>
                            
                            {/* Imagem */}
                            <img src={item.imagem} alt={item.nome} className={styles['img-item']} />
                            
                            {/* Detalhes */}
                            <div className={styles['info-item']}>
                                <h3 className={styles['nome-jogo']}>{item.nome}</h3>
                                <p className={styles['plataforma']}>{item.plataforma}</p>
                            </div>

                            {/* Quantidade */}
                            <div className={styles['qtd-controle']}>
                                <button className={styles['btn-qtd']}><IconeMenos /></button>
                                <span>{item.qtd}</span>
                                <button className={styles['btn-qtd']}><IconeMais /></button>
                            </div>

                            {/* Preço */}
                            <div className={styles['preco-item']}>
                                <p>R$ {(item.preco * item.qtd).toFixed(2).replace('.', ',')}</p>
                            </div>

                            {/* Remover */}
                            <button className={styles['btn-remover']}>
                                <IconeLixo />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* LADO DIREITO: Resumo do Pedido */}
            <div className={styles['coluna-resumo']}>
                <div className={styles['card-resumo']}>
                    <h2>Resumo do Pedido</h2>
                    
                    <div className={styles['linha-resumo']}>
                        <span>Subtotal</span>
                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className={styles['linha-total']}>
                        <span>Total</span>
                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>

                    <button className={styles['btn-finalizar']}>
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