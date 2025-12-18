import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllEvents } from "@/lib/actions/tourism";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { TourismEventsTable } from "./tourism-events-table";
import { TourismEventDialog } from "./tourism-event-dialog";

export const metadata = {
  title: "Events & Festivals | LGU Monkayo CMS",
  description: "Manage local festivals and tourism events",
};

export default async function TourismEventsPage() {
  const events = await getAllEvents();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Events & Festivals"
        description="Manage festivals, celebrations, and tourism events"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tourism", href: "/content/tourism/events" },
          { label: "Events" },
        ]}
        actions={
          <TourismEventDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Event
            </Button>
          </TourismEventDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <TourismEventsTable events={events} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
