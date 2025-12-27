import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllFlagshipPrograms } from "@/lib/actions/homepage";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { FlagshipTable } from "./flagship-table";
import { FlagshipDialog } from "./flagship-dialog";

export const metadata = {
  title: "Flagship Programs | LGU Monkayo CMS",
  description: "Manage flagship programs showcased on the homepage",
};

export default async function FlagshipProgramsPage() {
  const programs = await getAllFlagshipPrograms();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Flagship Programs"
        description="Manage flagship programs/initiatives showcased on the homepage"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Homepage", href: "/content/homepage/flagship" },
          { label: "Flagship Programs" },
        ]}
        actions={
          <FlagshipDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Program
            </Button>
          </FlagshipDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <FlagshipTable programs={programs} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
