import Icon from "./Icon";

/**
 * Two-tone feature icons for the larger homepage cards: an outlined shape with a
 * soft filled layer behind it (`.tone`). Colours come from `currentColor`, so the
 * parent decides the palette. Anything not drawn here falls back to <Icon>.
 */
type Props = { name: string; size?: number };

export default function FeatureIcon({ name, size = 30 }: Props) {
  const common = {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    className: "fi",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "book":
      return (
        <svg {...common}>
          <path className="tone" d="M3 5.6c3-1.2 6.6-.9 9 1V20c-2.4-1.9-6-2.2-9-1V5.6Zm18 0c-3-1.2-6.6-.9-9 1V20c2.4-1.9 6-2.2 9-1V5.6Z" />
          <path d="M3 5.6c3-1.2 6.6-.9 9 1V20c-2.4-1.9-6-2.2-9-1V5.6Z" />
          <path d="M21 5.6c-3-1.2-6.6-.9-9 1V20c2.4-1.9 6-2.2 9-1V5.6Z" />
          <path d="M16.5 3v5.2l1.5-1.2 1.5 1.2V3.4" />
          <path d="M6 9.4c1.1-.2 2.2-.1 3.2.3M6 12.6c1.1-.2 2.2-.1 3.2.3" />
        </svg>
      );
    case "robot":
      return (
        <svg {...common}>
          <rect className="tone" x="4.5" y="8" width="15" height="11.5" rx="3.5" />
          <rect x="4.5" y="8" width="15" height="11.5" rx="3.5" />
          <path d="M12 8V5" />
          <circle cx="12" cy="4" r="1.4" />
          <path d="M2.5 12.5v3M21.5 12.5v3" />
          <circle cx="9.2" cy="13" r="1.3" className="dot" />
          <circle cx="14.8" cy="13" r="1.3" className="dot" />
          <path d="M9.5 16.6h5" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle className="tone" cx="9" cy="8" r="3.4" />
          <circle cx="9" cy="8" r="3.4" />
          <path className="tone" d="M2.8 19.5c0-3.2 2.8-5.4 6.2-5.4s6.2 2.2 6.2 5.4v.5H2.8v-.5Z" />
          <path d="M2.8 20v-.5c0-3.2 2.8-5.4 6.2-5.4s6.2 2.2 6.2 5.4v.5" />
          <circle cx="17.3" cy="9" r="2.5" />
          <path d="M16.6 14.3c2.7-.3 4.9 1.4 4.9 4.2V20h-3.3" />
        </svg>
      );
    case "grad":
      return (
        <svg {...common}>
          <path className="tone" d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z" />
          <path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z" />
          <path d="M6.5 11.9v4.3c0 1.3 2.5 2.8 5.5 2.8s5.5-1.5 5.5-2.8v-4.3" />
          <path d="M21.5 9.5V15" />
          <circle cx="21.5" cy="16.2" r="1" className="dot" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path className="tone" d="M12 20s-7.5-4.6-7.5-10.1A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20Z" />
          <path d="M12 20s-7.5-4.6-7.5-10.1A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20Z" />
          <path d="M8 10.2c.2-1 .9-1.7 1.9-1.9" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <rect className="tone" x="2.5" y="4.5" width="19" height="15" rx="3" />
          <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
          <path d="m9 10-2.5 2L9 14M15 10l2.5 2L15 14M13 9.5l-2 5" />
        </svg>
      );
    default:
      return <Icon name={name as Parameters<typeof Icon>[0]["name"]} size={size} />;
  }
}
