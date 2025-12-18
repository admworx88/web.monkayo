import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllExecutiveOrders } from "@/lib/actions/documents";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { ExecutiveOrdersTable } from "./executive-orders-table";
import { ExecutiveOrderDialog } from "./executive-order-dialog";

export const metadata = {
  title: "Executive Orders | LGU Monkayo CMS",
  description: "Manage executive orders and directives",
};

export default async function ExecutiveOrdersPage() {
  const orders = await getAllExecutiveOrders();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Executive Orders"
        description="Manage executive orders with document uploads"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Documents", href: "/content/documents/executive-orders" },
          { label: "Executive Orders" },
        ]}
        actions={
          <ExecutiveOrderDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Executive Order
            </Button>
          </ExecutiveOrderDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <ExecutiveOrdersTable executiveOrders={orders} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
