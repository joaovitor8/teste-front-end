import { useId } from "react";
import styles from "./Logo.module.scss";

interface LogoProps {
  /** Altura em px; a largura acompanha a proporção da marca. */
  height?: number;
  className?: string;
}

const WIDTH = 139;
const HEIGHT = 42;

/**
 * Marca Econverse: o texto fica escuro e, dentro do círculo amarelo, branco
 * (o mesmo texto é desenhado de novo recortado pelo círculo).
 */
export function Logo({ height = HEIGHT, className }: LogoProps) {
  const clipId = useId();
  const text = (
    <text x="12" y="29.5" fontSize="28" textLength="127" lengthAdjust="spacingAndGlyphs">
      econverse
    </text>
  );

  return (
    <svg
      className={[styles.logo, className].filter(Boolean).join(" ")}
      width={(height / HEIGHT) * WIDTH}
      height={height}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Econverse"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="20" cy="21" r="20" />
        </clipPath>
      </defs>
      <circle cx="20" cy="21" r="20" className={styles.circle} />
      <g className={styles.text}>{text}</g>
      <g className={styles.textInverse} clipPath={`url(#${clipId})`}>
        {text}
      </g>
    </svg>
  );
}
