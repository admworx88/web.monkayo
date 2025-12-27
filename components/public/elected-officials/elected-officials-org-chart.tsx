"use client";

import { useState } from "react";
import { useBranding } from "@/lib/context/branding-context";
import type { ElectedOfficialsOrgChartProps } from "./types";
import { parseHierarchy } from "./utils";
import { OfficialCard } from "./official-card";
import {
  MayorToViceMayorLine,
  ViceMayorToCouncilorsLines,
} from "./connection-lines";
import "./styles.css";

/**
 * Elected Officials Organizational Chart
 * Displays hierarchical structure: Mayor -> Vice Mayor -> Councilors
 */
export function ElectedOfficialsOrgChart({
  officials,
}: ElectedOfficialsOrgChartProps) {
  const { branding } = useBranding();
  const { mayor, viceMayor, councilors } = parseHierarchy(officials);
  const [hoveredOfficialId, setHoveredOfficialId] = useState<string | null>(
    null
  );

  // Empty state
  if (!mayor && !viceMayor && councilors.length === 0) {
    return (
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: branding.colors.textPrimary }}
          >
            Elected Officials
          </h1>
          <p
            className="text-lg"
            style={{ color: branding.colors.textSecondary }}
          >
            No elected officials data available at this time.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 relative" style={{ background: "#fafaf9" }}>
      {/* Animated Background Pattern - Indigenous Weaving Inspired (same as hero) */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tribal-pattern-officials"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 60 L 60 0 L 120 60 L 60 120 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: branding.colors.primary }}
              />
              <circle
                cx="60"
                cy="60"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: branding.colors.accent }}
              />
              <path
                d="M 30 30 L 90 30 L 90 90 L 30 90 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                style={{ color: branding.colors.primary }}
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#tribal-pattern-officials)"
          />
        </svg>
      </div>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1
          className="text-5xl font-bold mb-6"
          style={{
            color: branding.colors.textPrimary,
            fontFamily: '"Cormorant Garamond", Georgia, serif',
          }}
        >
          Elected Officials
        </h1>
        <p
          className="text-xl max-w-3xl mx-auto"
          style={{ color: branding.colors.textSecondary }}
        >
          Meet the dedicated leaders serving the people of Monkayo, Davao de Oro
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Mobile & Tablet: Vertical Stack */}
        <div className="lg:hidden space-y-12">
          {/* Mayor */}
          {mayor && (
            <div className="flex flex-col items-center">
              <OfficialCard
                official={mayor}
                size="large"
                branding={branding}
                index={0}
                onHoverStart={setHoveredOfficialId}
                onHoverEnd={() => setHoveredOfficialId(null)}
              />
            </div>
          )}

          {/* Connection Line */}
          {mayor && viceMayor && (
            <div className="flex justify-center">
              <div
                className="animate-line-draw-in-mobile w-0.5"
                style={
                  {
                    backgroundColor: `${branding.colors.primary}40`,
                    "--target-height": "64px",
                    animationDelay: "0.7s",
                  } as React.CSSProperties
                }
              />
            </div>
          )}

          {/* Vice Mayor */}
          {viceMayor && (
            <div className="flex flex-col items-center">
              <OfficialCard
                official={viceMayor}
                size="standard"
                branding={branding}
                index={1}
                onHoverStart={setHoveredOfficialId}
                onHoverEnd={() => setHoveredOfficialId(null)}
              />
            </div>
          )}

          {/* Connection Line */}
          {viceMayor && councilors.length > 0 && (
            <div className="flex justify-center">
              <div
                className="animate-line-draw-in-mobile w-0.5"
                style={
                  {
                    backgroundColor: `${branding.colors.primary}40`,
                    "--target-height": "64px",
                    animationDelay: "1.4s",
                  } as React.CSSProperties
                }
              />
            </div>
          )}

          {/* Councilors */}
          {councilors.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {councilors.map((councilor, idx) => (
                <OfficialCard
                  key={councilor.id}
                  official={councilor}
                  size="standard"
                  branding={branding}
                  index={idx + 2}
                  onHoverStart={setHoveredOfficialId}
                  onHoverEnd={() => setHoveredOfficialId(null)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop: Hierarchical Chart */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto">
            {/* Mayor Level */}
            {mayor && (
              <div className="flex justify-center mb-8">
                <OfficialCard
                  official={mayor}
                  size="standard"
                  branding={branding}
                  index={0}
                  onHoverStart={setHoveredOfficialId}
                  onHoverEnd={() => setHoveredOfficialId(null)}
                />
              </div>
            )}

            {/* Connection: Mayor to Vice Mayor */}
            <MayorToViceMayorLine
              mayor={mayor}
              viceMayor={viceMayor}
              councilors={councilors}
              hoveredOfficialId={hoveredOfficialId}
              branding={branding}
            />

            {/* Vice Mayor Level */}
            {viceMayor && (
              <div className="flex justify-center mb-8">
                <OfficialCard
                  official={viceMayor}
                  size="standard"
                  branding={branding}
                  index={1}
                  onHoverStart={setHoveredOfficialId}
                  onHoverEnd={() => setHoveredOfficialId(null)}
                />
              </div>
            )}

            {/* Connection: Vice Mayor to Councilors */}
            <ViceMayorToCouncilorsLines
              mayor={mayor}
              viceMayor={viceMayor}
              councilors={councilors}
              hoveredOfficialId={hoveredOfficialId}
              branding={branding}
            />

            {/* Councilors Level */}
            {councilors.length > 0 && (
              <div
                className={`grid gap-12 ${
                  councilors.length === 1
                    ? "grid-cols-1"
                    : councilors.length === 2
                    ? "grid-cols-2"
                    : councilors.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-4"
                }`}
              >
                {councilors.map((councilor, idx) => (
                  <div key={councilor.id} className="flex justify-center">
                    <OfficialCard
                      official={councilor}
                      size="standard"
                      branding={branding}
                      index={idx + 2}
                      onHoverStart={setHoveredOfficialId}
                      onHoverEnd={() => setHoveredOfficialId(null)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
