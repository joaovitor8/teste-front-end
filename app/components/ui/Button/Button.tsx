import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={classes} {...props} />;
}

/** Mesmas classes do botão, para links com aparência de botão. */
export function buttonClassName(variant: Variant = "primary", extra?: string) {
  return [styles.button, styles[variant], extra].filter(Boolean).join(" ");
}
