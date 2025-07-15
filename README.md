
# Interesting

Projeto de rede social para aprimorar habilidades de programação, utilizando Supabase para autenticação, banco de dados e armazenamento. Permite postagens, gerenciamento de conta, favoritos e mais.

## Visão Geral

O Interesting é uma aplicação web desenvolvida com Next.js e Chakra UI, que simula uma rede social focada em compartilhamento de imagens e inspiração entre programadores. Utiliza Supabase para autenticação, armazenamento de arquivos e banco de dados.

## Estrutura do Projeto

```
components/         # Componentes reutilizáveis da interface
contexts/           # Contextos globais (autenticação, tamanho de tela, etc)
hooks/              # Hooks customizados
pages/              # Páginas do Next.js
public/             # Arquivos públicos (imagens, favicon)
styles/             # Estilos globais
utils/              # Utilitários (Supabase, requisições, conversor)
```

## Principais Funcionalidades

- Autenticação de usuários (login, logout, sessão)
- Postagem de imagens (PNG, JPG, JPEG, GIF)
- Grid de posts com visualização modal
- Favoritar posts e visualizar inspirações
- Perfil do usuário
- Pesquisa de posts

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React para aplicações web
- [Chakra UI](https://chakra-ui.com/) - Biblioteca de componentes visuais
- [Supabase](https://supabase.com/) - Backend as a Service (auth, storage, database)
- [React Icons](https://react-icons.github.io/react-icons/) - Ícones para React
- [Axios](https://axios-http.com/) - Requisições HTTP

## Instalação e Uso

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/brunojunqueira/interesting.git
   cd interesting
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` com as chaves do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_KEY=your_supabase_key
   ```
4. **Execute o projeto em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
5. **Acesse em:** [http://localhost:3000](http://localhost:3000)

## Estrutura dos Principais Arquivos

- `components/Global/NewPost.js`: Componente para criar novas postagens, faz upload de imagens para o Supabase.
- `contexts/AuthContext/index.js`: Gerencia autenticação e sessão do usuário.
- `utils/supabase.js`: Inicializa o cliente Supabase.
- `pages/index.js`: Página principal, exibe grid de posts e botão de nova postagem.

## Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature/fix: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'Minha feature'`
4. Push para o fork: `git push origin minha-feature`
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

---
Desenvolvido por Bruno Junqueira
