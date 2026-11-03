import type { Product } from "~/types/product";

interface SeoOptions {
  title: string;
  description: string;
  url: string;
  image: string;
}

/** Meta tags básicas + Open Graph + Twitter Card. */
export function buildSeoMeta({ title, description, url, image }: SeoOptions) {
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index, follow" },
    { tagName: "link", rel: "canonical", href: `${url}/` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:site_name", content: "Econverse" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: `${url}/` },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}

/** Dados estruturados (schema.org) da vitrine para rich results. */
export function buildProductListSchema(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Produtos relacionados",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.photo,
        offers: {
          "@type": "Offer",
          priceCurrency: "BRL",
          price: (product.price / 100).toFixed(2),
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };
}
