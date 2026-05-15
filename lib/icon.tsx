import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "star"
  | "mountain"
  | "arrow"
  | "calendar"
  | "users"
  | "map"
  | "mic"
  | "chat"
  | "whatsapp"
  | "x"
  | "send"
  | "sparkle"
  | "check"
  | "play"
  | "instagram"
  | "phone"
  | "mail"
  | "pin"
  | "wifi"
  | "flame"
  | "bed"
  | "bath"
  | "leaf"
  | "chevron"
  | "chevronDown"
  | "sun"
  | "moon"
  | "minus"
  | "plus"
  | "waveform"
  | "award"
  | "coffee"
  | "google"
  | "booking";

type IconProps = {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "name" | "stroke">;

export function Icon({ name, size = 18, stroke = 1.6, className, ...rest }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
    ...rest,
  };

  const paths: Record<IconName, ReactNode> = {
    star: <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9 12 2" />,
    mountain: (
      <>
        <path d="M3 20 L10 8 L13 13 L16 9 L21 20 Z" />
        <circle cx="17" cy="5" r="1.6" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12 H19" />
        <path d="M13 6 L19 12 L13 18" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10 H21" />
        <path d="M8 3 V7" />
        <path d="M16 3 V7" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2 21 c0-4 3.5-6 7-6 s7 2 7 6" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M16 15 c3 0 6 1.5 6 5" />
      </>
    ),
    map: (
      <>
        <path d="M9 4 L3 6 V21 L9 19 L15 21 L21 19 V4 L15 6 L9 4 Z" />
        <path d="M9 4 V19" />
        <path d="M15 6 V21" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="12" rx="3" />
        <path d="M5 12 a7 7 0 0 0 14 0" />
        <path d="M12 19 V22" />
      </>
    ),
    chat: <path d="M21 12 a8 8 0 0 1-11.5 7.2 L4 21 l1.8-5.5 A8 8 0 1 1 21 12 Z" />,
    whatsapp: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" fill="currentColor" stroke="none" />
    ),
    x: (
      <>
        <path d="M6 6 L18 18" />
        <path d="M18 6 L6 18" />
      </>
    ),
    send: (
      <>
        <path d="M22 2 L11 13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3 L13.5 9 L19.5 10.5 L13.5 12 L12 18 L10.5 12 L4.5 10.5 L10.5 9 Z" />
        <path d="M19 17 L19.7 19.3 L22 20 L19.7 20.7 L19 23 L18.3 20.7 L16 20 L18.3 19.3 Z" />
      </>
    ),
    check: <polyline points="4 12 10 18 20 6" />,
    play: <polygon points="6 4 20 12 6 20 6 4" />,
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </>
    ),
    phone: (
      <path d="M22 17 v3 a2 2 0 0 1 -2 2 a18 18 0 0 1 -18 -18 a2 2 0 0 1 2 -2 h3 a2 2 0 0 1 2 1.7 l0.6 3.2 a2 2 0 0 1 -0.6 2 L7.5 10.5 a16 16 0 0 0 6 6 l1.6 -1.5 a2 2 0 0 1 2 -0.6 l3.2 0.7 A2 2 0 0 1 22 17 Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7 L12 13 L21 7" />
      </>
    ),
    pin: (
      <>
        <path d="M12 22 s7-7 7-12 a7 7 0 0 0 -14 0 c0 5 7 12 7 12 z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    wifi: (
      <>
        <path d="M3 9 a16 16 0 0 1 18 0" />
        <path d="M6 13 a11 11 0 0 1 12 0" />
        <path d="M9 17 a6 6 0 0 1 6 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </>
    ),
    flame: <path d="M12 2 c1 4 5 5 5 10 a5 5 0 0 1 -10 0 c0-3 2 -4 3 -7 c0 2 2 3 2 -3 z" />,
    bed: (
      <>
        <path d="M3 18 V8" />
        <path d="M21 18 V12" />
        <path d="M3 12 H21" />
        <path d="M3 18 H21" />
        <circle cx="8" cy="11" r="2" />
      </>
    ),
    bath: (
      <>
        <path d="M4 12 H20 V16 a3 3 0 0 1 -3 3 H7 a3 3 0 0 1 -3 -3 z" />
        <path d="M6 12 V6 a2 2 0 0 1 4 0" />
        <path d="M2 12 H22" />
      </>
    ),
    leaf: (
      <>
        <path d="M5 19 c0 -10 6 -14 16 -14 c0 10 -6 14 -16 14 z" />
        <path d="M5 19 L13 11" />
      </>
    ),
    chevron: <polyline points="9 18 15 12 9 6" />,
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2 V4" />
        <path d="M12 20 V22" />
        <path d="M2 12 H4" />
        <path d="M20 12 H22" />
        <path d="M4.9 4.9 L6.3 6.3" />
        <path d="M17.7 17.7 L19.1 19.1" />
        <path d="M4.9 19.1 L6.3 17.7" />
        <path d="M17.7 6.3 L19.1 4.9" />
      </>
    ),
    moon: <path d="M21 13 A9 9 0 1 1 11 3 a7 7 0 0 0 10 10 z" />,
    minus: <path d="M5 12 H19" />,
    plus: (
      <>
        <path d="M12 5 V19" />
        <path d="M5 12 H19" />
      </>
    ),
    waveform: (
      <>
        <path d="M3 12 H5 L7 6 L10 18 L13 9 L16 15 L19 11 H21" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="9" r="5" />
        <path d="M9 13 L7 22 L12 19 L17 22 L15 13" />
      </>
    ),
    coffee: (
      <>
        <path d="M4 8 H18 V14 a4 4 0 0 1 -4 4 H8 a4 4 0 0 1 -4 -4 z" />
        <path d="M18 9 H21 a2 2 0 0 1 0 4 H18" />
        <path d="M8 3 V5" />
        <path d="M12 3 V5" />
      </>
    ),
    google: (
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09zM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23zM5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62zM12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" stroke="none" />
    ),
    booking: (
      <path d="M12 2 C6.48 2 2 6.48 2 12 s4.48 10 10 10 s10-4.48 10-10 S17.52 2 12 2 Z M11.5 15.5 h-3.5 V7 h3.5 c1.5 0 2.5 1 2.5 2 c0 0.8 -0.4 1.5 -1 1.8 c0.8 0.3 1.3 1.1 1.3 2 c0 1.5 -1.2 2.7 -2.8 2.7 Z M10 8.5 h-0.5 v2 h0.5 c0.5 0 1 -0.4 1 -1 s-0.5 -1 -1 -1 Z M10 12 h-0.5 v2 h1 c0.5 0 1 -0.4 1 -1 s-0.5 -1 -1 -1 Z" fill="currentColor" stroke="none" />
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}
