import { useState } from 'react'
import styles from './style.module.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function EditarVenda() {

  const [form, setForm] = useState({
    idUsuario: "2",
    dataVenda: "25/07/2025", 
    statusVenda: "PENDENTE",
    produtos: [
      { idJogo: 3 },
      { idJogo: 4 }
    ]
  })

  const [novoIdJogo, setNovoIdJogo] = useState('')

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

  return (
    <div className={styles['layout-admin']}>

      {/* HEADER */}
      <header className={styles['top-bar']}>
        <button className={styles['logo-area']}> 
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
            <h2 className={styles['titulo-amarelo']}>Dados da Venda</h2>

            <label className={styles['label-form']}>ID do Usuário</label>
            <input
              name="idUsuario"
              value={form.idUsuario}
              onChange={handleChange}
              placeholder="ID Usuário"
              // Adicionei a classe de input padrão se não tiver específica
              className={styles['input-select']} 
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
              <option value="CONCLUIDO">PAGO</option>
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
              {form.produtos.map((prod, index) => (
                <div key={index} className={styles['chip-jogo']}>
                  <span>ID Jogo: <strong>{prod.idJogo}</strong></span>
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
              <button className={styles['btn-cancelar']}>Cancelar</button>
              <button className={styles['btn-salvar']}>Salvar Alterações</button>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}

export default EditarVenda