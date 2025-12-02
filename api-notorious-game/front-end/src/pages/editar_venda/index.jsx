import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import styles from './style.module.css'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function EditarVenda() {
  const { id } = useParams();
  const [menuAberto, setMenuAberto] = useState(false)
  const navigate = useNavigate();

  const [form, setForm] = useState({
    idUsuario: "",
    dataVenda: "",
    statusVenda: "PAGO",
    produtos: []
  });

  const [usuarios, setUsuarios] = useState([]);
  const [buscaUsuario, setBuscaUsuario] = useState('');
  const [sugestoes, setSugestoes] = useState([]);

  const [jogos, setJogos] = useState([]);
  const [buscaJogo, setBuscaJogo] = useState('');
  const [sugestoesJogos, setSugestoesJogos] = useState([]);
  const [idJogoSelecionado, setIdJogoSelecionado] = useState(null);

  function formatarDataParaBr(dataISO) {
    if (!dataISO) return "";
    const partes = dataISO.split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataISO;
  }

  useEffect(() => {
    async function loadListas() {
      const token = localStorage.getItem('token');
      try {
        // Carrega Usuários
        const responseUsuarios = await api.get('/usuarios', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuarios(responseUsuarios.data);

        // Carrega Jogos
        const responseJogos = await api.get('/jogos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJogos(responseJogos.data);

      } catch (error) {
        console.error("Erro ao carregar listas.", error);
      }
    }
    loadListas();
  }, [id])

  //Lógica Usuário
  function handleBuscaUsuario(e) {
    const texto = e.target.value;
    setBuscaUsuario(texto);

    if (texto.length > 0) {
      const filtrados = usuarios.filter(u =>
        u.nomeUsuario.toLowerCase().includes(texto.toLowerCase()) ||
        u.email.toLowerCase().includes(texto.toLowerCase())
      );
      setSugestoes(filtrados);
    } else {
      setSugestoes([]);
    }
  }

  function selecionarUsuario(usuario) {
    setBuscaUsuario(usuario.nomeUsuario);
    setForm({ ...form, idUsuario: usuario.idUsuario });
    setSugestoes([]);
  }

  //Lógica Jogo
  function handleBuscaJogo(e) {
    const texto = e.target.value;
    setBuscaJogo(texto);

    if (texto.length > 0) {
      const filtrados = jogos.filter(j =>
        j.nomeJogo.toLowerCase().includes(texto.toLowerCase())
      );
      setSugestoesJogos(filtrados);
    } else {
      setSugestoesJogos([]);
    }
  }

  function selecionarJogo(jogo) {
    setBuscaJogo(jogo.nomeJogo);
    setIdJogoSelecionado(jogo.idJogo);
    setSugestoesJogos([]);
  }

  function adicionarJogo() {
    if (!idJogoSelecionado) {
      alert("Selecione um jogo da lista primeiro!")
      return;
    }

    setForm({
      ...form,
      produtos: [
        ...form.produtos,
        {
          idJogo: idJogoSelecionado,
          nomeJogo: buscaJogo
        }
      ]
    });
    setBuscaJogo('');
    setIdJogoSelecionado(null);
  }

  function removerJogo(indexParaRemover) {
    const novaLista = form.produtos.filter((_, index) => index !== indexParaRemover)
    setForm({ ...form, produtos: novaLista })
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvarAlteracoes() {
    const token = localStorage.getItem('token');

    const body = {
      idUsuario: Number(form.idUsuario),
      dataVenda: form.dataVenda,
      statusVenda: form.statusVenda,
      produtos: form.produtos.map(produtos => ({ idJogo: produtos.idJogo }))
    };
    try {
      await api.put(`/vendas/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Venda atualizada com sucesso!");
      navigate('/vendas');
    } catch (error) {
      console.error("Erro no alteração", error);
      alert("Erro ao atualizar. Verifique a data e os IDs.");
    }
  }

  // FUNÇÃO PARA SAIR DA CONTA
  function fazerLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className={styles['layout-admin']}>
      <header className={styles['top-bar']}>
        <button className={styles['logo-area']} onClick={() => navigate('/home')}>
          <img src={LogoImg} alt="Logo" className={styles['logo-img']} />
        </button>
        <div className={styles['top-icons']}>
          <div className={styles['perfil-container']}>
            <button
              className={styles['btn-icone']}
              onClick={() => setMenuAberto(!menuAberto)}
              title="Perfil"
            >
              <img src={Perfil} alt="Perfil" className={styles['icone-img']} />
            </button>
            {menuAberto && (
              <div className={styles['dropdown-menu']}>
                <button onClick={fazerLogout} className={styles['btn-sair']}>
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className={styles['main-content']}>

        {/* CONTAINER PRETO */}
        <div className={`${styles['black-container']} ${styles['cadastro-layout']}`}>

          {/* LADO ESQUERDO */}
          <div className={styles['form-esquerda']}>
            <h2 className={styles['titulo-amarelo']}>Dados da Venda #{id}</h2>

            <label className={styles['label-form']}>Cliente (Busque por nome)</label>
            <div style={{ position: 'relative' }}>
              <input
                value={buscaUsuario}
                onChange={handleBuscaUsuario}
                placeholder="Digite o nome..."
                className={styles['input-select']}
                type="text"
                autoComplete="off"
              />

              {sugestoes.length > 0 && (
                <ul className={styles['lista-sugestoes']}>
                  {sugestoes.map(u => (
                    <li key={u.idUsuario} onClick={() => selecionarUsuario(u)}>
                      {u.nomeUsuario} <small>({u.email})</small>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label className={styles['label-form']}>Data da Venda</label>
            <input
              name="dataVenda"
              value={form.dataVenda}
              onChange={handleChange}
              placeholder="DD/MM/AAAA"
              className={styles['input-select']}
              type="text"
              maxLength="10"
            />

            <label className={styles['label-form']}>Status da Venda</label>
            <select
              name="statusVenda"
              value={form.statusVenda}
              onChange={handleChange}
              className={styles['input-select']}
            >
              <option value="PENDENTE">PENDENTE</option>
              <option value="PAGO">PAGO</option>
              <option value="CANCELADO">CANCELADO</option>
            </select>
          </div>

          {/* RISCO DIVISOR */}
          <div className={styles['divisor-vertical']}></div>

          {/* LADO DIREITO */}
          <div className={styles['form-direita']} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <h2 className={styles['titulo-branco']}>Adicionar Jogos</h2>

            <div className={styles['add-jogo-container']} style={{position: 'relative'}}>
              <input
                value={buscaJogo}
                onChange={handleBuscaJogo}
                placeholder="Digite o nome do jogo..."
                className={styles['input-select']} // Pode aumentar a largura no CSS se quiser
                autoComplete="off"
                style={{width: '80%'}}
              />
              <button type="button" onClick={adicionarJogo} className={styles['btn-add-mini']}>
                +
              </button>

              {/* Lista Flutuante de Jogos */}
              {sugestoesJogos.length > 0 && (
                  <ul className={styles['lista-sugestoes']} style={{width: '80%'}}>
                      {sugestoesJogos.map(j => (
                          <li key={j.idJogo} onClick={() => selecionarJogo(j)}>
                              {j.nomeJogo}
                          </li>
                      ))}
                  </ul>
              )}
            </div>

            {/* Lista dos jogos já adicionados */}
            <div className={styles['lista-ids-jogos']}>
              {form.produtos && form.produtos.map((prod, index) => (
                <div key={index} className={styles['chip-jogo']}>
                  <span>{prod.nomeJogo || `Jogo #${prod.idJogo}`}</span>
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
              <button className={styles['btn-cancelar']} onClick={() => navigate('/vendas')}>Cancelar</button>
              <button className={styles['btn-salvar']} onClick={salvarAlteracoes}>Salvar Alterações</button>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}

export default EditarVenda