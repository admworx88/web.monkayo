import type { BrandingSettings } from "@/types/branding";

interface ThemeScriptProps {
  branding: BrandingSettings;
}

/**
 * Server component that injects CSS custom properties for branding
 * IMPORTANT: This should only be used in PublicLayout to avoid affecting CMS dashboard
 */
export function ThemeScript({ branding }: ThemeScriptProps) {
  const { colors } = branding;

  const cssVariables = `
    :root {
      --brand-primary: ${colors.primary};
      --brand-secondary: ${colors.secondary};
      --brand-accent: ${colors.accent};
      --brand-text-primary: ${colors.textPrimary};
      --brand-text-secondary: ${colors.textSecondary};
    }
  `;

  return (
    <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
  );
}
