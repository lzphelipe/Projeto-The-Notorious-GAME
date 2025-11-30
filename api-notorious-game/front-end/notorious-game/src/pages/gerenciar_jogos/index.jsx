import { useState } from 'react'
import './style.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Carrinho from '../../assets/carrinho-de-compras.png'

// Ícones de Admin (Pode substituir por imagens depois se quiser)
// Se tiver imagens, importe: import Lapis from '../../assets/lapis.png'
const IconeEditar = () => <span>✏️</span>
const IconeLixo = () => <span>🗑️</span>

function GerenciarJogos() {
  // --- SIMULAÇÃO DE PERFIL ---
  // Mude para false para ver como fica para um usuário comum
  const isAdmin = true

  const [jogos, setJogos] = useState([
    { id: 1, nome: 'CyberPunk 2077', preco: '199,90', imagem: 'https://via.placeholder.com/100' },
    { id: 2, nome: 'Silent Hill 2', preco: '259,90', imagem: 'https://via.placeholder.com/100' },
    {
      id: 3, nome: 'Grand Theft Auto V', preco: '72,90', imagem: 'https://via.placeholder.com/100'
    }
  ])

  return (
    <div className="layout-admin">

      {/* 1. HEADER AMARELO */}
      <header className="top-bar">
        <button className="logo-area"> <img src={LogoImg} alt="Logo Notorious" className="logo-img" /> </button>
        <div className="top-icons">
          <button className='btn-icone'> <img src={Carrinho} className="icone-img" /> </button>
          <button className='btn-icone'> <img src={Perfil} className="icone-img" /> </button>
        </div>
      </header>

      {isAdmin && (
        <div className="container-botoes-topo">
          {/* Esquerda */}
          <button className="btn-adicionar-jogo">Adicionar Jogo</button>

          {/* Direita (O Novo Botão) */}
          <button className="btn-adicionar-categoria">Nova Categoria</button>
        </div>
      )}

      {/* 2. ÁREA DE CONTEÚDO */}
      <main className="main-content">

        {/* 3. O GRANDE CONTAINER PRETO */}
        <div className="black-container">

          {jogos.map(jogo => (
            <div key={jogo.id} className="card-cinza">

              {/* Lado Esquerdo: Imagem */}
              <img src={jogo.imagem} alt={jogo.nome} className="img-jogo" />

              {/* Meio: Informações */}
              <div className="info-jogo">
                <h3>{jogo.nome}</h3>
                <p className="preco">{jogo.preco}</p>
              </div>

              {/* Lado Direito: AÇÕES (A Lógica Condicional) */}
              <div className="acoes-jogo">
                {isAdmin ? (
                  // SE FOR ADMIN: Vê Editar e Excluir
                  <>
                    <button className="btn-acao"><IconeEditar /></button>
                    <button className="btn-acao"><IconeLixo /></button>
                  </>
                ) : (
                  // SE NÃO FOR ADMIN: Vê Comprar
                  <button className="btn-comprar-user">Comprar</button>
                )}
              </div>

            </div>
          ))}

        </div>

      </main>
    </div>
  )
}

export default GerenciarJogos