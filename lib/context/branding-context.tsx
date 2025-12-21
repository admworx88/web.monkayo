"use client";

import { createContext, useContext } from "react";
import type { BrandingSettings } from "@/types/branding";

interface BrandingContextValue {
  branding: BrandingSettings;
}

const BrandingContext = createContext<BrandingContextValue | null>(null);

interface BrandingProviderProps {
  branding: BrandingSettings;
  children: React.ReactNode;
}

export function BrandingProvider({ branding, children }: BrandingProviderProps) {
  return (
    <BrandingContext.Provider value={{ branding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  const context = useContext(BrandingContext);

  if (!context) {
    throw new Error("useBranding must be used within a BrandingProvider");
  }

  return context;
}
