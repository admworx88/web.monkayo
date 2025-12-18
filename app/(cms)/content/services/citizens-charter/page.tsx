import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllCharters } from "@/lib/actions/services";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { CitizensCharterTable } from "./citizens-charter-table";
import { CitizensCharterDialog } from "./citizens-charter-dialog";

export const metadata = {
  title: "Citizen's Charter | LGU Monkayo CMS",
  description: "Manage frontline services and process flows",
};

export default async function CitizensCharterPage() {
  const charter = await getAllCharters();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Citizen's Charter"
        description="Manage frontline services and process flow documents"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Services", href: "/content/services/citizens-charter" },
          { label: "Citizen's Charter" },
        ]}
        actions={
          <CitizensCharterDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Service
            </Button>
          </CitizensCharterDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <CitizensCharterTable charters={charter} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
