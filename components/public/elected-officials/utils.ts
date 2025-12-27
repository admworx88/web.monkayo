import type { ElectedOfficial, OfficialHierarchy } from "./types";

/**
 * Parse officials array into hierarchy (mayor, vice mayor, councilors)
 */
export function parseHierarchy(officials: ElectedOfficial[]): OfficialHierarchy {
  const mayor = officials.find((o) => o.title.toLowerCase().includes("mayor") && !o.title.toLowerCase().includes("vice"));
  const viceMayor = officials.find((o) => o.title.toLowerCase().includes("vice mayor"));
  const councilors = officials.filter(
    (o) =>
      !o.title.toLowerCase().includes("mayor") &&
      (o.title.toLowerCase().includes("councilor") ||
        o.title.toLowerCase().includes("sangguniang bayan member") ||
        o.title.toLowerCase().includes("ex-officio") ||
        o.title.toLowerCase().includes("ex officio"))
  );

  return {
    mayor: mayor || null,
    viceMayor: viceMayor || null,
    councilors,
  };
}

/**
 * Format term dates into readable string
 */
export function formatTerm(start: string | null, end: string | null): string {
  if (!start || !end) return "Present Term";

  const startYear = new Date(start).getFullYear();
  const endYear = new Date(end).getFullYear();

  return `${startYear} – ${endYear}`;
}

/**
 * Calculate portrait and ring sizes based on card size variant
 */
export function getPortraitSizes(size: "large" | "medium" | "standard") {
  const sizes = {
    large: { size: 200, ring: 212 },
    medium: { size: 170, ring: 182 },
    standard: { size: 140, ring: 152 },
  };

  return sizes[size];
}

/**
 * Get card width class based on size variant
 */
export function getCardWidthClass(size: "large" | "medium" | "standard"): string {
  const widths = {
    large: "w-full max-w-[390px]",
    medium: "w-full max-w-[350px]",
    standard: "w-full max-w-[310px]",
  };

  return widths[size];
}
