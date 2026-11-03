import { Icon } from "~/components/ui/Icon/Icon";
import { Logo } from "~/components/ui/Logo/Logo";
import { benefits, headerActions, mainNav } from "~/data/navigation";
import styles from "./Header.module.scss";

function TopBar() {
  return (
    <ul className={styles.topBar} aria-label="Vantagens">
      {benefits.map(({ icon, highlight, text, highlightFirst }) => (
        <li key={highlight} className={styles.benefit}>
          <Icon name={icon} size={24} className={styles.benefitIcon} />
          <span>
            {highlightFirst ? (
              <>
                <strong>{highlight}</strong> {text}
              </>
            ) : (
              <>
                {text} <strong>{highlight}</strong>
              </>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function SearchForm() {
  return (
    <form
      className={styles.search}
      role="search"
      // O teste tem uma única página; ainda não existe tela de resultados.
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="header-search" className="visually-hidden">
        Buscar produtos
      </label>
      <input
        id="header-search"
        name="q"
        type="search"
        placeholder="O que você está buscando?"
        autoComplete="off"
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton} aria-label="Buscar">
        <Icon name="search" size={24} />
      </button>
    </form>
  );
}

function MainNav() {
  return (
    <nav className={styles.nav} aria-label="Categorias principais">
      <ul className={styles.navList}>
        {mainNav.map(({ label, href, highlight, icon }) => (
          <li key={label}>
            <a
              href={href}
              className={[styles.navLink, highlight && styles.navLinkHighlight]
                .filter(Boolean)
                .join(" ")}
            >
              {icon && <Icon name={icon} size={24} />}
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <TopBar />

        <div className={styles.main}>
          <a href="/" className={styles.logo} aria-label="Econverse - página inicial">
            <Logo height={42} />
          </a>

          <SearchForm />

          <ul className={styles.actions}>
            {headerActions.map(({ icon, label, href }) => (
              <li key={label}>
                <a href={href} className={styles.action} aria-label={label} title={label}>
                  <Icon name={icon} size={28} strokeWidth={1.4} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <MainNav />
      </div>
    </header>
  );
}
