# Gaspar Lopes Alfaiataria

Site institucional e loja da **Gaspar Lopes Alfaiataria** — alfaiataria clássica brasileira.
Tradução fiel do design `Gaspar Lopes.dc.html` (Claude Design) para **Next.js 14 + TypeScript**.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (base) + CSS próprio da marca em `globals.css`
- Fontes **Playfair Display** + **Inter** (Google Fonts)
- Deploy na **Vercel**

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Estrutura

```
src/
  app/
    layout.tsx          # fontes, metadata, provider do carrinho
    page.tsx            # compõe as seções da landing
    globals.css         # paleta, hovers, grids responsivos
  components/site/
    Navbar.tsx          # fixa, transparência no scroll, menu mobile, carrinho
    Hero.tsx            # full-bleed
    Historia.tsx        # marca + vídeo institucional
    Colecoes.tsx        # grade de categorias
    Destaques.tsx       # produtos + adicionar ao carrinho
    Diferenciais.tsx    # valores
    Depoimentos.tsx
    Newsletter.tsx
    Footer.tsx
    CartDrawer.tsx      # sacola lateral (add/remover/qtd/checkout)
    CartProvider.tsx    # estado do carrinho (context)
  lib/
    site-data.ts        # textos, categorias, produtos, preços (edite aqui)
```

## Imagens e vídeo

O design referencia fotos (`hero`, categorias) e um vídeo institucional que **não vieram no
arquivo de design** — os pontos correspondentes usam **placeholders elegantes** por enquanto.
Para colocar as mídias reais:

1. Adicione os arquivos em `public/assets/` (ex.: `public/assets/ternos.jpg`).
2. Em `src/lib/site-data.ts`, preencha `img` (e `pos`) de cada categoria.
3. Para o vídeo/hero, basta apontar os caminhos nos componentes `Historia.tsx` / `Hero.tsx`.

## Paleta da marca

| Cor | Hex |
|-----|-----|
| Preto | `#0A0A0A` |
| Navy | `#0D1B2A` |
| Ouro | `#C9A86A` |
| Creme | `#F5F0EB` |
| Grafite | `#1C1C1C` |

## Próximos passos (sugestões)

- Página de catálogo (`/catalogo`) — os cards de categoria já apontam para `/catalogo?cat=...`
- Mídias reais (fotos + vídeo institucional)
- Checkout/pagamento real
