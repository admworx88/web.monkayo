import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllMedia } from "@/lib/actions/system";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { MediaLibraryGrid } from "./media-library-grid";
import { MediaUploadDialog } from "./media-upload-dialog";

export const metadata = {
  title: "Media Library | LGU Monkayo CMS",
  description: "Manage images and media files",
};

export default async function MediaLibraryPage() {
  const media = await getAllMedia();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Media Library"
        description="Upload and manage images, documents, and other media files"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Media Library" },
        ]}
        actions={
          <MediaUploadDialog>
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Upload Media
            </Button>
          </MediaUploadDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard className="p-6">
          <Suspense fallback={<LoadingState rows={3} />}>
            <MediaLibraryGrid media={media} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
