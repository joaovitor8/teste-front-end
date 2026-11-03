import styles from "./SectionTitle.module.scss";

interface SectionTitleProps {
  id: string;
  children: React.ReactNode;
  /** Linhas decorativas dos dois lados do título. */
  decorated?: boolean;
}

export function SectionTitle({ id, children, decorated = false }: SectionTitleProps) {
  return (
    <div className={[styles.wrapper, decorated && styles.decorated].filter(Boolean).join(" ")}>
      <h2 id={id} className={styles.title}>
        {children}
      </h2>
    </div>
  );
}
