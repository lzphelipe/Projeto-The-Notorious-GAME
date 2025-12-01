import { useState } from 'react'
import './style.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'
import Carrinho from '../../assets/carrinho-de-compras.png'

function CadastrarJogo() {
  
  // Estado para guardar os dados do formulário
  const [form, setForm] = useState({
    nome: '',
    desenvolvedora: '',
    genero: '',
    preco: '',
    imagem: '' // O 5º campo que você pediu
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="layout-admin">
      
      {/* HEADER (Igual ao das outras páginas) */}
      <header className="top-bar">
        <button className="logo-area"> 
            <img src={LogoImg} alt="Logo Notorious" className="logo-img" /> 
        </button>
        <div className="top-icons">
          <button className='btn-icone'> <img src={Carrinho} className="icone-img" /> </button>
          <button className='btn-icone'> <img src={Perfil} className="icone-img" /> </button>
        </div>
      </header>

      <main className="main-content">
        
        {/* O CONTAINER PRETO */}
        <div className="black-container">
           
           {/* LADO ESQUERDO: O Formulário */}
           <div className="form-esquerda">
              <input 
                placeholder="Nome do Jogo" 
                name="nome" 
                value={form.nome} 
                onChange={handleChange} 
              />
              <input 
                placeholder="Desenvolvedora (Ex: Konami)" 
                name="desenvolvedora" 
                value={form.desenvolvedora} 
                onChange={handleChange} 
              />
              <input 
                placeholder="Gênero (Ex: Terror)" 
                name="genero" 
                value={form.genero} 
                onChange={handleChange} 
              />
              <input 
                placeholder="Preço (Ex: 249,90)" 
                name="preco" 
                value={form.preco} 
                onChange={handleChange} 
              />
              <input 
                placeholder="URL da Imagem" 
                name="imagem" 
                value={form.imagem} 
                onChange={handleChange} 
              />
           </div>

           {/* O RISCO NO MEIO */}
           <div className="divisor-vertical"></div>

           {/* LADO DIREITO: Texto e Botões */}
           <div className="form-direita">
              <h2>Você deseja salvar esse jogo no banco de dados?</h2>
              
              <div className="grupo-botoes">
                 <button className="btn-cancelar">Cancelar</button>
                 <button className="btn-salvar">Salvar</button>
              </div>
           </div>

        </div>

      </main>
    </div>
  )
}

export default CadastrarJogo