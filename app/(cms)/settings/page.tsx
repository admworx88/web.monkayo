import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/actions/admin";
import { getAllSettings } from "@/lib/actions/system";
import { getBrandingSettings } from "@/lib/actions/branding";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { SettingsForm } from "./settings-form";

export const metadata = {
  title: "Site Settings | LGU Monkayo CMS",
  description: "Manage global site settings (Admin Only)",
};

export default async function SettingsPage() {
  const canAccess = await isAdmin();
  if (!canAccess) {
    redirect("/dashboard");
  }

  const [settings, branding] = await Promise.all([
    getAllSettings(),
    getBrandingSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Site Settings"
        description="Manage global website configuration (Admin Only)"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings" },
        ]}
      />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        <ContentCard title="General Settings" description="Basic site information">
          <SettingsForm settings={settings} branding={branding} />
        </ContentCard>
      </main>
    </div>
  );
}
