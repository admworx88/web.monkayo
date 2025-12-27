import type { ConnectionLinesProps } from "./types";

/**
 * Mobile Connection Lines - Simple vertical lines
 */
export function MobileConnectionLines({ mayor, viceMayor, councilors, branding }: ConnectionLinesProps) {
  return (
    <div className="lg:hidden space-y-12">
      {/* Mayor to Vice Mayor Line */}
      {mayor && viceMayor && (
        <div className="flex justify-center">
          <div
            className="animate-line-draw-in-mobile w-0.5"
            style={{
              backgroundColor: `${branding.colors.primary}40`,
              '--target-height': '64px',
              animationDelay: '0.7s'
            } as React.CSSProperties}
          />
        </div>
      )}

      {/* Vice Mayor to Councilors Line */}
      {viceMayor && councilors.length > 0 && (
        <div className="flex justify-center">
          <div
            className="animate-line-draw-in-mobile w-0.5"
            style={{
              backgroundColor: `${branding.colors.primary}40`,
              '--target-height': '64px',
              animationDelay: '1.4s'
            } as React.CSSProperties}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Desktop Connection: Mayor to Vice Mayor
 */
export function MayorToViceMayorLine({
  mayor,
  viceMayor,
  hoveredOfficialId,
  branding
}: ConnectionLinesProps) {
  if (!mayor || !viceMayor) return null;

  return (
    <div className="flex justify-center mb-8">
      <svg width="4" height="80" style={{ '--line-length': '80' } as React.CSSProperties}>
        <line
          x1="2"
          y1="0"
          x2="2"
          y2="80"
          stroke={branding.colors.primary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="80"
          strokeDashoffset="80"
          className={`animate-line-draw-in animate-line-flow transition-all duration-500 ${
            (hoveredOfficialId === mayor?.id || hoveredOfficialId === viceMayor?.id)
              ? 'line-glow-active'
              : ''
          }`}
          style={{
            animationDelay: '0.7s',
            filter: (hoveredOfficialId === mayor?.id || hoveredOfficialId === viceMayor?.id)
              ? `drop-shadow(0 0 8px ${branding.colors.primary}) drop-shadow(0 0 12px ${branding.colors.primary}80)`
              : 'none'
          }}
        />
      </svg>
    </div>
  );
}

/**
 * Desktop Connection: Vice Mayor to Councilors (T-shape)
 */
export function ViceMayorToCouncilorsLines({
  viceMayor,
  councilors,
  hoveredOfficialId,
  branding
}: ConnectionLinesProps) {
  if (!viceMayor || councilors.length === 0) return null;

  return (
    <div className="relative mb-8 h-24">
      <svg className="absolute inset-0 w-full h-full">
        {/* Vertical stem down from Vice Mayor */}
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="50%"
          stroke={branding.colors.primary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="48"
          strokeDashoffset="48"
          className={`animate-line-draw-in animate-line-flow transition-all duration-500 ${
            hoveredOfficialId === viceMayor?.id || councilors.some(c => c.id === hoveredOfficialId)
              ? 'line-glow-active'
              : ''
          }`}
          style={{
            '--line-length': '48',
            animationDelay: '1.4s',
            filter: (hoveredOfficialId === viceMayor?.id || councilors.some(c => c.id === hoveredOfficialId))
              ? `drop-shadow(0 0 8px ${branding.colors.primary}) drop-shadow(0 0 12px ${branding.colors.primary}80)`
              : 'none'
          } as React.CSSProperties}
        />

        {/* Horizontal bar across */}
        <line
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke={branding.colors.primary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="100%"
          strokeDashoffset="100%"
          className={`animate-line-draw-in animate-line-flow transition-all duration-500 ${
            councilors.some(c => c.id === hoveredOfficialId)
              ? 'line-glow-active'
              : ''
          }`}
          style={{
            '--line-length': '100%',
            animationDelay: '1.6s',
            filter: councilors.some(c => c.id === hoveredOfficialId)
              ? `drop-shadow(0 0 8px ${branding.colors.primary}) drop-shadow(0 0 12px ${branding.colors.primary}80)`
              : 'none'
          } as React.CSSProperties}
        />

        {/* Vertical drops to each councilor position */}
        {councilors.map((councilor, idx) => {
          const totalCouncilors = councilors.length;
          // Calculate center of each grid column
          const xPercent = (100 / totalCouncilors) * (idx + 0.5);
          return (
            <line
              key={idx}
              x1={`${xPercent}%`}
              y1="50%"
              x2={`${xPercent}%`}
              y2="100%"
              stroke={branding.colors.primary}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="48"
              strokeDashoffset="48"
              className={`animate-line-draw-in animate-line-flow transition-all duration-500 ${
                hoveredOfficialId === councilor.id
                  ? 'line-glow-active'
                  : ''
              }`}
              style={{
                '--line-length': '48',
                animationDelay: `${1.8 + (idx * 0.1)}s`,
                filter: hoveredOfficialId === councilor.id
                  ? `drop-shadow(0 0 8px ${branding.colors.primary}) drop-shadow(0 0 12px ${branding.colors.primary}80)`
                  : 'none'
              } as React.CSSProperties}
            />
          );
        })}
      </svg>
    </div>
  );
}
