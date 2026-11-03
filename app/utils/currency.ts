const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata um valor em centavos como moeda brasileira (ex.: 2890 → "R$ 28,90"). */
export function formatCurrency(cents: number): string {
  // Intl usa espaço não separável; normalizamos para o espaço comum do layout.
  return brl.format(cents / 100).replace(/\s/, " ");
}
