import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllDisclosures } from "@/lib/actions/services";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { DisclosureDocumentsTable } from "./disclosure-documents-table";
import { DisclosureDocumentDialog } from "./disclosure-document-dialog";

export const metadata = {
  title: "Full Disclosure | LGU Monkayo CMS",
  description: "Manage budget and procurement transparency documents",
};

export default async function DisclosurePage() {
  const documents = await getAllDisclosures();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Full Disclosure Policy"
        description="Manage annual budget and procurement documents"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Services", href: "/content/services/disclosure" },
          { label: "Disclosure" },
        ]}
        actions={
          <DisclosureDocumentDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Document
            </Button>
          </DisclosureDocumentDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <DisclosureDocumentsTable disclosures={documents} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
