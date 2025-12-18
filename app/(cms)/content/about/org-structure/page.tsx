import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllOrgStructure } from "@/lib/actions/about";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { OrgStructureTable } from "./org-structure-table";
import { OrgStructureDialog } from "./org-structure-dialog";

export const metadata = {
  title: "Organizational Structure | LGU Monkayo CMS",
  description: "Manage organizational structure and hierarchy",
};

export default async function OrgStructurePage() {
  const orgStructure = await getAllOrgStructure();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Organizational Structure"
        description="Manage the municipal government's organizational chart"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "About Monkayo", href: "/content/about/org-structure" },
          { label: "Org Structure" },
        ]}
        actions={
          <OrgStructureDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Position
            </Button>
          </OrgStructureDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <OrgStructureTable orgStructure={orgStructure} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
