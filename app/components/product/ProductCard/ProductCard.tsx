import { Button } from "~/components/ui/Button/Button";
import type { Product } from "~/types/product";
import { formatCurrency } from "~/utils/currency";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { name, description, photo, price, listPrice, installments } = product;
  const open = () => onSelect(product);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={photo}
          alt={name}
          className={styles.image}
          width={247}
          height={228}
          loading="lazy"
          decoding="async"
        />
      </div>

      <h3 className={styles.description}>
        {/* O ::after deste botão cobre o card inteiro, tornando-o clicável. */}
        <button type="button" className={styles.trigger} onClick={open} aria-haspopup="dialog">
          {description}
        </button>
      </h3>

      <div className={styles.prices}>
        <del className={styles.listPrice}>
          <span className="visually-hidden">De </span>
          {formatCurrency(listPrice)}
        </del>
        <ins className={styles.price}>
          <span className="visually-hidden">Por </span>
          {formatCurrency(price)}
        </ins>
        <span className={styles.installments}>
          ou {installments.count}x de {formatCurrency(installments.value)} sem juros
        </span>
        <span className={styles.shipping}>Frete grátis</span>
      </div>

      <Button fullWidth className={styles.buy} onClick={open} aria-haspopup="dialog">
        Comprar
      </Button>
    </article>
  );
}
