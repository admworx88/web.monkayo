import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllEServices } from "@/lib/actions/services";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { EServicesTable } from "./e-services-table";
import { EServiceDialog } from "./e-service-dialog";

export const metadata = {
  title: "e-Services | LGU Monkayo CMS",
  description: "Manage online services and requirements",
};

export default async function EServicesPage() {
  const eservices = await getAllEServices();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="e-Services"
        description="Manage online service requirements and documents"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Services", href: "/content/services/e-services" },
          { label: "e-Services" },
        ]}
        actions={
          <EServiceDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add e-Service
            </Button>
          </EServiceDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <EServicesTable eservices={eservices} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
