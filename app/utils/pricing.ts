/**
 * A API não informa preço "de" nem parcelamento, mas o layout exibe os dois.
 * Para respeitar o layout, derivamos esses valores a partir do preço de venda.
 */
export const SIMULATED_DISCOUNT = 0.1;
export const MAX_INSTALLMENTS = 2;

export function getListPrice(price: number, discount = SIMULATED_DISCOUNT): number {
  return Math.round(price / (1 - discount));
}

export function getInstallments(price: number, count = MAX_INSTALLMENTS) {
  return { count, value: Math.round(price / count) };
}
