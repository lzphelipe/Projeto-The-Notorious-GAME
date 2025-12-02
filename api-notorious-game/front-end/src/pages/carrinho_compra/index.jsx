import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import styles from './style.module.css'
import LogoImg from '../../assets/logo_notorious.png'
import Perfil from '../../assets/do-utilizador.png'

const IconeLixo = () => <span>🗑️</span>

function Carrinho() {

    const [itens, setItens] = useState([])
    const [total, setTotal] = useState(0)
    const [menuAberto, setMenuAberto] = useState(false)
    const navigate = useNavigate()

    // 1. CARREGAR ITENS
    useEffect(() => {
        const carrinhoSalvo = localStorage.getItem('carrinho')
        if (carrinhoSalvo) {
            const lista = JSON.parse(carrinhoSalvo)
            setItens(lista)
            calcularTotal(lista)
        }
    }, [])

    // Função auxiliar para calcular total
    const calcularTotal = (lista) => {
        const soma = lista.reduce((acc, item) => acc + Number(item.precoJogo), 0)
        setTotal(soma)
    }

    // 2. FUNÇÃO REMOVER ITEM
    function removeItem(idJogoParaRemover) {
        const novaLista = itens.filter(item => item.idJogo !== idJogoParaRemover)
        setItens(novaLista)
        calcularTotal(novaLista)
        localStorage.setItem('carrinho', JSON.stringify(novaLista))
    }

    // 3. FUNÇÃO FINALIZAR COMPRA (Manda pro Java)
    async function finalizarCompra() {
        const idUsuario = localStorage.getItem('idUsuario');
        const token = localStorage.getItem('token');
        const perfil = localStorage.getItem('perfil');

        if (perfil === 'ADMIN') {
            alert("Ação não permitida!\nAdministradores não podem realizar compras.");
            return;
        }
        if (!idUsuario || !token) {
            alert("Erro de sessão. Faça login novamente.");
            navigate('/');
            return;
        }
        if (itens.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        const vendaData = {
            idUsuario: idUsuario,
            produtos: itens.map(item => ({ idJogo: item.idJogo }))
        };

        try {
            await api.post('/vendas', vendaData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Compra realizada com sucesso!");
            localStorage.removeItem('carrinho');
            setItens([]);
            navigate('/home');

        } catch (error) {
            console.error("Erro na compra", error);
            alert("Erro ao finalizar compra.");
        }
    }

    // FUNÇÃO PARA SAIR DA CONTA
    function fazerLogout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className={styles['layout-admin']}>

            {/* HEADER */}
            <header className={styles['top-bar']}>
                <button className={styles['logo-area']} onClick={() => navigate('/home')}>
                    <img src={LogoImg} alt="Logo" className={styles['logo-img']} />
                </button>
                <div className={styles['top-icons']}>

                    {/* --- AQUI MUDA: Botão de Perfil com Menu --- */}
                    <div className={styles['perfil-container']}>

                        {/* O Botão agora só abre/fecha o menu, não faz logout direto */}
                        <button
                            className={styles['btn-icone']}
                            onClick={() => setMenuAberto(!menuAberto)}
                            title="Perfil"
                        >
                            <img src={Perfil} alt="Perfil" className={styles['icone-img']} />
                        </button>

                        {/* O Menu Pop-up (Só aparece se menuAberto for true) */}
                        {menuAberto && (
                            <div className={styles['dropdown-menu']}>
                                {/* Aqui sim fica o botão de sair */}
                                <button onClick={fazerLogout} className={styles['btn-sair']}>
                                    Sair
                                </button>
                            </div>
                        )}

                    </div>

                </div>
            </header>

            <main className={styles['main-content-carrinho']}>

                <div className={styles['container-carrinho']}>

                    {/* LADO ESQUERDO: Lista de Produtos */}
                    <div className={styles['coluna-produtos']}>
                        <h1 className={styles['titulo-carrinho']}>Seu Carrinho ({itens.length} itens)</h1>

                        <div className={styles['lista-itens']}>
                            {itens.length === 0 ? <p>Carrinho vazio.</p> : itens.map(item => (
                                <div key={item.idJogo} className={styles['card-item-carrinho']}>

                                    {/* Imagem */}
                                    <img
                                        src={item.urlImagem ? item.urlImagem : "https://placehold.co/100"}
                                        alt={item.nomeJogo}
                                        className={styles['img-item']}
                                    />

                                    {/* Detalhes */}
                                    <div className={styles['info-item']}>
                                        <h3 className={styles['nome-jogo']}>{item.nomeJogo}</h3>
                                        <p className={styles['plataforma']}>{item.categoria?.nomeCategoria}</p>
                                    </div>

                                    {/* Preço */}
                                    <div className={styles['preco-item']}>
                                        <p>R$ {Number(item.precoJogo).toFixed(2).replace('.', ',')}</p>
                                    </div>

                                    {/* Remover */}
                                    <button className={styles['btn-remover']} onClick={() => removeItem(item.idJogo)}>
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

                            <div className={styles['linha-total']}>
                                <span>Total</span>
                                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                            </div>

                            <button className={styles['btn-finalizar']} onClick={finalizarCompra}>
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