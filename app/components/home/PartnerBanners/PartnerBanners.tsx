import { useId } from "react";
import { buttonClassName } from "~/components/ui/Button/Button";
import { partners } from "~/data/catalog";
import styles from "./PartnerBanners.module.scss";

export function PartnerBanners() {
  const titleId = useId();

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className="visually-hidden">
        Nossos parceiros
      </h2>
      <ul className={styles.list}>
        {partners.map(({ id, title, text }) => (
          <li key={id} className={styles.card}>
            <picture>
              <source srcSet="/images/parceiros.webp" type="image/webp" />
              <img
                src="/images/parceiros.jpg"
                alt=""
                className={styles.image}
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className={styles.content}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.text}>{text}</p>
              <a href="#ofertas" className={buttonClassName("secondary", styles.cta)}>
                Confira
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
