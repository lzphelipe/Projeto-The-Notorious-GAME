import { useState } from 'react'
import './style.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Carrinho from '../../assets/carrinho-de-compras.png'

// Ícones simples
const IconeLixo = () => <span style={{ fontSize: '20px' }}>🗑️</span>
const IconeEditar = () => <span style={{ fontSize: '20px' }}>✏️</span>

function GerenciarUsuarios() {

  const [usuarios, setUsuarios] = useState([
  ])

  const [busca, setBusca] = useState('')

  return (
    <div className="layout-admin">

      <header className="top-bar">
        <button className="logo-area">
          <img src={LogoImg} alt="Logo Notorious" className="logo-img" />
        </button>
        <div className="top-icons">
          <button className='btn-icone'> <img src={Carrinho} className="icone-img" /> </button>
          <button className='btn-icone'> <img src={Perfil} className="icone-img" /> </button>
        </div>
      </header>

      <main className="main-content-tabela">

        {/* AQUI MUDEI PARA CLASSNAME NOVO PRA FICAR LARGO */}
        <div className="container-tabela-larga">

          <div className="header-conteudo">
            <input
              type="text"
              placeholder="Pesquisar usuário..."
              className="barra-pesquisa"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <table className="tabela-usuarios">
            <thead>
              <tr>
                {/* Adicionei 'texto-centro' no ID */}
                <th className="texto-centro">ID</th>

                <th>Nome Completo</th>
                <th>CPF</th>
                <th>E-Mail</th>

                {/* Adicionei 'texto-centro' na SENHA para alinhar com as estrelinhas */}
                <th className="texto-centro">Senha</th>

                {/* Adicionei nos botões também para ficar simétrico */}
                <th className="texto-centro">Editar</th>
                <th className="texto-centro">Excluir</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.filter(user =>
                user.nome.toLowerCase().includes(busca.toLowerCase())
              ).map((user) => (
                <tr key={user.id}>
                  <td className="texto-centro">{user.id}</td>
                  <td>{user.nome}</td>
                  <td>{user.cpf}</td>
                  <td>{user.email}</td>
                  <td className="texto-centro">**********</td>

                  {/* BOTÃO EDITAR */}
                  <td className="texto-centro">
                    <button className="btn-editar-tabela">
                      <IconeEditar />
                    </button>
                  </td>

                  {/* BOTÃO EXCLUIR */}
                  <td className="texto-centro">
                    <button className="btn-excluir-tabela">
                      <IconeLixo />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </main>
    </div>
  )
}

export default GerenciarUsuarios