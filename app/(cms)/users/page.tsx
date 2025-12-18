import { Suspense } from "react";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/actions/admin";
import { getAllUsers } from "@/lib/actions/system";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { UsersTable } from "./users-table";
import { UserDialog } from "./user-dialog";

export const metadata = {
  title: "User Management | LGU Monkayo CMS",
  description: "Manage CMS users and roles (Admin Only)",
};

export default async function UsersPage() {
  const canAccess = await isAdmin();
  if (!canAccess) {
    redirect("/dashboard");
  }

  const users = await getAllUsers();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="User Management"
        description="Manage CMS users, roles, and permissions (Admin Only)"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users" },
        ]}
        actions={
          <UserDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add User
            </Button>
          </UserDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <UsersTable users={users} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
