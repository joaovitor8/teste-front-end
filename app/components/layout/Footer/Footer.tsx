import { Icon } from "~/components/ui/Icon/Icon";
import { Logo } from "~/components/ui/Logo/Logo";
import { footerColumns, socialLinks } from "~/data/navigation";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <a href="/" aria-label="Econverse - página inicial">
              <Logo height={50} />
            </a>
            <p className={styles.about}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ul className={styles.social} aria-label="Redes sociais">
              {socialLinks.map(({ icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={styles.socialLink}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name={icon} size={24} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.columns}>
            {footerColumns.map(({ title, links }) => (
              <nav key={title} className={styles.column} aria-labelledby={`footer-${title}`}>
                <h2 id={`footer-${title}`} className={styles.columnTitle}>
                  {title}
                </h2>
                <ul className={styles.links}>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className={styles.link}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </footer>
  );
}
