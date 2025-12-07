describe('Testes de Sistema (Conforme Tabela) - The Notorious GAME', () => {

  // Função auxiliar para Login (para não repetir código)
  function fazerLogin(email, senha) {
    cy.get('input[placeholder="E-mail"]').clear().type(email);
    cy.get('input[placeholder="Senha"]').clear().type(senha);
    cy.contains('button', 'Entrar').click();
    // Como não tem alerta, validamos se mudou para a Home
    cy.url().should('include', '/home');
  }

  beforeEach(() => {
    cy.visit('/'); // Abre o site antes de cada teste
  });

  // ===========================================================================
  // CT-001: Realizar Compra de Jogo (Cliente)
  // ===========================================================================
  it('CT-001: Cliente realiza uma compra com sucesso', () => {
    // 1. Pré-condição: Login como Cliente
    fazerLogin('murcego@gmail.com', '12345');

    // 2. Passo: Clicar em "Comprar" (Na Home)
    // Espera os jogos carregarem
    cy.contains('R$', { timeout: 10000 }).should('be.visible');
    
    // Clica no primeiro botão "Comprar"
    cy.contains('button', 'Comprar').first().click();
    cy.wait(500); 

    // 3. Passo: Acessar o Carrinho
    cy.visit('/carrinho');

    // Valida se tem produto (procura pelo preço ou botão remover)
    cy.contains('R$').should('be.visible');

    // Preparar espião para o alerta FINAL
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertaFinal');
    });

    // 4. Passo: Clicar em "Finalizar Compra"
    cy.contains('button', 'Finalizar Compra').click();

    // Resultado Esperado: Alerta de Sucesso e Carrinho Vazio/Home
    cy.get('@alertaFinal').should('have.been.calledWithMatch', /sucesso/i);
    cy.url().should('include', '/home');
  });

  // ===========================================================================
  // CT-002: Controle de Acesso (Admin Bloqueado)
  // ===========================================================================
  it('CT-002: Administrador tenta realizar uma compra (Bloqueio)', () => {
    // 1. Pré-condição: Login como ADMIN
    fazerLogin('admin@notorious.com', '0880');

    // 2. Passo: Adicionar jogo ao carrinho
    cy.contains('R$', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Comprar').first().click();
    cy.wait(500);

    // 3. Passo: Acessar o Carrinho
    cy.visit('/carrinho');
    cy.contains('R$').should('be.visible');

    // Preparar espião para o alerta de ERRO
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertaBloqueio');
    });

    // 4. Passo: Clicar em "Finalizar Compra"
    cy.contains('button', 'Finalizar Compra').click();

    // Resultado Esperado: Alerta de "Ação não permitida"
    cy.get('@alertaBloqueio').should('have.been.calledWithMatch', /não permitida|Admin/i);
    
    // Opcional: Verificar se CONTINUA na página do carrinho (não redirecionou)
    cy.url().should('include', '/carrinho');
  });

  // ===========================================================================
  // CT-003: Gerenciar Jogos (Admin Cadastra Novo)
  // ===========================================================================
  it('CT-003: Admin cadastra um novo jogo', () => {
    // Gera um nome único para não dar erro de duplicidade no teste repetido
    const nomeJogoTeste = 'Jogo Epic ' + Date.now();

    // 1. Pré-condição: Login como ADMIN
    fazerLogin('admin@notorious.com', '0880');

    // 2. Passo: Acessar menu "Adicionar Jogo"
    cy.visit('/jogos/novo');

    // 3. Passo: Preencher campos
    cy.get('input[name="nomeJogo"]').type(nomeJogoTeste);
    cy.get('input[name="nomeCategoria"]').type('Ação');
    cy.get('input[name="desenvolvedoraJogo"]').type('Epic Games');
    cy.get('input[name="precoJogo"]').type('89.90');
    cy.get('input').filter('[placeholder*="imagem"], [name="urlImagem"]').type('https://images-na.ssl-images-amazon.com/images/I/91H2eLl5TTL.jpg');

    // Preparar espião para o alerta de SUCESSO
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertaCadastro');
    });

    // 4. Passo: Clicar em "Salvar"
    cy.contains('button', 'Salvar').click();

    // Resultado Esperado: Alerta de Sucesso e Redirecionamento
    cy.get('@alertaCadastro').should('have.been.calledWithMatch', /sucesso/i);
    cy.url().should('include', '/jogos'); 
    
    // Verifica se o jogo novo apareceu na lista
    cy.contains(nomeJogoTeste).should('be.visible');
  });
});