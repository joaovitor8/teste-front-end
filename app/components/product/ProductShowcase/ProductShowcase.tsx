import { useId, useMemo, useState } from "react";
import { ProductCarousel } from "~/components/product/ProductCarousel/ProductCarousel";
import { SectionTitle } from "~/components/ui/SectionTitle/SectionTitle";
import { showcaseTabs, type ShowcaseFilter } from "~/data/catalog";
import type { Product } from "~/types/product";
import styles from "./ProductShowcase.module.scss";

interface ProductShowcaseProps {
  title: string;
  products: Product[];
  onSelect: (product: Product) => void;
  /** "tabs" mostra as abas de categoria; "link" mostra apenas "Ver todos". */
  variant?: "tabs" | "link";
  id?: string;
}

export function ProductShowcase({
  title,
  products,
  onSelect,
  variant = "link",
  id,
}: ProductShowcaseProps) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const [filter, setFilter] = useState<ShowcaseFilter>("celular");

  const visibleProducts = useMemo(
    () =>
      variant === "tabs" && filter !== "todos"
        ? products.filter((product) => product.category === filter)
        : products,
    [products, filter, variant],
  );

  return (
    <section id={id} className={styles.showcase} aria-labelledby={titleId}>
      <SectionTitle id={titleId} decorated>
        {title}
      </SectionTitle>

      {variant === "tabs" ? (
        <div className={styles.tabs} role="tablist" aria-label="Filtrar por categoria">
          {showcaseTabs.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              role="tab"
              id={`${uid}-tab-${value}`}
              aria-selected={filter === value}
              aria-controls={`${uid}-panel`}
              className={[styles.tab, filter === value && styles.tabActive].filter(Boolean).join(" ")}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      ) : (
        <a href="#ofertas" className={styles.seeAll}>
          Ver todos
        </a>
      )}

      <div
        id={variant === "tabs" ? `${uid}-panel` : undefined}
        role={variant === "tabs" ? "tabpanel" : undefined}
        aria-labelledby={variant === "tabs" ? `${uid}-tab-${filter}` : undefined}
        className={styles.content}
      >
        {visibleProducts.length > 0 ? (
          <ProductCarousel products={visibleProducts} label={title} onSelect={onSelect} />
        ) : (
          <p className={styles.empty}>Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </section>
  );
}
