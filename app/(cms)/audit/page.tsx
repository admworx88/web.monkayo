import { Suspense } from "react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/actions/admin";
import { getAuditLogs } from "@/lib/actions/system";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { AuditLogsTable } from "./audit-logs-table";

export const metadata = {
  title: "Audit Logs | LGU Monkayo CMS",
  description: "View system activity logs (Admin Only)",
};

export default async function AuditLogsPage() {
  const canAccess = await isAdmin();
  if (!canAccess) {
    redirect("/dashboard");
  }

  const logs = await getAuditLogs();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Audit Logs"
        description="View system activity and change history (Admin Only, Read-Only)"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Audit Logs" },
        ]}
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <AuditLogsTable logs={logs} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
