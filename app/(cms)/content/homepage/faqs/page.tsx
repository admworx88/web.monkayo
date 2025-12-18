import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllFAQs } from "@/lib/actions/homepage";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { FAQsTable } from "./faqs-table";
import { FAQDialog } from "./faq-dialog";

export const metadata = {
  title: "FAQs | LGU Monkayo CMS",
  description: "Manage frequently asked questions",
};

export default async function FAQsPage() {
  const faqs = await getAllFAQs();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="FAQs"
        description="Manage frequently asked questions displayed on the homepage"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Homepage", href: "/content/homepage/hero" },
          { label: "FAQs" },
        ]}
        actions={
          <FAQDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add FAQ
            </Button>
          </FAQDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <FAQsTable faqs={faqs} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
