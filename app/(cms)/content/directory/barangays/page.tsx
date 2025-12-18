import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllBarangays } from "@/lib/actions/directory";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { BarangaysTable } from "./barangays-table";
import { BarangayDialog } from "./barangay-dialog";

export const metadata = {
  title: "Barangays | LGU Monkayo CMS",
  description: "Manage barangay directory",
};

export default async function BarangaysPage() {
  const barangays = await getAllBarangays();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Barangays"
        description="Manage barangay directory and contact information"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Directory", href: "/content/directory/departments" },
          { label: "Barangays" },
        ]}
        actions={
          <BarangayDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Barangay
            </Button>
          </BarangayDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <BarangaysTable barangays={barangays} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
