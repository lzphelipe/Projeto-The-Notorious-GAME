import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css' // Use o mesmo CSS do editar
import api from '../../services/api'

import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

function CadastrarVenda() {
  const navigate = useNavigate()
  const [menuAberto, setMenuAberto] = useState(false)

  // --- ESTADOS DO FORMULÁRIO ---
  const [idUsuarioSelecionado, setIdUsuarioSelecionado] = useState('')
  const [produtos, setProdutos] = useState([]) // Lista final para enviar

  // --- ESTADOS DE AUTOCOMPLETE (CLIENTE) ---
  const [usuarios, setUsuarios] = useState([])
  const [buscaUsuario, setBuscaUsuario] = useState('')
  const [sugestoesUsuarios, setSugestoesUsuarios] = useState([])

  // --- ESTADOS DE AUTOCOMPLETE (JOGO) ---
  const [jogos, setJogos] = useState([])
  const [buscaJogo, setBuscaJogo] = useState('')
  const [sugestoesJogos, setSugestoesJogos] = useState([])
  const [jogoSelecionadoTemp, setJogoSelecionadoTemp] = useState(null) // {id, nome}

  // 1. CARREGAR LISTAS AO ABRIR A TELA
  useEffect(() => {
    async function loadListas() {
        const token = localStorage.getItem('token');
        try {
            const resUsers = await api.get('/usuarios', { headers: { Authorization: `Bearer ${token}` }});
            setUsuarios(resUsers.data);

            const resJogos = await api.get('/jogos', { headers: { Authorization: `Bearer ${token}` }});
            setJogos(resJogos.data);
        } catch (error) {
            console.error("Erro ao carregar listas", error);
        }
    }
    loadListas();
  }, [])


  // --- LÓGICA DE CLIENTE ---
  function handleBuscaUsuario(e) {
    const texto = e.target.value;
    setBuscaUsuario(texto);

    if (texto.length > 0) {
      const filtrados = usuarios.filter(u =>
        (u.nomeUsuario.toLowerCase().includes(texto.toLowerCase()) ||
        u.email.toLowerCase().includes(texto.toLowerCase()))
        && u.perfil === 'CLIENTE'
      );
      setSugestoesUsuarios(filtrados);
    } else {
      setSugestoesUsuarios([]);
    }
  }

  function selecionarUsuario(usuario) {
    setBuscaUsuario(usuario.nomeUsuario);
    setIdUsuarioSelecionado(usuario.idUsuario);
    setSugestoesUsuarios([]);
  }

  // --- LÓGICA DE JOGO ---
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

  function selecionarJogoDaLista(jogo) {
    setBuscaJogo(jogo.nomeJogo);
    setJogoSelecionadoTemp(jogo);
    setSugestoesJogos([]);
  }

  function adicionarJogo() {
    if (!jogoSelecionadoTemp) {
        alert("Selecione um jogo da lista primeiro!");
        return;
    }
    // Adiciona na lista visual e de envio
    setProdutos([...produtos, { idJogo: jogoSelecionadoTemp.idJogo, nomeJogo: jogoSelecionadoTemp.nomeJogo }]);
    
    // Limpa
    setBuscaJogo('');
    setJogoSelecionadoTemp(null);
  }

  function removerJogo(index) {
    const novaLista = produtos.filter((_, i) => i !== index);
    setProdutos(novaLista);
  }

  // --- SALVAR VENDA ---
  async function salvarVenda() {
    if (!idUsuarioSelecionado) {
      alert("Selecione um cliente!");
      return;
    }
    if (produtos.length === 0) {
      alert("Adicione pelo menos um jogo!");
      return;
    }

    const token = localStorage.getItem('token');

    const body = {
      idUsuario: idUsuarioSelecionado,
      produtos: produtos.map(p => ({ idJogo: p.idJogo })) // Mapeia só o ID pro Java
    };

    try {
      await api.post('/vendas', body, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Venda cadastrada com sucesso!");
      navigate('/vendas');

    } catch (error) {
      console.error("Erro", error);
      if (error.response?.status === 403) {
          alert("Erro: O Admin não tem permissão para CRIAR vendas neste endpoint. (Verifique SecurityConfig)");
      } else {
          alert("Erro ao cadastrar venda.");
      }
    }
  }

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
            <button className={styles['btn-icone']} onClick={() => setMenuAberto(!menuAberto)}>
              <img src={Perfil} className={styles['icone-img']} />
            </button>
            {menuAberto && (
                <div className={styles['dropdown-menu']}>
                    <button onClick={fazerLogout} className={styles['btn-sair']}>Sair</button>
                </div>
            )}
          </div>
        </div>
      </header>

      <main className={styles['main-content']}>
        <div className={`${styles['black-container']} ${styles['cadastro-layout']}`}>
          
          {/* ESQUERDA: CLIENTE */}
          <div className={styles['form-esquerda']}>
            <h2 className={styles['titulo-amarelo']}>Nova Venda</h2>

            <label className={styles['label-form']}>Cliente</label>
            <div style={{position: 'relative'}}>
                <input
                  value={buscaUsuario}
                  onChange={handleBuscaUsuario}
                  placeholder="Busque o cliente..."
                  className={styles['input-select']}
                  type="text"
                  autoComplete="off"
                />
                {sugestoesUsuarios.length > 0 && (
                    <ul className={styles['lista-sugestoes']}>
                        {sugestoesUsuarios.map(u => (
                            <li key={u.idUsuario} onClick={() => selecionarUsuario(u)}>
                                {u.nomeUsuario || u.nome}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* Data e Status são automáticos na criação, não precisa mostrar */}
          </div>

          <div className={styles['divisor-vertical']}></div>

          {/* DIREITA: JOGOS */}
          <div className={styles['form-direita']} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <h2 className={styles['titulo-branco']}>Itens</h2>
            <label className={styles['label-form']}>Jogos</label>
            <div className={styles['add-jogo-container']} style={{position: 'relative'}}>
              <input
                value={buscaJogo}
                onChange={handleBuscaJogo}
                placeholder="Busque o jogo..."
                className={styles['input-select']}
                type= "text"
                autoComplete="off"
              />
              <button type="button" onClick={adicionarJogo} className={styles['btn-add-mini']}>+</button>

              {sugestoesJogos.length > 0 && (
                  <ul className={styles['lista-sugestoes']} style={{width: '80%'}}>
                      {sugestoesJogos.map(j => (
                          <li key={j.idJogo} onClick={() => selecionarJogoDaLista(j)}>
                              {j.nomeJogo}
                          </li>
                      ))}
                  </ul>
              )}
            </div>

            <div className={styles['lista-ids-jogos']}>
              {produtos.map((prod, index) => (
                <div key={index} className={styles['chip-jogo']}>
                  <span>{prod.nomeJogo}</span>
                  <button onClick={() => removerJogo(index)} className={styles['btn-remove-mini']}>x</button>
                </div>
              ))}
            </div>

            <div className={styles['grupo-botoes']} style={{ marginTop: 'auto', paddingTop: '30px' }}>
              <button className={styles['btn-cancelar']} onClick={() => navigate('/vendas')}>Cancelar</button>
              <button className={styles['btn-salvar']} onClick={salvarVenda}>Cadastrar</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default CadastrarVenda