# TCC Platform Frontend — Padrões do Projeto

## Antes de implementar qualquer coisa
Leia os arquivos de uma tela/feature já existente e completa (componente,
hook de dados, chamada à API, tipos e rota) antes de criar uma nova
tela. Toda funcionalidade nova precisa parecer que foi escrita pela mesma
pessoa que escreveu o resto do projeto — nunca introduza um estilo,
estrutura de pastas ou convenção diferente do que já existe. Se encontrar
algo para o qual não existe padrão definido, pare e pergunte antes de
decidir por conta própria (isso inclui: lib de estilização, lib de
data-fetching/estado, onde guardar o token, estrutura de pastas — nada
disso está decidido ainda, ver "Em aberto" abaixo).

## Backend: repositório separado
A API vive em `tcc-platform-backend`, repositório irmão, versionado à
parte. Este repositório só consome a API via HTTP — não existe (e não deve
ser criado) nenhum código de servidor, rota de API própria, ou acesso
direto a banco de dados aqui.

- Base URL: `http://localhost:3333/api` (health check em
  `http://localhost:3333/health`, fora do prefixo `/api`)
- Toda resposta segue `{ success: true, data }` ou `{ success: false, error }`
- Toda rota exceto `/auth/register` e `/auth/login` exige header
  `Authorization: Bearer <token>`
- Três papéis de usuário (`user_type`): `student`, `advisor`, `admin` — a
  UI disponível muda conforme o papel do usuário logado

Se uma tela precisar de um endpoint que não existe na API, ou de um
comportamento diferente do que o backend expõe hoje (ex: filtro por
usuário, campo novo), **não simular isso no frontend** (mock, gambiarra de
filtro client-side escondendo o problema, etc.) — avisar explicitamente
que o backend precisa mudar primeiro.

## Stack
React + TypeScript + Vite (template oficial `react-ts`).

Decidido a partir da feature de Login (primeira feature real do repo) —
sempre seguir o que já foi escolhido em vez de introduzir uma segunda lib
concorrente para a mesma coisa:
- Estilização: `styled-components` (tema central em `src/ui/theme`, tipado
  via `src/styled.d.ts` que estende `DefaultTheme`)
- Data-fetching/cache: `@tanstack/react-query` (`QueryClient` único,
  criado em `main.tsx`)
- HTTP client: `axios`, instância central em `src/lib/httpClient.ts`
- Roteamento: `react-router-dom` (instalado, ainda não configurado —
  entra quando existir mais de uma rota)

Ainda sem lib de formulário/validação escolhida (ver "Em aberto").

## Fluxo em camadas
Ao definir a estrutura real do projeto, seguir uma separação equivalente à
do backend (routes → controller → service → repository), adaptada pro
front:
página/rota → componente → hook de dados (chamada à API) → cliente HTTP.
Nunca colocar chamada `fetch`/`axios` direto dentro de um componente de UI
— sempre por trás de um hook ou módulo dedicado, mesmo que fino no início.

## Componentes
- Componentes funcionais com hooks, nunca classes
- Um componente por arquivo, nome do arquivo = nome do componente
- Props tipadas via `interface Props` dedicada, nunca `any`

## Chamadas à API
- Um módulo por entidade (equivalente ao repository do backend), que
  concentra as chamadas HTTP daquela entidade (ex: `projectsApi.ts` com
  `list`, `getById`, `create`, `update`, `remove`)
- Token JWT anexado automaticamente num client HTTP central (não repetir
  o header em cada chamada)
- Tratamento de erro: a resposta de erro do backend tem sempre
  `{ success: false, error: string }` — usar essa mensagem diretamente na
  UI em vez de mensagens genéricas, quando fizer sentido pro usuário final

## Types
- Espelhar os tipos/DTOs do backend (`src/types/*.types.ts` de lá) no
  frontend, mas só os campos que a UI realmente usa — não copiar o
  arquivo inteiro sem necessidade
- `enum` para os mesmos valores fixos do backend (`UserType`,
  `ProjectStatus`, `DeliveryStatus`, `MilestoneStatus`, `NotificationType`)

## Env
- Variáveis de ambiente via `import.meta.env` (padrão Vite), prefixo
  `VITE_` (ex: `VITE_API_URL`)

## Regras gerais de código
- Todo código em inglês (nomes, comentários, mensagens de erro/log), mesmo
  quando o pedido ou o backlog estiver em português. "Código" aqui é só o
  que está escrito dentro do projeto — mensagens de commit NÃO entram
  nisso: o histórico de commits deve ser em português, para manter
  consistência com o `tcc-platform-backend`
- Código limpo: nomes de variáveis, funções e arquivos devem ser
  autoexplicativos o suficiente para dispensar comentário
- Comentários apenas quando o "porquê" não é óbvio pelo código (uma decisão
  não trivial, uma regra de negócio não evidente, um workaround). Nunca
  comentar o óbvio e nunca deixar comentário redundante tipo
  "// renders the button" em cima de um componente chamado `Button`
- Arquivos curtos e reutilizáveis (single responsibility; um componente ou
  hook não deve crescer demais — se passar de ~100-150 linhas, quebre em
  componentes/hooks menores)
- Modularizar sempre: cada arquivo com uma responsabilidade única e clara
- Extrair lógica repetida para hooks/utils compartilhados em vez de
  duplicar entre componentes
- TypeScript com tipagem completa — proibido `any`; toda função com tipos
  explícitos de parâmetro e retorno

