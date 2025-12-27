import type { Database } from "@/types/supabase";

export type ElectedOfficial = Database["public"]["Tables"]["elected_officials"]["Row"];
export type OfficialBackground = Database["public"]["Tables"]["elected_officials_bg"]["Row"];

export interface ElectedOfficialsOrgChartProps {
  officials: ElectedOfficial[];
}

export interface OfficialHierarchy {
  mayor: ElectedOfficial | null;
  viceMayor: ElectedOfficial | null;
  councilors: ElectedOfficial[];
}

export interface OfficialCardProps {
  official: ElectedOfficial;
  size: "large" | "medium" | "standard";
  branding: any;
  index: number;
  onHoverStart?: (id: string) => void;
  onHoverEnd?: () => void;
}

export interface ConnectionLinesProps {
  mayor: ElectedOfficial | null;
  viceMayor: ElectedOfficial | null;
  councilors: ElectedOfficial[];
  hoveredOfficialId: string | null;
  branding: any;
}

export interface CardPatternsProps {
  official: ElectedOfficial;
  branding: any;
}
