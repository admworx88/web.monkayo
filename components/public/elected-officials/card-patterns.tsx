import type { CardPatternsProps } from "./types";

/**
 * Dotted Grid Pattern - Subtle base texture layer
 */
export function DottedGridPattern({ official, branding }: CardPatternsProps) {
  return (
    <div className="card-dot-pattern absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern
            id={`dot-grid-${official.id}`}
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="8"
              cy="8"
              r="1.5"
              fill={branding.colors.primary}
              opacity="0.10"
              className="dot-element"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#dot-grid-${official.id})`}
        />
      </svg>
    </div>
  );
}

/**
 * Art Deco Sunburst Pattern - Radiating from portrait center
 */
export function SunburstPattern({ official, branding }: CardPatternsProps) {
  return (
    <div className="card-pattern absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`sunburst-${official.id}`} cx="50%" cy="35%">
            <stop offset="0%" stopColor={branding.colors.primary} stopOpacity="0" />
            <stop offset="40%" stopColor={branding.colors.primary} stopOpacity="0.015" />
            <stop offset="100%" stopColor={branding.colors.accent} stopOpacity="0.03" />
          </radialGradient>
        </defs>

        {/* Radiating lines - Art Deco sunburst */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15) - 90; // Start from top
          const rad = (angle * Math.PI) / 180;
          const centerX = 50;
          const centerY = 35; // Slightly above center where portrait sits
          const length = 100;
          // Round to 2 decimal places to prevent hydration mismatches
          const x2 = Math.round((centerX + Math.cos(rad) * length) * 100) / 100;
          const y2 = Math.round((centerY + Math.sin(rad) * length) * 100) / 100;

          return (
            <line
              key={i}
              x1={`${centerX}%`}
              y1={`${centerY}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke={`url(#sunburst-${official.id})`}
              strokeWidth={i % 3 === 0 ? "2" : "1"}
              opacity={i % 3 === 0 ? "0.04" : "0.025"}
              className="transition-opacity duration-700"
            />
          );
        })}

        {/* Concentric circles for depth */}
        <circle
          cx="50%"
          cy="35%"
          r="15%"
          fill="none"
          stroke={branding.colors.primary}
          strokeWidth="1"
          opacity="0.02"
        />
        <circle
          cx="50%"
          cy="35%"
          r="25%"
          fill="none"
          stroke={branding.colors.accent}
          strokeWidth="1"
          opacity="0.015"
        />
      </svg>
    </div>
  );
}

/**
 * Delicate Border Filigree - Geometric border lines
 */
export function BorderFiligree({ official, branding }: CardPatternsProps) {
  return (
    <div className="card-border-pattern absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <svg className="absolute inset-0 w-full h-full">
        {/* Geometric border lines */}
        <rect
          x="8"
          y="8"
          width="calc(100% - 16px)"
          height="calc(100% - 16px)"
          fill="none"
          stroke={branding.colors.primary}
          strokeWidth="0.5"
          opacity="0.06"
          rx="12"
        />
        <rect
          x="12"
          y="12"
          width="calc(100% - 24px)"
          height="calc(100% - 24px)"
          fill="none"
          stroke={branding.colors.accent}
          strokeWidth="0.5"
          opacity="0.04"
          rx="10"
        />
      </svg>
    </div>
  );
}

/**
 * Elegant Corner Decorations
 */
export function CornerDecorations() {
  return (
    <>
      <div className="corner-accent corner-tl" />
      <div className="corner-accent corner-tr" />
      <div className="corner-accent corner-bl" />
      <div className="corner-accent corner-br" />
    </>
  );
}

/**
 * Card Background Logo
 */
export function CardBackgroundLogo({ branding }: { branding: any }) {
  if (!branding.logos.header) return null;

  return (
    <div className="card-logo-bg absolute inset-0 z-0 pointer-events-none flex items-center justify-center p-4">
      <div className="relative w-full h-full">
        <img
          src={branding.logos.header}
          alt=""
          className="w-full h-full object-contain"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
