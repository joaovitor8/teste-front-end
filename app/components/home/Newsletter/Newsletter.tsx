import { useState, type FormEvent } from "react";
import { Button } from "~/components/ui/Button/Button";
import styles from "./Newsletter.module.scss";

type Status = "idle" | "error" | "success";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, email: string, accepted: boolean): string | null {
  if (!name.trim()) return "Informe seu nome.";
  if (!EMAIL_PATTERN.test(email)) return "Informe um e-mail válido.";
  if (!accepted) return "É preciso aceitar os termos e condições.";
  return null;
}

export function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const error = validate(
      String(data.get("name") ?? ""),
      String(data.get("email") ?? ""),
      data.get("terms") === "on",
    );

    if (error) {
      setStatus("error");
      setMessage(error);
      return;
    }

    // Não há endpoint de newsletter no teste; apenas confirmamos o cadastro.
    setStatus("success");
    setMessage("Inscrição realizada! Em breve você receberá nossas novidades.");
    form.reset();
  };

  return (
    <section className={styles.newsletter} aria-labelledby="newsletter-title">
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 id="newsletter-title" className={styles.title}>
            Inscreva-se na nossa newsletter
          </h2>
          <p className={styles.subtitle}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fields}>
            <label className="visually-hidden" htmlFor="newsletter-name">
              Nome
            </label>
            <input
              id="newsletter-name"
              name="name"
              type="text"
              placeholder="Digite seu nome"
              autoComplete="name"
              className={styles.input}
            />
            <label className="visually-hidden" htmlFor="newsletter-email">
              E-mail
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              className={styles.input}
            />
            <Button type="submit" variant="secondary" className={styles.submit}>
              Inscrever
            </Button>
          </div>

          <label className={styles.terms}>
            <input type="checkbox" name="terms" className={styles.checkbox} />
            Aceito os termos e condições
          </label>

          <p
            className={[styles.feedback, status === "error" && styles.error].filter(Boolean).join(" ")}
            role="status"
          >
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
