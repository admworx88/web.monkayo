import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllHistory } from "@/lib/actions/about";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { HistoryTable } from "./history-table";
import { HistoryDialog } from "./history-dialog";

export const metadata = {
  title: "History | LGU Monkayo CMS",
  description: "Manage municipality history and heritage",
};

export default async function HistoryPage() {
  const history = await getAllHistory();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="History"
        description="Manage the municipality's historical content and narratives"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "About Monkayo", href: "/content/about/history" },
          { label: "History" },
        ]}
        actions={
          <HistoryDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add History Entry
            </Button>
          </HistoryDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <HistoryTable history={history} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