## Como trabalhar em qualquer tarefa (independente da etapa)
- Nunca implemente mais de uma tela/funcionalidade por vez
- Ao terminar uma funcionalidade: rode o que existir de teste/lint/build
  dela, mostre um resumo curto do que foi feito e do que foi testado, e
  PARE — aguarde confirmação antes de seguir para a próxima
- Não antecipe nem misture implementação de algo que não foi pedido nessa
  etapa, mesmo que pareça relacionado
- Sempre testar no navegador (rodar o dev server e usar a tela) antes de
  reportar uma funcionalidade como pronta — não vale só "compilou"
- README.md só deve ser atualizado depois que a funcionalidade estiver
  implementada e testada de verdade — nunca descreva no README algo que
  ainda não foi implementado

## Decidido (não reabrir sem motivo)
- Token JWT: `localStorage`, atrás de `src/lib/tokenStorage.ts`
  (`getToken`/`setToken`/`removeToken` — nunca chamar `localStorage`
  direto fora desse módulo)
- Data-fetching/cache: React Query
- Estilização: styled-components

## Em aberto (decidir junto antes de escolher por conta própria)
- Lib de formulário/validação (ex: react-hook-form + zod, ou nada)
- Se o cadastro público (`/auth/register`) deve esconder a opção de criar
  conta como "admin"
- Se a listagem de projetos precisa de filtro por usuário (o backend hoje
  retorna todos os projetos em `GET /projects`, sem filtro por papel)
- Como restaurar a sessão ao dar refresh na página: hoje o token persiste
  em `localStorage` mas o objeto `user` guardado em memória
  (`AuthProvider`) some no reload — não existe endpoint "me" no backend
  hoje, só `GET /users/:id`. Precisa ser resolvido quando entrar rotas
  protegidas (próximo item do backlog)

## Progresso do desenvolvimento
Esta seção é o histórico vivo do projeto. Ao final de cada funcionalidade
confirmada por mim, atualize esta seção antes de encerrar a sessão: mova o
item de "Em andamento" para "Concluído" com uma linha curta do que foi
feito, e ajuste o "Próximo passo". Não apague itens concluídos. Ao iniciar
uma sessão nova, leia esta seção primeiro para saber exatamente onde o
projeto parou.

### Concluído
- **Login** (2026-07-24): tela de login funcional, consumindo
  `POST /auth/login`. Definiu os padrões que as próximas telas devem
  seguir:
  - `src/lib/httpClient.ts` — instância axios central; anexa
    `Authorization: Bearer` automaticamente via interceptor de request
    (lendo `tokenStorage`) e normaliza erro do backend
    (`{success:false,error}`) para `Error(message)` via interceptor de
    response, então componentes/hooks só leem `error.message`
  - `src/lib/tokenStorage.ts` — único ponto de acesso ao token no
    `localStorage`
  - `src/api/authApi.ts` — módulo de API por entidade (`authApi.login`),
    desembrulha `{success,data}` e retorna só `data`
  - `src/context/authContext.ts` + `src/context/AuthProvider.tsx` —
    contexto de sessão (`user`, `isAuthenticated`, `setSession`,
    `logout`); contexto e componente ficam em arquivos separados por
    causa do react-refresh (regra do eslint
    `react-refresh/only-export-components`)
  - `src/hooks/useAuth.ts` — hook de acesso ao `AuthContext`
  - `src/hooks/useLogin.ts` — hook de data-fetching (`useMutation` do
    React Query) que chama `authApi.login` e, no sucesso, grava a sessão
  - `src/pages/Login/` — página em si (`Login.tsx` + `Login.styles.ts` +
    `index.ts`), reaproveitando os componentes de `ui/components`
    (`Button`, `Card`, `Input`)
  - `main.tsx` agora monta `QueryClientProvider` → `ThemeProvider` →
    `GlobalStyle` → `AuthProvider` → `App`; `App.tsx` renderiza só
    `LoginPage` por enquanto (sem router ainda — só uma tela existe)
  - Corrigidos bugs pré-existentes do commit de scaffold que impediam o
    build: faltava `src/styled.d.ts` estendendo `DefaultTheme` do
    styled-components (por isso nenhum componente usava
    `theme.colors/spacing/typography` sem erro de tipo), e vários
    arquivos importavam tipos sem `import type` (`verbatimModuleSyntax`
    ligado no `tsconfig`)
  - `.env` (com `VITE_API_URL`) criado localmente e adicionado ao
    `.gitignore`; `.env.example` versionado como referência
  - `npx tsc -b` e `npm run lint` passam limpos

### Em andamento
(nada ainda)

### Próximo passo
Tela de Registro (`/auth/register`) — falta decidir junto se o formulário
esconde a opção de criar conta como "admin" (ver "Em aberto"). Vai
reaproveitar `httpClient`, `authApi` (adicionar `register`) e o padrão de
`useMutation` já estabelecido pelo Login.

### Backlog restante (ordem sugerida)
- Registro
- Layout base + rotas protegidas + navegação condicional por papel
  (inclui resolver a restauração de sessão no reload, ver "Em aberto")
- Dashboard (3 variantes por papel)
- Projects (lista, detalhe, criar, editar)
- Deliveries (lista por projeto, criar, editar/status)
- Milestones (lista por projeto, criar, editar/status)
- Feedback (formulário advisor-only)
- Notifications (lista + marcar como lida)
- Users (admin only: lista, criar, editar, excluir)
