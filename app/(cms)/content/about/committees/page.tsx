import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllCommittees } from "@/lib/actions/about";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { CommitteesTable } from "./committees-table";
import { CommitteeDialog } from "./committee-dialog";

export const metadata = {
  title: "Committees | LGU Monkayo CMS",
  description: "Manage municipal committees and members",
};

export default async function CommitteesPage() {
  const committees = await getAllCommittees();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Committees"
        description="Manage committee assignments and memberships"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "About Monkayo", href: "/content/about/committees" },
          { label: "Committees" },
        ]}
        actions={
          <CommitteeDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Committee
            </Button>
          </CommitteeDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <CommitteesTable committees={committees} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
