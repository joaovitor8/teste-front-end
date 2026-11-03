import type {
  ApiProduct,
  ApiProductsResponse,
  Product,
  ProductCategory,
} from "~/types/product";
import { getInstallments, getListPrice } from "~/utils/pricing";
import { slugify } from "~/utils/slugify";

export const PRODUCTS_URL =
  "https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json";

const CATEGORY_KEYWORDS: Record<ProductCategory, string[]> = {
  celular: ["iphone", "celular", "smartphone", "galaxy"],
  acessorios: ["capa", "fone", "carregador", "cabo", "pelicula"],
  tablets: ["ipad", "tablet"],
  notebooks: ["notebook", "macbook", "laptop"],
  tvs: ["tv", "televisao", "smart tv"],
};

/** A API não envia categoria; inferimos a partir do nome do produto. */
export function inferCategory(name: string): ProductCategory {
  const normalized = slugify(name).replace(/-/g, " ");
  const match = (Object.keys(CATEGORY_KEYWORDS) as ProductCategory[]).find(
    (category) =>
      CATEGORY_KEYWORDS[category].some((keyword) =>
        new RegExp(`\\b${keyword}\\b`).test(normalized),
      ),
  );
  return match ?? "acessorios";
}

export function normalizeProduct(product: ApiProduct, index: number): Product {
  return {
    id: `${slugify(product.productName)}-${index}`,
    name: product.productName,
    description: product.descriptionShort,
    photo: product.photo,
    category: inferCategory(product.productName),
    price: product.price,
    listPrice: getListPrice(product.price),
    installments: getInstallments(product.price),
  };
}

function isProductsResponse(data: unknown): data is ApiProductsResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as ApiProductsResponse).products)
  );
}

/**
 * Busca a vitrine. Roda no servidor (loader da rota), o que evita a restrição
 * de CORS do endpoint e entrega os produtos já renderizados para SEO.
 */
export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Falha ao carregar produtos (HTTP ${response.status})`);
  }

  const data: unknown = await response.json();

  if (!isProductsResponse(data) || data.success === false) {
    throw new Error("Resposta inválida da API de produtos");
  }

  return data.products.map(normalizeProduct);
}
