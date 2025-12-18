import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllPartnerLogos } from "@/lib/actions/homepage";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { LogosTable } from "./logos-table";
import { LogoDialog } from "./logo-dialog";

export const metadata = {
  title: "Partner Logos | LGU Monkayo CMS",
  description: "Manage partner and government agency logos",
};

export default async function LogosPage() {
  const logos = await getAllPartnerLogos();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Partner Logos"
        description="Manage partner and government agency logos on the homepage"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Homepage", href: "/content/homepage/hero" },
          { label: "Partner Logos" },
        ]}
        actions={
          <LogoDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Logo
            </Button>
          </LogoDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <LogosTable logos={logos} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
