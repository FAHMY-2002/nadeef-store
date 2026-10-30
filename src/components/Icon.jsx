// Small inline icon set (24×24, stroke based) so the project has no icon dependency.
const paths = {
  bag: (
    <>
      <path d="M5.5 8h13l-1 12h-11l-1-12z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  star: <path d="M12 3.2l2.7 5.5 6 .9-4.4 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6-4.4-4.2 6-.9z" />,
  sparkle: <path d="M12 2c.9 5.4 4.6 9.1 10 10-5.4.9-9.1 4.6-10 10-.9-5.4-4.6-9.1-10-10 5.4-.9 9.1-4.6 10-10z" />,
  leaf: (
    <>
      <path d="M5 19C5 10.5 10 5 20 5c0 10-5.5 15-14 15" />
      <path d="M5 19l7.5-7.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9.5h-11zM13.5 10h4l3 3.2V16h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  refill: <path d="M4.5 12A7.5 7.5 0 0 1 17.6 7M19.5 4v4h-4M19.5 12A7.5 7.5 0 0 1 6.4 17M4.5 20v-4h4" />,
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  phone: (
    <path d="M6 3.5h3l1.8 4.6-2.3 1.4a11 11 0 0 0 6 6l1.4-2.3 4.6 1.8v3a1.5 1.5 0 0 1-1.6 1.5C10.4 19 5 13.6 4.5 5.1A1.5 1.5 0 0 1 6 3.5z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </>
  ),
  tag: (
    <>
      <path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3-8.7 8.7-8.3-8.3z" />
      <circle cx="8" cy="8" r="1.5" />
    </>
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.5" />
      <path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" />
    </>
  ),
  cash: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9.5v5M18 9.5v5" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19M6.5 15h4" />
    </>
  ),
  kitchen: (
    <>
      <path d="M4 10h16v4.5a5.5 5.5 0 0 1-5.5 5.5h-5A5.5 5.5 0 0 1 4 14.5V10z" />
      <path d="M2 10h2M20 10h2M9 6.5c0-1.2 1-1.6 1-2.8M14 6.5c0-1.2 1-1.6 1-2.8" />
    </>
  ),
  bath: (
    <>
      <path d="M3 12h18v1.5A5.5 5.5 0 0 1 15.5 19h-7A5.5 5.5 0 0 1 3 13.5V12z" />
      <path d="M6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2" />
    </>
  ),
  laundry: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M7.5 6.5h2M14 6.5h2.5" />
    </>
  ),
  spray: (
    <>
      <path d="M8.5 11h7v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-9z" />
      <path d="M9.5 11V8h4l2.5 2M9.5 8V5.5h5.5l2 1.5M5 5.5h1.5M4 8.5h1.5" />
    </>
  ),
  brush: (
    <>
      <path d="M5 13h14v2.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V13z" />
      <path d="M8 13c0-4 1.5-7 4-7s4 3 4 7M7 16.5V20M10.3 16.5V20M13.7 16.5V20M17 16.5V20" />
    </>
  ),
  drop: <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z" />,
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.4-3.4a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.4 3.4z" />
  ),
  snow: (
    <path d="M12 2.5v19M3.8 7.25l16.4 9.5M20.2 7.25l-16.4 9.5M9.2 4l2.8 2 2.8-2M9.2 20l2.8-2 2.8 2M3.5 10.6l3.4-.3-1.4-3.1M20.5 13.4l-3.4.3 1.4 3.1M18.5 7.2l-1.4 3.1 3.4.3M5.5 16.8l1.4-3.1-3.4-.3" />
  ),
  home: <path d="M4 10.8 12 4l8 6.8V19a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-8.2z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  chat: <path d="M5 5h14a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 17h-8l-4.5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 5z" />,
};

// Used by ProductArt to draw an icon inside its SVG.
export const iconPaths = paths;

const FILLED = new Set(['star', 'sparkle']);

export default function Icon({ name, size = 20, strokeWidth = 1.8, className, ...rest }) {
  const filled = FILLED.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
