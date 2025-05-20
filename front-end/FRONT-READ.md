# Frontend - Spotify Copy

Esta pasta contém o frontend do projeto **Spotify Copy**, responsável pela interface do usuário e pela interação com a API backend para exibir músicas, artistas e outras funcionalidades.

## Estrutura da pasta

- `.vite/`: arquivos gerados pelo Vite durante o build.
- `api/api.js`: arquivo para chamadas à API backend.
- `public/`: arquivos estáticos públicos, incluindo o arquivo `_redirects` necessário para deploy no Netlify.
- `src/`: código-fonte principal do frontend
  - `assets/`: imagens e outros arquivos estáticos
    - `database/`: arquivos locais de dados como `artists.js` e `songs.js`
    - `logo/`: logos e imagens da aplicação
  - `components/`: componentes React reutilizáveis como `Header.jsx`, `Player.jsx`, `SongList.jsx` etc.
  - `pages/`: páginas do aplicativo (ex: `App.jsx`)
  - Arquivos CSS: `index.css`, `index-aula.css`
  - Arquivos principais: `main.jsx` (entrada do app React)
- Arquivos de configuração e dependências:
  - `package.json`, `package-lock.json`
  - `vite.config.js`
  - `.gitignore`
  - `eslint.config.js`
- Arquivo HTML base: `index.html`

## Como rodar

1. Entre na pasta do frontend:

    ```bash
    cd front-end
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

4. Abra o navegador e acesse:

    ```
    http://localhost:5173
    ```

5. Para gerar o build de produção:

    ```bash
    npm run build
    ```

## Considerações para deploy no Netlify

- O arquivo `public/_redirects` está configurado para redirecionar todas as rotas para `index.html`, garantindo que o React Router funcione corretamente no deploy.
- Certifique-se que o diretório de build (`dist/`) está apontado corretamente na configuração do Netlify.

## Funcionalidades principais

- Interface desenvolvida em React com navegação via React Router Dom.
- Componentes organizados para modularidade e fácil manutenção.
- Consumo de API backend para dados dinâmicos (via `api/api.js`).
- Player de músicas, listas de artistas e canções com interação dinâmica.