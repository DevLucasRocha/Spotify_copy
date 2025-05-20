# Backend - Spotify Copy

Esta pasta contém o backend do projeto **Spotify Copy**, responsável por fornecer a API para o frontend.

## Estrutura da pasta

- `api/connect.js`: configura a conexão com o banco de dados.
- `api/insertMany.js`: script para inserir dados iniciais no banco.
- `api/server.js`: arquivo principal que inicia o servidor e define as rotas da API.
- `node_modules/`: dependências instaladas.
- `package.json` e `package-lock.json`: arquivos de gerenciamento de pacotes e scripts.

## Como rodar

1. Entre na pasta do backend:

    ```bash
    cd back-end
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor:

    ```bash
    node api/server.js
    ```

4. Para desenvolvimento com reinício automático (caso use nodemon):

    ```bash
    nodemon api/server.js
    ```

5. O backend estará disponível em:

    ```
    http://localhost:PORT
    ```

    *(Verifique a porta configurada no `server.js`)*

## Funcionalidades principais

- Conexão com banco de dados configurada em `connect.js`.
- Inserção inicial de dados com `insertMany.js`.
- API REST para artistas, músicas e outros dados, exposta via `server.js`.