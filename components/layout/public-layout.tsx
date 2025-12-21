import { getBrandingSettings } from "@/lib/actions/branding";
import { BrandingProvider } from "@/lib/context/branding-context";
import { ThemeScript } from "@/components/branding/theme-script";
import { PublicHeader } from "./public-header";
import { PublicFooter } from "./public-footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export async function PublicLayout({ children }: PublicLayoutProps) {
  const branding = await getBrandingSettings();

  return (
    <BrandingProvider branding={branding}>
      <ThemeScript branding={branding} />
      <div className="flex min-h-screen flex-col">
        <PublicHeader />
        <main className="flex-1">{children}</main>
        <PublicFooter />
      </div>
    </BrandingProvider>
  );
}
