import { useCallback, useState } from "react";
import { BrandList } from "~/components/home/BrandList/BrandList";
import { CategoryList } from "~/components/home/CategoryList/CategoryList";
import { HeroBanner } from "~/components/home/HeroBanner/HeroBanner";
import { Newsletter } from "~/components/home/Newsletter/Newsletter";
import { PartnerBanners } from "~/components/home/PartnerBanners/PartnerBanners";
import { Footer } from "~/components/layout/Footer/Footer";
import { Header } from "~/components/layout/Header/Header";
import { ProductModal } from "~/components/product/ProductModal/ProductModal";
import { ProductShowcase } from "~/components/product/ProductShowcase/ProductShowcase";
import { getProducts } from "~/services/products";
import type { Product } from "~/types/product";
import { buildProductListSchema, buildSeoMeta } from "~/utils/seo";
import type { Route } from "./+types/home";
import styles from "./home.module.scss";

const PAGE_TITLE = "Econverse | Tecnologia, celulares e ofertas do dia";
const PAGE_DESCRIPTION =
  "Confira as promoções da Econverse: celulares, acessórios, tablets, notebooks e TVs com até 50% off, frete grátis acima de R$ 200 e parcelamento sem juros.";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const products = await getProducts(request.signal);
    return { products, error: null, origin: new URL(request.url).origin };
  } catch (error) {
    console.error(error);
    return {
      products: [] as Product[],
      error: "Não foi possível carregar os produtos. Tente novamente mais tarde.",
      origin: new URL(request.url).origin,
    };
  }
}

export function meta({ loaderData: data }: Route.MetaArgs) {
  return [
    ...buildSeoMeta({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: data?.origin ?? "",
      image: `${data?.origin ?? ""}/images/banner-black-friday.jpg`,
    }),
    ...(data?.products.length
      ? [{ "script:ld+json": buildProductListSchema(data.products) }]
      : []),
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products, error } = loaderData;
  const [selected, setSelected] = useState<Product | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const showcase = (props: { title: string; variant?: "tabs" | "link"; id?: string }) =>
    error ? (
      <p className={styles.error} role="alert">
        {error}
      </p>
    ) : (
      <ProductShowcase {...props} products={products} onSelect={setSelected} />
    );

  return (
    <>
      <a href="#conteudo" className={styles.skipLink}>
        Pular para o conteúdo
      </a>
      <Header />

      <main id="conteudo">
        <HeroBanner />
        <CategoryList />
        {showcase({ title: "Produtos relacionados", variant: "tabs", id: "ofertas" })}
        <PartnerBanners />
        {showcase({ title: "Produtos relacionados" })}
        <PartnerBanners />
        <BrandList />
        {showcase({ title: "Produtos relacionados" })}
        <Newsletter />
      </main>

      <Footer />
      <ProductModal product={selected} onClose={closeModal} />
    </>
  );
}
