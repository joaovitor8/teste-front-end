import type { SVGProps } from "react";

const paths = {
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.75 12 2.25 2.25 4.25-4.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.75 6.75h11v9.5h-11z" />
      <path d="M13.75 9.75h4l3.5 3.5v3h-7.5" />
      <circle cx="7" cy="17.25" r="1.75" fill="currentColor" />
      <circle cx="17.5" cy="17.25" r="1.75" fill="currentColor" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3 9.5h18M6.5 15h4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.75" cy="10.75" r="7" />
      <path d="m16 16 5 5" />
    </>
  ),
  orders: (
    <>
      <path d="M4 3.75h16v16.5H4z" />
      <path d="M4 9.25h16M9.5 3.75v3.5h5v-3.5" />
      <path d="m10.5 12.5-2.5 2.25 2.5 2.25M8 14.75h7.5" />
    </>
  ),
  heart: (
    <path d="M12 20.25s-8.25-4.9-8.25-10.6A4.65 4.65 0 0 1 12 6.9a4.65 4.65 0 0 1 8.25 2.75c0 5.7-8.25 10.6-8.25 10.6Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="12" r="9.25" />
      <circle cx="12" cy="10" r="3.25" />
      <path d="M6.25 18.25a6.5 6.5 0 0 1 11.5 0" />
    </>
  ),
  cart: (
    <>
      <path d="M2.5 3.5h2.75l2.5 11.75h10.75l2-8.25H6.25" />
      <circle cx="9" cy="19.5" r="1.5" />
      <circle cx="17.25" cy="19.5" r="1.5" />
    </>
  ),
  crown: (
    <path d="m3.5 7.5 4.5 4 4-6 4 6 4.5-4-1.75 10.25h-13.5L3.5 7.5Z" />
  ),
  chevronLeft: <path d="m14.5 6-6 6 6 6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  close: <path d="m5.5 5.5 13 13m0-13-13 13" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.75" fill="currentColor" />
    </>
  ),
  facebook: (
    <path d="M14.25 8.25h2.5V4.75h-2.5a4 4 0 0 0-4 4v2h-2.5v3.5h2.5v6.5h3.5v-6.5h2.5l.5-3.5h-3v-1.5a1 1 0 0 1 1-1Z" />
  ),
  linkedin: (
    <>
      <path d="M4.5 9.5h3.25v10H4.5z" />
      <circle cx="6.1" cy="5.6" r="1.6" />
      <path d="M10.5 19.5v-10h3.1v1.4a3.6 3.6 0 0 1 3.15-1.65c2.4 0 3.25 1.6 3.25 4.25v6h-3.25v-5.4c0-1.3-.35-2.1-1.5-2.1-1.3 0-1.75.95-1.75 2.1v5.4Z" />
    </>
  ),
  technology: (
    <>
      <path d="M38 13V9.5A2.5 2.5 0 0 0 35.5 7h-29A2.5 2.5 0 0 0 4 9.5v21A2.5 2.5 0 0 0 6.5 33H28" />
      <path d="M4 27.5h24M14 33l-2 7h16M18 40h-6" />
      <rect x="30" y="15" width="14" height="27" rx="2.5" />
      <path d="M35 37.5h4" />
    </>
  ),
} satisfies Record<string, React.ReactNode>;

export type IconName = keyof typeof paths;

const viewBoxes: Partial<Record<IconName, string>> = {
  technology: "0 0 48 48",
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

/** Ícones de traço em SVG inline (sem dependências externas). */
export function Icon({ name, size = 24, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBoxes[name] ?? "0 0 24 24"}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
