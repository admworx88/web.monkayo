import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllPlaces } from "@/lib/actions/tourism";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { TourismPlacesTable } from "./tourism-places-table";
import { TourismPlaceDialog } from "./tourism-place-dialog";

export const metadata = {
  title: "Places to Visit | LGU Monkayo CMS",
  description: "Manage tourist destinations and attractions",
};

export default async function TourismPlacesPage() {
  const places = await getAllPlaces();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Places to Visit"
        description="Manage tourist spots and attractions in Monkayo"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tourism", href: "/content/tourism/places" },
          { label: "Places" },
        ]}
        actions={
          <TourismPlaceDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Place
            </Button>
          </TourismPlaceDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <TourismPlacesTable places={places} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
