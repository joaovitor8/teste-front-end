import { buttonClassName } from "~/components/ui/Button/Button";
import styles from "./HeroBanner.module.scss";

export function HeroBanner() {
  return (
    <section className={styles.banner} aria-labelledby="banner-title">
      <picture>
        <source srcSet="/images/banner-black-friday.webp" type="image/webp" />
        <img
          src="/images/banner-black-friday.jpg"
          alt=""
          className={styles.image}
          width={2048}
          height={1152}
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className={styles.content}>
        <h1 id="banner-title" className={styles.title}>
          Venha conhecer nossas promoções
        </h1>
        <p className={styles.subtitle}>
          <strong>50% Off</strong> nos produtos
        </p>
        <a href="#ofertas" className={buttonClassName("secondary", styles.cta)}>
          Ver produto
        </a>
      </div>
    </section>
  );
}
