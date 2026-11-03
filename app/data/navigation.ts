import type { IconName } from "~/components/ui/Icon/Icon";

export interface Benefit {
  icon: IconName;
  highlight: string;
  text: string;
  /** Destaque aparece antes ou depois do texto comum. */
  highlightFirst: boolean;
}

export const benefits: Benefit[] = [
  { icon: "shield", text: "Compra", highlight: "100% segura", highlightFirst: false },
  { icon: "truck", highlight: "Frete grátis", text: "acima de R$ 200", highlightFirst: true },
  { icon: "card", highlight: "Parcele", text: "suas compras", highlightFirst: true },
];

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
  icon?: IconName;
}

export const mainNav: NavItem[] = [
  { label: "Todas categorias", href: "#categorias" },
  { label: "Supermercado", href: "#" },
  { label: "Livros", href: "#" },
  { label: "Moda", href: "#" },
  { label: "Lançamentos", href: "#" },
  { label: "Ofertas do dia", href: "#ofertas", highlight: true },
  { label: "Assinatura", href: "#", icon: "crown" },
];

export const headerActions: { icon: IconName; label: string; href: string }[] = [
  { icon: "orders", label: "Meus pedidos", href: "#" },
  { icon: "heart", label: "Favoritos", href: "#" },
  { icon: "user", label: "Minha conta", href: "#" },
  { icon: "cart", label: "Carrinho", href: "#" },
];

export const footerColumns = [
  {
    title: "Institucional",
    links: ["Sobre Nós", "Movimento", "Trabalhe conosco"],
  },
  {
    title: "Ajuda",
    links: ["Suporte", "Fale Conosco", "Perguntas Frequentes"],
  },
  {
    title: "Termos",
    links: ["Termos e Condições", "Política de Privacidade", "Troca e Devolução"],
  },
];

export const socialLinks: { icon: IconName; label: string; href: string }[] = [
  { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { icon: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
  { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
];
