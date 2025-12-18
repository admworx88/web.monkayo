import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllAdvisories } from "@/lib/actions/news";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { AdvisoriesTable } from "./advisories-table";
import { AdvisoryDialog } from "./advisory-dialog";

export const metadata = {
  title: "Advisories | LGU Monkayo CMS",
  description: "Manage public advisories and announcements",
};

export default async function AdvisoriesPage() {
  const advisories = await getAllAdvisories();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Public Advisories"
        description="Manage public advisories and important announcements"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "News", href: "/content/news/advisories" },
          { label: "Advisories" },
        ]}
        actions={
          <AdvisoryDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Advisory
            </Button>
          </AdvisoryDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <AdvisoriesTable advisories={advisories} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
