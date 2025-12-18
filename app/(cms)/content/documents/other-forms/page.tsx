import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllOtherForms } from "@/lib/actions/documents";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { OtherFormsTable } from "./other-forms-table";
import { OtherFormDialog } from "./other-form-dialog";

export const metadata = {
  title: "Other Forms | LGU Monkayo CMS",
  description: "Manage application forms and other documents",
};

export default async function OtherFormsPage() {
  const forms = await getAllOtherForms();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Other Forms"
        description="Manage application forms and miscellaneous documents"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Documents", href: "/content/documents/other-forms" },
          { label: "Other Forms" },
        ]}
        actions={
          <OtherFormDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Form
            </Button>
          </OtherFormDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <OtherFormsTable otherForms={forms} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
