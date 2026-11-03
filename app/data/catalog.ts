import type { ProductCategory } from "~/types/product";

export interface Category {
  label: string;
  slug: string;
  /** Imagem em /public; quando ausente o ícone SVG `technology` é usado. */
  image?: string;
}

export const categories: Category[] = [
  { label: "Tecnologia", slug: "tecnologia" },
  { label: "Supermercado", slug: "supermercado", image: "/images/categories/supermercado.png" },
  { label: "Bebidas", slug: "bebidas", image: "/images/categories/bebidas.png" },
  { label: "Ferramentas", slug: "ferramentas", image: "/images/categories/ferramentas.png" },
  { label: "Saúde", slug: "saude", image: "/images/categories/saude.png" },
  {
    label: "Esportes e Fitness",
    slug: "esportes-e-fitness",
    image: "/images/categories/esportes-e-fitness.png",
  },
  { label: "Moda", slug: "moda", image: "/images/categories/moda.png" },
];

export type ShowcaseFilter = ProductCategory | "todos";

export const showcaseTabs: { label: string; value: ShowcaseFilter }[] = [
  { label: "Celular", value: "celular" },
  { label: "Acessórios", value: "acessorios" },
  { label: "Tablets", value: "tablets" },
  { label: "Notebooks", value: "notebooks" },
  { label: "TVs", value: "tvs" },
  { label: "Ver todos", value: "todos" },
];

export const partners = [
  { id: "parceiros-1", title: "Parceiros", text: "Lorem ipsum dolor sit amet, consectetur" },
  { id: "parceiros-2", title: "Parceiros", text: "Lorem ipsum dolor sit amet, consectetur" },
];

export const brands = Array.from({ length: 5 }, (_, index) => ({
  id: `marca-${index + 1}`,
  name: "Econverse",
}));
