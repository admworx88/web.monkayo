import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllOrdinances } from "@/lib/actions/documents";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { OrdinancesTable } from "./ordinances-table";
import { OrdinanceDialog } from "./ordinance-dialog";

export const metadata = {
  title: "Municipal Ordinances | LGU Monkayo CMS",
  description: "Manage municipal ordinances",
};

export default async function OrdinancesPage() {
  const ordinances = await getAllOrdinances();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Municipal Ordinances"
        description="Manage municipal ordinances with document uploads"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Documents", href: "/content/documents/ordinances" },
          { label: "Ordinances" },
        ]}
        actions={
          <OrdinanceDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Ordinance
            </Button>
          </OrdinanceDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <OrdinancesTable ordinances={ordinances} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
