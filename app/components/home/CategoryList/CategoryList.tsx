import { useState } from "react";
import { Icon } from "~/components/ui/Icon/Icon";
import { categories } from "~/data/catalog";
import styles from "./CategoryList.module.scss";

export function CategoryList() {
  const [active, setActive] = useState(categories[0].slug);

  return (
    <nav id="categorias" className={styles.section} aria-label="Departamentos">
      <ul className={styles.list}>
        {categories.map(({ label, slug, image }) => {
          const isActive = slug === active;
          return (
            <li key={slug}>
              <a
                href={`#${slug}`}
                className={[styles.item, isActive && styles.active].filter(Boolean).join(" ")}
                aria-current={isActive ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setActive(slug);
                }}
              >
                <span className={styles.card}>
                  {image ? (
                    <img src={image} alt="" width={64} height={64} loading="lazy" />
                  ) : (
                    <Icon name="technology" size={64} strokeWidth={2.6} />
                  )}
                </span>
                <span className={styles.label}>{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
