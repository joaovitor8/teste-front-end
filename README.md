# Teste Econverse — Front-End

Página de e-commerce desenvolvida a partir do [layout do Figma](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1), com vitrine de produtos consumida do [JSON da Econverse](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json) e modal com os detalhes do produto clicado.

## Stack

- **React 19 + TypeScript** (modo estrito)
- **React Router (framework mode)** com **SSR**: os produtos são buscados no servidor e a página já chega renderizada
- **Sass (SCSS) + CSS Modules**: estilos escopados por componente e tokens de design compartilhados
- **Vite** como bundler
- Fontes self-hosted via **Fontsource** (Poppins, Work Sans e Outfit, as mesmas do layout)
- **Nenhuma biblioteca de UI** (Bootstrap, Foundation etc.): componentes e ícones SVG feitos à mão

## Pré-requisitos

- Node.js **20.19+** (testado com Node 24)
- npm 10+

## Como rodar

```bash
# instalar as dependências
npm install

# ambiente de desenvolvimento (HMR) em http://localhost:5173
npm run dev
```

## Como compilar e rodar em produção

```bash
# gera build/client (assets estáticos) e build/server (SSR)
npm run build

# sobe o servidor de produção em http://localhost:3000
npm start
```

Também há um `Dockerfile`:

```bash
docker build -t teste-econverse .
docker run -p 3000:3000 teste-econverse
```

## Como testar

```bash
# gera os tipos das rotas e roda o compilador TypeScript (sem emitir arquivos)
npm run typecheck
```

Roteiro de teste manual:

1. Abra a página e confira a vitrine "Produtos relacionados" carregando os 10 produtos do JSON.
2. Clique em um card (ou em **Comprar**): o modal abre com nome, preço, descrição e foto do produto clicado.
3. Feche o modal pelo **X**, pela tecla **Esc** ou clicando fora da caixa. A quantidade volta para `01` a cada abertura.
4. Use as **setas** do carrossel para navegar entre os produtos (ou role horizontalmente no touch).
5. Troque as **abas** da primeira vitrine: "Celular" e "Ver todos" mostram os produtos; as demais mostram o estado vazio (o JSON só tem celulares).
6. Envie a **newsletter** vazia, com e-mail inválido e sem aceitar os termos para ver as validações.

## Estrutura

```
app/
├── components/
│   ├── home/              # seções da home (banner, categorias, parceiros, marcas, newsletter)
│   ├── layout/            # Header e Footer
│   ├── product/           # ProductCard, ProductCarousel, ProductShowcase, ProductModal, QuantitySelector
│   └── ui/                # peças genéricas: Button, Icon, Logo, SectionTitle
├── data/                  # conteúdo estático (menus, categorias, links do rodapé)
├── hooks/                 # useCarousel (estado das setas + rolagem por página)
├── routes/home.tsx        # rota da home: loader (SSR), meta tags e composição da página
├── services/products.ts   # busca, validação e normalização do JSON de produtos
├── styles/                # _tokens.scss (cores, fontes, breakpoints, mixins) e global.scss
├── types/                 # tipos da API e do domínio
└── utils/                 # formatação de moeda, preços, slug e SEO
public/images/             # imagens originais do layout (banner, parceiros, ícones das categorias)
```

Cada componente fica em sua pasta com o `.tsx` e o `.module.scss` correspondente.

## Decisões técnicas

- **Busca no servidor**: o endpoint do JSON não envia cabeçalhos de CORS, então uma chamada feita no navegador seria bloqueada. O `loader` da rota busca os produtos no servidor, o que resolve o CORS e entrega o HTML já com os produtos (melhor para SEO e para o primeiro carregamento). Se a API falhar, a página continua de pé e mostra uma mensagem no lugar da vitrine.
- **Normalização dos dados**: `services/products.ts` valida a resposta e converte cada item para o tipo `Product` usado pela interface (id estável, categoria, preços). Os componentes não conhecem o formato cru da API.
- **Preços em centavos**: o JSON traz `price` em centavos (`149990` → `R$ 1.499,90`, valor que aparece no modal do layout). A formatação usa `Intl.NumberFormat("pt-BR")`.
- **Preço "de" e parcelamento**: a API não informa esses campos, mas o layout mostra os dois. Eles são derivados do preço de venda em `utils/pricing.ts` (desconto simulado de 10% e 2x sem juros), em um único lugar fácil de trocar quando houver dados reais.
- **Categoria das abas**: também não vem na API; é inferida pelo nome do produto (`inferCategory`), o que faz as abas filtrarem de verdade.
- **Modal com `<dialog>` nativo**: entrega foco preso, fechamento com Esc, `::backdrop` e retorno do foco sem bibliotecas. Um único modal na página é compartilhado pelas três vitrines.
- **Carrossel com scroll nativo** (`scroll-snap`): funciona com toque e teclado; o hook `useCarousel` só controla as setas e o estado de início/fim.
- **Fidelidade ao layout**: fontes, cores, espaçamentos e enquadramento das imagens foram estimados a partir do Figma em modo de visualização e comparados por medidas com a página em 1440px. O logo e os ícones do header, do rodapé, das setas e da categoria Tecnologia foram recriados em SVG; os demais ícones de categoria são os originais.

## SEO e acessibilidade

- HTML renderizado no servidor, `lang="pt-BR"`, `title` e `meta description`, `canonical`, Open Graph e Twitter Card
- Dados estruturados **schema.org** (`ItemList` de `Product` com `Offer`) gerados a partir dos produtos
- HTML semântico: `header`, `nav`, `main`, `section` com `aria-labelledby`, `article` para cada produto, `footer`, hierarquia de títulos `h1` → `h2` → `h3`, `del`/`ins` para preços
- Imagens com `alt`, `width`/`height` (evita layout shift), `loading="lazy"` abaixo da dobra e WebP com fallback JPG; banner com `fetchpriority="high"` e preload
- Navegação por teclado (`:focus-visible`), link "Pular para o conteúdo", abas com `role="tablist"`/`aria-selected`, respeito a `prefers-reduced-motion`
- `robots.txt` e favicon SVG
