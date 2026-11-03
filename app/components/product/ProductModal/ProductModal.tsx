import { useEffect, useRef, useState } from "react";
import { QuantitySelector } from "~/components/product/QuantitySelector/QuantitySelector";
import { Button } from "~/components/ui/Button/Button";
import { Icon } from "~/components/ui/Icon/Icon";
import type { Product } from "~/types/product";
import { formatCurrency } from "~/utils/currency";
import styles from "./ProductModal.module.scss";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

/**
 * Modal de detalhes do produto. Usa o <dialog> nativo, que já entrega
 * foco preso, fechamento com Esc e camada de fundo acessível.
 */
export function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product) {
      setQuantity(1);
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  // Clique fora da caixa (no backdrop) fecha o modal.
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="product-modal-title"
      onClose={onClose}
      onClick={handleClick}
    >
      {product && (
        <div className={styles.content}>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Fechar detalhes do produto"
          >
            <Icon name="close" size={24} strokeWidth={1.8} />
          </button>

          <figure className={styles.media}>
            <img src={product.photo} alt={product.name} width={247} height={228} />
          </figure>

          <div className={styles.info}>
            <h2 id="product-modal-title" className={styles.title}>
              {product.name}
            </h2>
            <p className={styles.price}>{formatCurrency(product.price)}</p>
            <p className={styles.description}>{product.description}</p>
            <a href="#" className={styles.details}>
              Veja mais detalhes do produto &gt;
            </a>

            <div className={styles.actions}>
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <Button variant="secondary" className={styles.buy}>
                Comprar
              </Button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
