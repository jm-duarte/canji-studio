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
- **`homePage`** — Singleton: conteúdo da página inicial (hero, soluções, serviços, CTA)
- **`project`** — Documento: projetos do portfolio

## Configuração do Sanity

1. Crie um projeto em https://www.sanity.io/manage
2. Copie `.env.local.example` para `.env.local`
3. Preencha `NEXT_PUBLIC_SANITY_PROJECT_ID` com o ID do projeto
4. Acesse `/studio` para gerenciar o conteúdo

**Nota**: Sem as variáveis de ambiente configuradas, o site usa dados estáticos de fallback com o conteúdo original dos HTMLs.

## Desenvolvimento

```bash
npm run dev   # Inicia em http://localhost:5000
npm run build # Build de produção
```

## User Preferences

- Site em português brasileiro (pt-BR)
- Design fiel aos tokens originais (cores Material Design escuro)
