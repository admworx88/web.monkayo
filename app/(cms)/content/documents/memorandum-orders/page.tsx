import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllMemorandumOrders } from "@/lib/actions/documents";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { MemorandumOrdersTable } from "./memorandum-orders-table";
import { MemorandumOrderDialog } from "./memorandum-order-dialog";

export const metadata = {
  title: "Memorandum Orders | LGU Monkayo CMS",
  description: "Manage memorandum orders",
};

export default async function MemorandumOrdersPage() {
  const orders = await getAllMemorandumOrders();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Memorandum Orders"
        description="Manage memorandum orders with document uploads"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Documents", href: "/content/documents/memorandum-orders" },
          { label: "Memorandum Orders" },
        ]}
        actions={
          <MemorandumOrderDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Memorandum Order
            </Button>
          </MemorandumOrderDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <MemorandumOrdersTable memorandumOrders={orders} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
