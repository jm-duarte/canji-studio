# Canji Studio

Portfolio site do Canji Studio migrado para Next.js 14 com Sanity CMS.

## Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **CMS**: Sanity v3
- **Estilo**: Tailwind CSS v3 com tokens de cor/tipografia customizados
- **Fontes**: Plus Jakarta Sans, Inter, JetBrains Mono (via next/font)

## Estrutura de Páginas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `src/app/page.tsx` | Página inicial |
| `/projetos` | `src/app/projetos/page.tsx` | Grid de projetos |
| `/projetos/[slug]` | `src/app/projetos/[slug]/page.tsx` | Detalhe do projeto |
| `/studio` | `src/app/studio/[[...tool]]/page.tsx` | Sanity Studio (CMS) |

## Schemas do Sanity

- **`siteSettings`** — Singleton: nome do estúdio, WhatsApp, redes sociais
- **`homePageContent`** — Singleton: conteúdo da página inicial (hero, soluções, serviços, CTA)
- **`project`** — Documento: projetos do portfolio

## Configuração do Sanity (primeiro uso)

### 1. Criar o projeto Sanity

Acesse https://www.sanity.io/manage, crie um projeto e copie o Project ID.

### 2. Configurar variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id-aqui
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Popular o conteúdo (seed)

Crie um token de escrita em **Sanity Manage → API → Tokens** com permissão **Editor** e execute:

```bash
SANITY_API_TOKEN=seu-token node scripts/seed.mjs
```

Isso criará automaticamente todos os documentos iniciais (siteSettings, homePageContent e os 3 projetos).

### 4. Verificar no Studio

Acesse `/studio` no site para confirmar os documentos e editar o conteúdo.

### 5. Configurar CORS no Sanity

Em **Sanity Manage → API → CORS Origins**, adicione a URL do seu site em produção.

**Nota**: Sem as variáveis de ambiente configuradas, o site usa dados estáticos de fallback com o conteúdo original dos HTMLs. O Studio mostrará uma tela de configuração guiada.

## Desenvolvimento

```bash
npm run dev   # Inicia em http://localhost:5000
npm run build # Build de produção
```

## User Preferences

- Site em português brasileiro (pt-BR)
- Design fiel aos tokens originais (cores Material Design escuro)
