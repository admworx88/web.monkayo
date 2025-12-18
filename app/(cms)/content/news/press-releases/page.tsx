import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllPressReleases } from "@/lib/actions/news";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { PressReleasesTable } from "./press-releases-table";
import { PressReleaseDialog } from "./press-release-dialog";

export const metadata = {
  title: "Press Releases | LGU Monkayo CMS",
  description: "Manage press releases and official announcements",
};

export default async function PressReleasesPage() {
  const pressReleases = await getAllPressReleases();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Press Releases"
        description="Manage official press releases with Facebook post links"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "News", href: "/content/news/press-releases" },
          { label: "Press Releases" },
        ]}
        actions={
          <PressReleaseDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Press Release
            </Button>
          </PressReleaseDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <PressReleasesTable pressReleases={pressReleases} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
