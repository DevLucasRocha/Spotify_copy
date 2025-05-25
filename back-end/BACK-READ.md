# Back-end

Responsável pela API e conexão com o banco de dados.

## Estrutura

```
back-end/
├── api/
│   ├── connect.js         # Conexão com o MongoDB Atlas
│   ├── insertMany.js      # Script para inserir dados iniciais
│   └── server.js          # Servidor Express e rotas da API
├── package.json           # Dependências e scripts do backend
└── BACK-READ.md           # Este arquivo de explicação
```

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