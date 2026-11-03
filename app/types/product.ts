/** Formato do produto como vem da API da Econverse. */
export interface ApiProduct {
  productName: string;
  descriptionShort: string;
  photo: string;
  /** Preço em centavos (ex.: 149990 = R$ 1.499,90). */
  price: number;
}

export interface ApiProductsResponse {
  success: boolean;
  products: ApiProduct[];
}

export type ProductCategory =
  | "celular"
  | "acessorios"
  | "tablets"
  | "notebooks"
  | "tvs";

/** Produto normalizado usado pelos componentes. */
export interface Product {
  id: string;
  name: string;
  description: string;
  photo: string;
  category: ProductCategory;
  /** Valores em centavos. */
  price: number;
  listPrice: number;
  installments: {
    count: number;
    value: number;
  };
}
