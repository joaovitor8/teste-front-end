import { Icon } from "~/components/ui/Icon/Icon";
import styles from "./QuantitySelector.module.scss";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  const set = (next: number) => onChange(Math.min(max, Math.max(min, next)));

  return (
    <div className={styles.selector} role="group" aria-label="Quantidade">
      <button
        type="button"
        className={styles.button}
        onClick={() => set(value - 1)}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
      >
        <Icon name="minus" size={20} />
      </button>
      <output className={styles.value} aria-live="polite">
        {String(value).padStart(2, "0")}
      </output>
      <button
        type="button"
        className={styles.button}
        onClick={() => set(value + 1)}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
      >
        <Icon name="plus" size={20} strokeWidth={2} />
      </button>
    </div>
  );
}
