import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllJobVacancies } from "@/lib/actions/opportunities";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { JobVacanciesTable } from "./job-vacancies-table";
import { JobVacancyDialog } from "./job-vacancy-dialog";

export const metadata = {
  title: "Job Vacancies | LGU Monkayo CMS",
  description: "Manage job openings and career opportunities",
};

export default async function JobVacanciesPage() {
  const jobs = await getAllJobVacancies();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Job Vacancies"
        description="Manage employment opportunities and job postings"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Opportunities", href: "/content/opportunities/jobs" },
          { label: "Job Vacancies" },
        ]}
        actions={
          <JobVacancyDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Post Job
            </Button>
          </JobVacancyDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <JobVacanciesTable vacancies={jobs} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
