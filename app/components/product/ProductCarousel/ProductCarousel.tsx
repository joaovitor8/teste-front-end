import { ProductCard } from "~/components/product/ProductCard/ProductCard";
import { Icon } from "~/components/ui/Icon/Icon";
import { useCarousel } from "~/hooks/useCarousel";
import type { Product } from "~/types/product";
import styles from "./ProductCarousel.module.scss";

interface ProductCarouselProps {
  products: Product[];
  label: string;
  onSelect: (product: Product) => void;
}

export function ProductCarousel({ products, label, onSelect }: ProductCarouselProps) {
  const { trackRef, canPrev, canNext, prev, next } = useCarousel<HTMLUListElement>(
    products.length,
  );

  return (
    <div className={styles.carousel} role="region" aria-roledescription="carrossel" aria-label={label}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={prev}
        disabled={!canPrev}
        aria-label="Produtos anteriores"
      >
        <Icon name="chevronLeft" size={20} strokeWidth={2} />
      </button>

      <ul ref={trackRef} className={styles.track}>
        {products.map((product) => (
          <li key={product.id} className={styles.slide}>
            <ProductCard product={product} onSelect={onSelect} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={next}
        disabled={!canNext}
        aria-label="Próximos produtos"
      >
        <Icon name="chevronRight" size={20} strokeWidth={2} />
      </button>
    </div>
  );
}
