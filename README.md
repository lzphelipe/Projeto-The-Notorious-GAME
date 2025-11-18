# 🎮 **The Notorious GAME**

> Sistema web para gerenciamento de uma loja de jogos, desenvolvido como projeto da disciplina **Engenharia de Software (GCC188)**.
> Permite o **cadastro de jogos e gerenciamento de vendas** de forma simples e eficiente.

---

## 💡 CONTEXTO DO PROBLEMA E SOLUÇÃO

### Descrição do Problema
O gerenciamento manual ou por planilhas de um estoque e das vendas em uma loja de jogos pode ser ineficiente, propenso a erros e dificultar o controle financeiro e a tomada de decisões. Clientes precisam de uma maneira rápida e fácil de consultar o catálogo, e a equipe precisa de um sistema centralizado para registrar vendas, gerenciar o estoque de jogos e controlar as informações dos usuários.

### Descrição da Solução
**The Notorious GAME** é um **sistema web** que centraliza todas as operações de gerenciamento de uma loja de jogos. Ele propicia o **cadastro, edição e remoção de jogos**, além de permitir o **gerenciamento de usuários** e o **registro e controle completo das vendas**. A solução visa resolver a dor da **ineficiência operacional e da falta de controle de dados**, oferecendo uma interface simples e intuitiva para que a loja mantenha o foco no atendimento ao cliente.

---

## 🏃 INSTRUÇÕES PARA USO (Usuários Finais)

Para usar o sistema sem ser um desenvolvedor, siga os passos abaixo. *Certifique-se de ter o **Java Development Kit (JDK) 17 ou superior** e o **PostgreSQL 18 ou superior** instalados em sua máquina.*

1.  **Baixar o Projeto:**
    * Baixe o arquivo **ZIP** do projeto através do botão "Code" no repositório do GitHub e descompacte-o em uma pasta de sua preferência.

2.  **Configuração do Banco de Dados (PostgreSQL):**
    * Crie um banco de dados com o nome `notorious_game_db`.
    * Altere as credenciais de acesso ao banco de dados no arquivo de configuração do Spring Boot, geralmente localizado em `src/main/resources/application.properties`, se necessário. *O sistema deve criar as tabelas automaticamente ao ser executado.*

3.  **Executar a Aplicação:**
    * Abra o **terminal** (ou Prompt de Comando/PowerShell) na pasta raiz do projeto.
    * Use o **Maven** para compilar e executar o projeto com o seguinte comando:
        ```bash
        ./mvnw spring-boot:run
        ```
    * Aguarde até que o console exiba a mensagem indicando que a aplicação iniciou (ex: "Started Application in X seconds").

4.  **Acessar o Sistema:**
    * Abra seu **navegador** de internet.
    * Digite a seguinte URL para acessar a interface do sistema:
        ```
        http://localhost:8080
        ```
    * Você verá a página inicial do **The Notorious GAME**.

---

## 💻 INSTRUÇÕES PARA DEVS

Siga as instruções abaixo para preparar seu ambiente e ser um desenvolvedor (DEV) do projeto:

### 3.1 - Clonar o Projeto

* **Clonagem via Terminal:** Clone o projeto na sua máquina aplicando o comando:
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    ```
    *Substitua `SEU_USUARIO/SEU_REPOSITORIO.git` pelo caminho real do seu projeto.*
* **Baixar o ZIP:** Você pode também baixar o zip do projeto e descompactar na sua pasta de desenvolvimento, mas a clonagem via Git é preferível para controle de versão.

### 3.2 - Instalar Dependências

* **Backend (Java/Spring Boot):** O Maven (`pom.xml`) gerencia automaticamente as dependências do Backend. Não é necessário um comando extra, pois o IDE (IntelliJ IDEA) ou o comando de execução do próximo passo se encarregarão disso.
* **Frontend (React):** Vá para a pasta do frontend (ex: `src/main/frontend/`) e execute o comando abaixo para instalar as bibliotecas e outras dependências do React:
    ```bash
    npm install
    # OU
    yarn install
    ```

### 3.3 - Executar o Projeto

1.  **Executar o Backend:** Abra o IDE (**IntelliJ IDEA**) e importe o projeto Maven. Execute a classe principal do Spring Boot (Ex: `Application.java`).
2.  **Executar o Frontend:** Em um terminal separado, vá para a pasta do frontend (ex: `src/main/frontend/`) e execute o comando:
    ```bash
    npm start
    # OU
    yarn start
    ```
3.  **Acessar o Sistema:** Após os dois processos estarem em execução, acesse o navegador e digite a URL. Por padrão, o backend estará em `http://localhost:8080` (API) e o frontend em `http://localhost:3000` (Interface, onde o sistema deverá ser visto).
    ```
    http://localhost:3000
    ```
    Você deverá ver o sistema no seu browser.

---

## 🚀 TECNOLOGIAS UTILIZADAS

| Camada | Tecnologias |
|:-------|:-------------|
| **Backend** | ☕ [Java 17] • ⚙️ [Spring Boot 3.5] |
| **Frontend** | ⚛️ [React 19.1] |
| **Banco de Dados** | 🐘 [PostgreSQL 18] |
| **IDE** | 💡 [IntelliJ IDEA] |
| **Gerenciador de Dependências** | 📦 [Maven] • [npm/yarn] |

---

## 🧩 FUNCIONALIDADES PRINCIPAIS

- 🕹️ Cadastro, edição e remoção de **jogos**
- 👤 Gerenciamento de **usuários**
- 💰 Registro e controle de **vendas**

---

## 📂 ORGANIZAÇÃO DO PROJETO

Este projeto está organizado nas pastas descritas abaixo com as seguintes finalidades. *A estrutura abaixo é um exemplo e deve ser adaptada à sua organização real.*

### Estrutura de Pastas

* **`src/`**: Contém o código-fonte principal da aplicação.
    * **`src/main/java/`**: Arquivos Java do Backend (Spring Boot).
        * `src/main/java/com/notorious/game/controller/`: Camada de *Controllers* (Endpoints da API).
        * `src/main/java/com/notorious/game/service/`: Camada de *Serviços* (Regras de negócio).
        * `src/main/java/com/notorious/game/repository/`: Camada de *Repositórios* (Acesso ao BD).
    * **`src/main/frontend/`**: Contém o código-fonte do Frontend (React).
        * `src/main/frontend/src/components/`: Componentes reutilizáveis da interface do usuário.
        * `src/main/frontend/src/pages/`: Páginas principais da aplicação.
    * **`src/main/resources/`**: Arquivos de configuração do Spring Boot (`application.properties`) e outros recursos.
* **`docs/`**: Documentação do projeto, incluindo manuais e especificações (Diagramas, Wireframes, etc.).
* **`tests/`**: Arquivos e scripts de testes automatizados (unitários e de integração).
* **`public/`**: Arquivos estáticos (no contexto do frontend, ex: `index.html` e *favicons*).
* **`assets/`**: Recursos visuais e outros ativos do projeto (ícones, logos, etc.).

---

## 👥 EQUIPE

| 👤 Nome | 💼 Função |
|:----------------------------:|:----------------------------:|
| Guilherme Maia | Desenvolvedor Full Stack |
| Luiz Phelipe Almeida | Desenvolvedor Full Stack |
| Luiz Francisco de Jesús | Desenvolvedor Full Stack |

---

> 📝 *Lembre-se de verificar e ajustar os caminhos e comandos nas seções **INSTRUÇÕES PARA USO** e **INSTRUÇÕES PARA DEVS** para que reflitam a estrutura exata do seu projeto (nomes de pastas, comandos de execução, URLs, etc.).*
