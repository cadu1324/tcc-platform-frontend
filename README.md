# TCC Platform - Frontend

Plataforma web para gestão de projetos acadêmicos e Trabalhos de Conclusão de Curso (TCCs).

## Tecnologias

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Styled Components** - Estilização com CSS-in-JS
- **React Router DOM** - Roteamento SPA
- **Axios** - Requisições HTTP
- **Context API** - Gerenciamento de estado global

## Arquitetura de Componentes

O projeto segue uma arquitetura em camadas, do nível mais baixo ao mais alto:

```
UI Library (ui/) → Components (components/) → Screens (screens/)
```

### UI Library (`src/ui/`)
Componentes base do design system. Genéricos e reutilizáveis em qualquer contexto.
- Button, Input, Select, Card, Modal, Table, Badge, Spinner, Avatar, Chips, ProgressBar, StatCard, Timeline, UploadZone
- Theme com cores, espaçamentos e tipografia

### Components (`src/components/`)
Componentes compostos que combinam elementos da UI Library.
- **layout/** - Header (com sino de notificações), Sidebar (com badge de mensagens), Layout
- **auth/** - LoginForm, RegisterForm
- **project/** - ProjectCard, ProjectList, ProjectForm, CreateProjectDialog
- **delivery/** - DeliveryCard, DeliveryList, DeliveryFormDialog, SubmitDeliveryDialog, DownloadFileButton
- **milestone/** - MilestoneStatusButton, MilestoneFormDialog
- **user/** - UserFormDialog, ToggleUserActiveButton
- **notification/** - NotificationBell
- **messaging/** - Messaging

### Screens (`src/screens/`)
Páginas completas que combinam Components.
- **auth/** - Login, Register, ForgotPassword, ResetPassword
- **student/** - Dashboard, MyProjects, MyProject, Deliveries, Feedbacks, Messages
- **advisor/** - Dashboard, MyStudents, AdvisorProjectDetail, AdvisorDeliveries, ReviewDelivery, Messages
- **admin/** - Dashboard, ManageUsers, UserDetail, Reports

## Como instalar

```bash
npm install
```

## Como rodar

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Variáveis de ambiente

Copie o arquivo de exemplo e configure:

```bash
cp .env.example .env
```

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_API_URL` | URL base da API backend (inclui o prefixo `/api`) | `http://localhost:3333/api` |

## Estrutura de Pastas

```
src/
├── ui/                # Design system - componentes base
│   ├── components/    # Button, Input, Card, Modal, etc.
│   └── theme/         # Cores, espaçamentos, tipografia
├── components/        # Componentes compostos
│   ├── layout/        # Header, Sidebar, Layout
│   ├── auth/          # LoginForm, RegisterForm
│   ├── project/       # ProjectCard, ProjectList, ProjectForm, CreateProjectDialog
│   ├── delivery/      # DeliveryCard, DeliveryList, SubmitDeliveryDialog, DownloadFileButton
│   ├── milestone/     # MilestoneStatusButton, MilestoneFormDialog
│   ├── user/          # UserFormDialog, ToggleUserActiveButton
│   ├── notification/  # NotificationBell
│   └── messaging/     # Messaging
├── screens/           # Páginas/telas
│   ├── auth/          # Login, Register, ForgotPassword, ResetPassword
│   ├── student/       # Dashboard, MyProjects, MyProject, Deliveries, Feedbacks, Messages
│   ├── advisor/       # Dashboard, MyStudents, AdvisorProjectDetail, AdvisorDeliveries, ReviewDelivery, Messages
│   └── admin/         # Dashboard, ManageUsers, UserDetail, Reports
├── context/           # Context API (AuthContext, ThemeContext)
├── services/          # Camada de API: httpClient + um service por recurso
├── hooks/             # Custom hooks (useAuth, React Query)
├── routes/            # Configuração de rotas
├── types/             # Tipos TypeScript
└── utils/             # Funções utilitárias (formatDate, storage)
```

Os estilos globais ficam em `src/ui/theme/GlobalStyle.ts`.

## Convenções do Projeto

- **Nomenclatura:** Código em inglês, comentários e README em português
- **Componentes:** Cada componente em sua pasta com `Component.tsx`, `Component.styles.ts` e `index.ts`
- **Arquivos pequenos:** Máximo ~200 linhas por arquivo
- **Barrel exports:** Cada diretório possui um `index.ts` para facilitar imports
- **Styled Components:** Transient props com prefixo `$` (ex: `$variant`, `$size`)

## Tipos de Usuário

| Tipo | Descrição | Rotas |
|------|-----------|-------|
| `student` | Aluno | `/student/*` |
| `advisor` | Orientador | `/advisor/*` |
| `admin` | Administrador | `/admin/*` |

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build de produção |
| `npm run lint` | Executa o linter |
