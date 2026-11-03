import { Logo } from "~/components/ui/Logo/Logo";
import { SectionTitle } from "~/components/ui/SectionTitle/SectionTitle";
import { brands } from "~/data/catalog";
import styles from "./BrandList.module.scss";

export function BrandList() {
  return (
    <section className={styles.section} aria-labelledby="brands-title">
      <SectionTitle id="brands-title">Navegue por marcas</SectionTitle>
      <ul className={styles.list}>
        {brands.map(({ id, name }) => (
          <li key={id}>
            <a href="#ofertas" className={styles.brand} aria-label={`Produtos da marca ${name}`}>
              <Logo height={37} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
