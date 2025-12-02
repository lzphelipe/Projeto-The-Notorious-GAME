# 🎮 **The Notorious GAME**

> Sistema web para gerenciamento de uma loja de jogos, desenvolvido como projeto da disciplina **Engenharia de Software (GCC188)**.
> O sistema simula um e-commerce completo, permitindo a interação de clientes com o catálogo e fornecendo um painel administrativo robusto para gestão do negócio.

---

## 💡 CONTEXTO DO PROBLEMA E SOLUÇÃO

### Descrição do Problema
O gerenciamento manual ou por planilhas de um estoque e das vendas em uma loja de jogos pode ser ineficiente, propenso a erros e dificultar o controle financeiro e a tomada de decisões. Clientes precisam de uma maneira rápida e fácil de consultar o catálogo, e a equipe precisa de um sistema centralizado para registrar vendas, gerenciar o estoque de jogos e controlar as informações dos usuários.

### Descrição da Solução
**The Notorious GAME** é um **sistema web** que centraliza todas as operações de gerenciamento de uma loja de jogos. Ele propicia o **cadastro, edição e remoção de jogos**, além de permitir o **gerenciamento de usuários** e o **registro e controle completo das vendas**. A solução visa resolver a dor da **ineficiência operacional e da falta de controle de dados**, oferecendo uma interface simples e intuitiva para que a loja mantenha o foco no atendimento ao cliente.

---

# 🚀 Como Executar o Projeto

Este guia está dividido em duas partes:
1.  **Instruções de Uso:** Para quem deseja apenas rodar e testar a aplicação.
2.  **Guia do Desenvolvedor:** Para quem deseja configurar o ambiente para alterar o código.

---

## 🏃 1. INSTRUÇÕES DE USO (Rodar a Aplicação)

Siga estes passos para colocar o sistema no ar utilizando apenas o terminal.

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* **Java JDK 17** ou superior.
* **Node.js** (v18+).
* **PostgreSQL** (com o serviço rodando).

### Passo 1: Configuração do Banco de Dados
1.  Abra seu gerenciador de banco de dados (pgAdmin, DBeaver ou Terminal).
2.  Crie um banco de dados com o nome exato: **`api-notorious`**.
3.  *Não é necessário criar tabelas, o Backend fará isso automaticamente na primeira execução.*

### Passo 2: Executando o Back-end
1.  Abra o terminal na pasta raiz do projeto.
2.  Entre na pasta do servidor:
    ```bash
    cd backend
    ```
3.  Execute o comando para baixar as dependências e subir a API (sem precisar instalar Maven):
    * **Windows:**
        ```bash
        ./mvnw spring-boot:run
        ```
    * **Linux / Mac:**
        ```bash
        ./mvnw spring-boot:run
        ```
4.  Aguarde a mensagem: `Started NotoriousGameApplication in ... seconds`.

### Passo 3: Executando o Front-end
1.  Abra um **novo terminal** (mantenha o anterior rodando).
2.  Entre na pasta da interface:
    ```bash
    cd frontend
    ```
3.  Instale as dependências (apenas na primeira vez):
    ```bash
    npm install
    ```
4.  Inicie a interface:
    ```bash
    npm run dev
    ```
5.  O terminal exibirá o link de acesso: **`http://localhost:5173`**.

---

## 💻 2. GUIA DO DESENVOLVEDOR (Setup de DEV)

Se você faz parte da equipe de desenvolvimento, siga estas instruções para configurar sua IDE e contribuir com o código.

### 🔧 Ferramentas Recomendadas
* **Backend:** IntelliJ IDEA (Community ou Ultimate).
* **Frontend:** VS Code com extensões (ESLint, Prettier, Simple React Snippets).
* **Git:** Git Bash ou cliente visual (GitHub Desktop/GitKraken).

### 📥 Clonando o Repositório
Em uma pasta de sua preferência, use o comando abaixo para clonar o repositório e começar as alterações:

```bash
git clone https://github.com/lzphelipe/Projeto-The-Notorious-GAME.git

---

## 🚀 TECNOLOGIAS UTILIZADAS

| Camada | Tecnologias |
|:-------|:-------------|
| **Backend** | ☕ [Java 17] • ⚙️ [Spring Boot 4.0.0] |
| **Frontend** | ⚛️ [React 19] + [Vite] |
| **Banco de Dados** | 🐘 [PostgreSQL] |
| **IDE** | 💡 [IntelliJ IDEA] • [Visual Studio Code] |
| **Gerenciador de Dependências** | 📦 [Maven] • [npm] |

---

## 🧩 FUNCIONALIDADES PRINCIPAIS

O sistema conta com módulos distintos para **Administradores** e **Clientes**:

### 🛍️ Para o Cliente (Loja Virtual)
- **Catálogo Interativo:** Visualização de jogos com capas, preços e categorias.
- **Busca Inteligente:** Barra de pesquisa para filtrar jogos em tempo real.
- **Carrinho de Compras:** Adição de itens e cálculo automático de subtotal.
- **Autenticação:** Cadastro de conta e Login seguro.

### 🛡️ Para o Administrador (Backoffice)
- **Gestão de Produtos:** CRUD completo de Jogos.
- **Gestão de Categorias:** Organização dos jogos por gênero (ex: RPG, Ação).
- **Controle de Usuários:** Visualização e gerenciamento da base de clientes.
- **Gestão de Vendas:** Visualização e gerenciamento da base de vendas.

---

## 📂 ORGANIZAÇÃO DO PROJETO

O repositório adota uma arquitetura de separação clara entre cliente e servidor, onde o Front-end e o Back-end residem em diretórios distintos na raiz do projeto.

### Estrutura de Diretórios

```text
api-notorious-game/
│
├── 📂 back-end/                # API RESTful (Java + Spring Boot)
│   ├── 📄 pom.xml              # Gerenciador de Dependências Maven
│   ├── 📄 mvnw                 # Wrapper do Maven (Para rodar sem instalar)
│   ├── 📂 src/main/java        # Código fonte Java
│   │   └── com/br/notoriousGAME/apiNotoriousGAME
│   │       ├── 📦 controller   # Endpoints da API (Recebem as requisições)
│   │       ├── 📦 service      # Regras de Negócio
│   │       ├── 📦 repository   # Comunicação com o Banco de Dados (JPA)
│   │       ├── 📦 data         # DTOs (Objetos de Transferência), Entity (Entidades do Banco de Dados)
│   │       ├── 📦 infra        # Configurações de Segurança/Cors
│   │       └── 📦 exceptions   # Tratamento de Erros
│   └── 📂 src/main/resources   # Configurações (application.properties)
│
├── 📂 front-end/               # Interface do Usuário (React + Vite)
│   ├── 📄 package.json         # Gerenciador de Dependências Node
│   ├── 📄 vite.config.js       # Configuração do Vite
│   ├── 📂 public/              # Arquivos estáticos
│   └── 📂 src/
│       ├── 📂 assets           # Imagens e Logotipos
│       ├── 📂 services         # Configuração do Axios (api.js)
│       ├── 📄 index.css        # Configurações gerais do site (Fonte, Tamanho, Plano de Fundo)
│       ├── 📄 main.jsx         # Ponto de entrada e Rotas
│       └── 📂 pages            # Telas do Sistema
│           ├── 📂 home
│           ├── 📂 login_usuario
│           ├── 📂 cadastro_jogo
│           ├── 📂 gerenciar_vendas
│           └── ... (outras páginas)
│
├── 📂 documentos/              # Documentação do Projeto
│   ├── 📂 Diagramas            # Diagramas UML e MER
│   └── 📂 Padrões_e_Requisitos # Regras de Análise e Boas Práticas
│
└── 📄 README.md                # Apresentação do Projeto

---

## 👥 EQUIPE

| 👤 Nome | 💼 Função |
|:----------------------------:|:----------------------------:|
| Guilherme Maia | Desenvolvedor Full Stack |
| Luiz Phelipe Almeida | Desenvolvedor Full Stack |
| Luiz Francisco de Jesús | Desenvolvedor Full Stack |

---

> 📝 *Lembre-se de verificar e ajustar os caminhos e comandos nas seções **INSTRUÇÕES PARA USO** e **INSTRUÇÕES PARA DEVS** para que reflitam a estrutura exata do seu projeto (nomes de pastas, comandos de execução, URLs, etc.).*
